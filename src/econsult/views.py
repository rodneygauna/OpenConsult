'''
Views for the econsult portion of the app.
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import Consult, Patient, User, UserPractice, Practice
from src.econsult.forms import ConsultForm


# Blueprint
econsult_bp = Blueprint('econsult', __name__)


# View econsults
@econsult_bp.route('/econsults/<int:practice_id>')
@login_required
def econsults(practice_id):
    '''Displays all econsults for a practice'''

    # Gets all econsults for a practice
    CreatingProvider = db.aliased(User, name='CreatingProvider')
    AssignedSpecialist = db.aliased(User, name='AssignedSpecialist')

    econsults = (
        db.session.query(
            Consult.id,
            Consult.patient_id,
            Consult.practice_id,
            Consult.creating_provider_id,
            Consult.assigned_specialist_id,
            Consult.created_date,
            Consult.updated_date,
            Consult.specialty,
            Consult.status,
            CreatingProvider.firstname.label('creating_provider_firstname'),
            CreatingProvider.lastname.label('creating_provider_lastname'),
            AssignedSpecialist.firstname.label(
                'assigned_specialist_firstname'),
            AssignedSpecialist.lastname.label('assigned_specialist_lastname'),
            Patient.firstname.label('patient_firstname'),
            Patient.lastname.label('patient_lastname'),
        )
        .filter(Consult.practice_id == practice_id)
        .join(
            CreatingProvider,
            Consult.creating_provider_id == CreatingProvider.id
        )
        .outerjoin(
            AssignedSpecialist,
            Consult.assigned_specialist_id == AssignedSpecialist.id
        )
        .join(Patient, Consult.patient_id == Patient.id)
        .order_by(Consult.created_date.desc())
        .all()
    )

    return render_template('econsults/econsults.html',
                           title='OpenConsult - eConsults',
                           econsults=econsults,
                           practice_id=practice_id)


# View all econsults for all practices (admin only)
@econsult_bp.route('/econsults/all')
@login_required
def all_econsults():
    """Displays all econsults for all practices"""

    # Gets all econsults for all practices
    CreatingProvider = db.aliased(User, name='CreatingProvider')
    AssignedSpecialist = db.aliased(User, name='AssignedSpecialist')

    econsults = (
        db.session.query(
            Consult.id,
            Consult.patient_id,
            Consult.practice_id,
            Consult.creating_provider_id,
            Consult.assigned_specialist_id,
            Consult.created_date,
            Consult.updated_date,
            Consult.specialty,
            Consult.status,
            CreatingProvider.firstname.label('creating_provider_firstname'),
            CreatingProvider.lastname.label('creating_provider_lastname'),
            AssignedSpecialist.firstname.label(
                'assigned_specialist_firstname'),
            AssignedSpecialist.lastname.label('assigned_specialist_lastname'),
            Patient.firstname.label('patient_firstname'),
            Patient.lastname.label('patient_lastname'),
            Practice.name,
        )
        .join(Practice, Consult.practice_id == Practice.id)
        .join(
            CreatingProvider,
            Consult.creating_provider_id == CreatingProvider.id
        )
        .outerjoin(
            AssignedSpecialist,
            Consult.assigned_specialist_id == AssignedSpecialist.id
        )
        .join(Patient, Consult.patient_id == Patient.id)
        .order_by(Consult.created_date.desc())
        .all()
    )

    return render_template('econsults/all_econsults.html',
                           title='OpenConsult - All eConsults',
                           econsults=econsults)


# Add econsult
@econsult_bp.route('/econsult/<int:practice_id>/add', methods=['GET', 'POST'])
@login_required
def add_econsult(practice_id):
    '''Adds a new econsult'''

    form = ConsultForm()

    # Query for patients in the practice
    patients = Patient.query.filter_by(
        practice_id=practice_id).order_by(Patient.lastname).all()

    # List of patients for the practice
    form.patient.choices = [(0, 'Select a patient')] + \
        [(patient.id, patient.lastname + ', ' + patient.firstname)
         for patient in patients]

    # Query for providers in the practice
    providers = (
        db.session.query(
            User.id,
            User.firstname,
            User.lastname,
            User.user_role,
            UserPractice.practice_id,
            UserPractice.user_id,
        )
        .filter(User.user_role == "PROVIDER")
        .join(UserPractice, User.id == UserPractice.user_id)
        .filter(UserPractice.practice_id == practice_id)
        .order_by(User.lastname)
        .all()
    )

    # List of providers for the practice
    form.creating_provider.choices = [(0, 'Select a provider')] + \
        [(provider.id, provider.lastname + ', ' + provider.firstname)
         for provider in providers]

    # If the user clicks the cancel button, redirect to the practice page
    if form.cancel.data:
        return redirect(url_for('practice.view_practice',
                                practice_id=practice_id))

    # If the user clicks the save as draft button, save the econsult as a draft
    if form.save_as_draft.data:
        # Commits new econsult's data to the database
        econsult = Consult(patient_id=form.patient.data,
                           practice_id=practice_id,
                           creating_provider_id=form.creating_provider.data,
                           created_date=datetime.now(),
                           created_by=current_user.id,
                           status="DRAFT",
                           specialty=form.specialty.data,
                           chief_complaint=form.chief_complaint.data,
                           comments_to_specialist=(
                               form.comments_to_specialist.data
                           ),
                           main_question=form.main_question.data
                           )
        db.session.add(econsult)
        db.session.commit()
        flash('eConsult submitted successfully.', 'success')
        return redirect(url_for('practice.view_practice',
                                practice_id=practice_id))

    # If the user clicks the submit to specialist button, submit the econsult
    if form.validate_on_submit():
        # Commits new econsult's data to the database
        econsult = Consult(patient_id=form.patient.data,
                           practice_id=practice_id,
                           creating_provider_id=form.creating_provider.data,
                           created_date=datetime.now(),
                           created_by=current_user.id,
                           status="READY FOR REVIEW",
                           specialty=form.specialty.data,
                           chief_complaint=form.chief_complaint.data,
                           comments_to_specialist=(
                               form.comments_to_specialist.data
                           ),
                           main_question=form.main_question.data
                           )
        db.session.add(econsult)
        db.session.commit()
        flash('eConsult submitted successfully.', 'success')
        return redirect(url_for('practice.view_practice',
                                practice_id=practice_id))

    return render_template('econsults/add_econsult.html',
                           title='OpenConsult - Add eConsult',
                           form=form,
                           practice_id=practice_id)
