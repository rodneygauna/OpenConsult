'''
Views for the practice blueprint
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import Practice, Patient, UserPractice
from src.practices.forms import PracticeForm


# Blueprint
practice_bp = Blueprint('practice', __name__)


# View practices
@practice_bp.route('/practices')
@login_required
def practices():
    '''Displays all practices'''

    # Checks if user is an admin
    if current_user.user_role != 'ADMIN':
        return 'You are not authorized to view this page.', 401

    # Gets all practices
    practices = Practice.query.order_by(Practice.name).all()
    # Gets the count of each patient per practice
    patient_count = Patient.query.with_entities(
        Patient.practice_id, db.func.count(Patient.id))\
        .group_by(Patient.practice_id).all()

    return render_template('practices/practices.html',
                           title='OpenConsult - Practices',
                           practices=practices,
                           patient_count=patient_count)


# Add practice
@practice_bp.route('/practice/add', methods=['GET', 'POST'])
@login_required
def add_practice():
    '''Adds a new practice'''

    form = PracticeForm()

    # Checks if user is an admin
    if current_user.user_role != 'ADMIN':
        return 'You are not authorized to view this page.', 401

    if form.validate_on_submit():
        if form.cancel.data:
            return redirect(url_for('practice.practices'))
        # Commits new practice's data to the database
        practice = Practice(name=form.name.data,
                            street_number=form.street_number.data,
                            street_prefix=form.street_prefix.data,
                            street_name=form.street_name.data,
                            street_type=form.street_type.data,
                            street_suffix=form.street_suffix.data,
                            suite_unit_number=form.suite_unit_number.data,
                            po_box_address=form.po_box_address.data,
                            city=form.city.data,
                            state=form.state.data,
                            zipcode=form.zipcode.data,
                            phone_number=form.phone_number.data,
                            fax_number=form.fax_number.data,
                            email=form.email.data,
                            created_by=current_user.id,
                            updated_by=current_user.id)

        db.session.add(practice)
        db.session.commit()
        flash('Practice added successfully.', 'success')
        return redirect(url_for('practice.practices'))

    return render_template('practices/add_practice.html',
                           title='OpenConsult - Add Practice',
                           form=form)


# Edit practice
@practice_bp.route('/practice/<int:practice_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_practice(practice_id):
    '''Edits a practice'''

    form = PracticeForm()

    # Checks if user is an admin
    if current_user.user_role != 'ADMIN':
        return 'You are not authorized to view this page.', 401

    # Queries the practice id
    practice = Practice.query.get_or_404(practice_id)

    # Gets practice info
    if request.method == 'GET':
        form.name.data = practice.name
        form.street_number.data = practice.street_number
        form.street_prefix.data = practice.street_prefix
        form.street_name.data = practice.street_name
        form.street_type.data = practice.street_type
        form.street_suffix.data = practice.street_suffix
        form.suite_unit_number.data = practice.suite_unit_number
        form.po_box_address.data = practice.po_box_address
        form.city.data = practice.city
        form.state.data = practice.state
        form.zipcode.data = practice.zipcode
        form.phone_number.data = practice.phone_number
        form.fax_number.data = practice.fax_number
        form.email.data = practice.email

    # Edits practice info
    if form.validate_on_submit():
        # Check if user clicked cancel
        if form.cancel.data:
            return redirect(url_for('practice.practices'))
        practice.name = form.name.data
        practice.street_number = form.street_number.data
        practice.street_prefix = form.street_prefix.data
        practice.street_name = form.street_name.data
        practice.street_type = form.street_type.data
        practice.street_suffix = form.street_suffix.data
        practice.suite_unit_number = form.suite_unit_number.data
        practice.po_box_address = form.po_box_address.data
        practice.city = form.city.data
        practice.state = form.state.data
        practice.zipcode = form.zipcode.data
        practice.phone_number = form.phone_number.data
        practice.fax_number = form.fax_number.data
        practice.email = form.email.data
        practice.updated_at = datetime.utcnow()
        practice.updated_by = current_user.id
        db.session.commit()
        flash('Practice updated successfully.', 'success')
        return redirect(url_for('practice.practices'))

    return render_template('practices/add_practice.html',
                           title='OpenConsult - Edit Practice',
                           form=form,
                           practice=practice)


# View practice
@practice_bp.route('/practice/<int:practice_id>')
@login_required
def view_practice(practice_id):
    '''Displays a practice'''

    # Checks if user is an admin
    if current_user.user_role != 'ADMIN':
        return 'You are not authorized to view this page.', 401

    # Queries the practice id
    practice = Practice.query.get_or_404(practice_id)
    # Queries the practice's patients
    patient_count = Patient.query.filter_by(practice_id=practice_id).count()
    user_count = UserPractice.query.filter_by(practice_id=practice_id).count()

    return render_template('practices/view_practice.html',
                           title='OpenConsult - View Practice',
                           practice=practice,
                           patient_count=patient_count,
                           user_count=user_count)


"""
TODO:
- Add Practice User (provider, staff)
- View Practice User (provider, staff)
- Edit Practice User (provider, staff)
"""
