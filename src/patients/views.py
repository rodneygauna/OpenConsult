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


# Add patient
@patient_bp.route('/patient/<int:practice_id>/add', methods=['GET', 'POST'])
@login_required
def add_patient(practice_id):
    '''Adds a new patient'''

    form = PatientForm()

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
                          gender_idenity=form.gender_idenity.data,
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
                           form=form)
