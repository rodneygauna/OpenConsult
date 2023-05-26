'''
Views for the patient blueprint
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import Patient, Practice
from src.patients.forms import PatientForm


# Blueprint
patient_bp = Blueprint('patient', __name__)


# View patients
@patient_bp.route('/patients/<int:practice_id>')
@login_required
def patients(practice_id):
    '''Displays all patients for a practice'''

    # Gets all patients for a practice
    patients = Patient.query.filter_by(practice_id=practice_id)\
        .order_by(Patient.lastname).all()

    return render_template('patients/patients.html',
                           title='OpenConsult - Patients',
                           patients=patients,
                           practice_id=practice_id)


# View patient
@patient_bp.route('/patient/<int:patient_id>')
@login_required
def view_patient(patient_id):
    '''Displays a patient's information'''

    # Gets patient's information
    patient = Patient.query.get_or_404(patient_id)

    return render_template('patients/view_patient.html',
                           title='OpenConsult - Patient',
                           patient=patient)


# Add patient
@ patient_bp.route('/patient/<int:practice_id>/add', methods=['GET', 'POST'])
@ login_required
def add_patient(practice_id):
    '''Adds a new patient'''

    form = PatientForm()

    # Practice variable for the cancel button
    practice = Practice.query.get_or_404(practice_id)

    if form.validate_on_submit():
        if form.cancel.data:
            return redirect(url_for('practice.view_practice',
                                    practice_id=practice_id))
        # Commits new practice's patient data to the database
        patient = Patient(practice_id=practice_id,
                          firstname=form.firstname.data,
                          middlename=form.middlename.data,
                          lastname=form.lastname.data,
                          suffixname=form.suffixname.data,
                          status=form.status.data,
                          date_of_birth=form.date_of_birth.data,
                          sex=form.sex.data,
                          gender_identity=form.gender_identity.data,
                          sexual_orientation=form.sexual_orientation.data,
                          mobile_number=form.mobile_number.data,
                          home_number=form.home_number.data,
                          work_number=form.work_number.data,
                          street_number=form.street_number.data,
                          street_prefix=form.street_prefix.data,
                          street_name=form.street_name.data,
                          street_type=form.street_type.data,
                          street_suffix=form.street_suffix.data,
                          apartment_unit_room=form.apartment_unit_room.data,
                          po_box_address=form.po_box_address.data,
                          city=form.city.data,
                          state=form.state.data,
                          zipcode=form.zipcode.data,
                          created_by=current_user.id,
                          updated_by=current_user.id,
                          updated_date=datetime.utcnow())

        db.session.add(patient)
        db.session.commit()
        flash('Patient added successfully.', 'success')
        return redirect(url_for('practice.view_practice',
                                practice_id=practice_id))

    return render_template('patients/add_patient.html',
                           title='OpenConsult - Add Patient',
                           form=form,
                           practice=practice)


# Edit patient
@ patient_bp.route('/patient/<int:patient_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_patient(patient_id):
    '''Edits a patient's information'''

    form = PatientForm()

    # Queries patient's information
    patient = Patient.query.get_or_404(patient_id)

    # Get patient information
    if request.method == 'GET':
        form.firstname.data = patient.firstname
        form.middlename.data = patient.middlename
        form.lastname.data = patient.lastname
        form.suffixname.data = patient.suffixname
        form.status.data = patient.status
        form.date_of_birth.data = patient.date_of_birth
        form.sex.data = patient.sex
        form.gender_identity.data = patient.gender_identity
        form.sexual_orientation.data = patient.sexual_orientation
        form.mobile_number.data = patient.mobile_number
        form.home_number.data = patient.home_number
        form.work_number.data = patient.work_number
        form.street_number.data = patient.street_number
        form.street_prefix.data = patient.street_prefix
        form.street_name.data = patient.street_name
        form.street_type.data = patient.street_type
        form.street_suffix.data = patient.street_suffix
        form.apartment_unit_room.data = patient.apartment_unit_room
        form.po_box_address.data = patient.po_box_address
        form.city.data = patient.city
        form.state.data = patient.state
        form.zipcode.data = patient.zipcode

    # Edits patient's information
    if form.validate_on_submit():
        # Check if user clicked cancel
        if form.cancel.data:
            return redirect(url_for('patient.view_patient',
                                    patient_id=patient_id))
        patient.firstname = form.firstname.data
        patient.middlename = form.middlename.data
        patient.lastname = form.lastname.data
        patient.suffixname = form.suffixname.data
        patient.status = form.status.data
        patient.date_of_birth = form.date_of_birth.data
        patient.sex = form.sex.data
        patient.gender_identity = form.gender_identity.data
        patient.sexual_orientation = form.sexual_orientation.data
        patient.mobile_number = form.mobile_number.data
        patient.home_number = form.home_number.data
        patient.work_number = form.work_number.data
        patient.street_number = form.street_number.data
        patient.street_prefix = form.street_prefix.data
        patient.street_name = form.street_name.data
        patient.street_type = form.street_type.data
        patient.street_suffix = form.street_suffix.data
        patient.apartment_unit_room = form.apartment_unit_room.data
        patient.po_box_address = form.po_box_address.data
        patient.city = form.city.data
        patient.state = form.state.data
        patient.zipcode = form.zipcode.data
        patient.updated_date = datetime.utcnow()
        patient.updated_by = current_user.id
        db.session.commit()
        flash('Patient updated successfully.', 'success')
        return redirect(url_for('patient.view_patient', patient_id=patient_id))

    return render_template('patients/add_patient.html',
                           title='OpenConsult - Edit Patient',
                           form=form,
                           patient=patient)
