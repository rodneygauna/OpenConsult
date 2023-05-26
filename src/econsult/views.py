'''
Views for the econsult portion of the app.
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import Consult, Patient, User, UserPractice
from src.econsult.forms import ConsultForm


# Blueprint
econsult_bp = Blueprint('econsult', __name__)


# View econsults
@econsult_bp.route('/econsults/<int:practice_id>')
@login_required
def econsults(practice_id):
    '''Displays all econsults for a practice'''

    # Gets all econsults for a practice
    econsults = Consult.query.filter_by(practice_id=practice_id)\
        .order_by(Consult.created_date).all()

    return render_template('econsults/econsults.html',
                           title='OpenConsult - eConsults',
                           econsults=econsults,
                           practice_id=practice_id)


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
        [(patient.id, patient.firstname + ' ' + patient.lastname)
         for patient in patients]

    # Query for providers in the practice
    providers = User.query.join(UserPractice).filter(
        UserPractice.practice_id == practice_id).order_by(User.lastname).all()

    # List of providers for the practice
    form.creating_provider.choices = [(0, 'Select a provider')] + \
        [(provider.id, provider.id)
         for provider in providers]

    if form.validate_on_submit():
        if form.cancel.data:
            return redirect(url_for('practice.view_practice',
                                    practice_id=practice_id))
        # Commits new econsult's data to the database
        econsult = Consult(patient_id=form.patient.data,
                           practice_id=practice_id,
                           created_date=datetime.now(),
                           created_by=current_user.id,
                           last_updated_date=datetime.now(),
                           last_updated_by=current_user.id,
                           creating_provider_id=form.creating_provider.data,
                           status="DRAFT",
                           specialty=form.specialty.data,
                           chief_complaint=form.chief_complaint.data,
                           comments_to_specialist=form.comments_to_specialist.data,
                           main_question=form.main_question.data
                           )
        db.session.add(econsult)
        db.session.commit()
        flash('eConsult added successfully.', 'success')
        return redirect(url_for('practice.view_practice',
                                practice_id=practice_id))

    return render_template('econsults/add_econsult.html',
                           title='OpenConsult - Add eConsult',
                           form=form,
                           practice_id=practice_id)
