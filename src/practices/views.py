'''
Views for the practice blueprint
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import Practice
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

    return render_template('practices/practices.html',
                           title='OpenConsult - Practices',
                           practices=practices)


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
                            email=form.email.data)

        db.session.add(practice)
        db.session.commit()
        flash('Practice added successfully.')
        return redirect(url_for('practice.practices'))

    return render_template('practices/add_practice.html',
                           title='OpenConsult - Add Practice',
                           form=form)


"""
TODO:
- View Practice
- Edit Practice
- Add Practice User (provider, staff)
- View Practice User (provider, staff)
- Edit Practice User (provider, staff)
- Add Patient
- View Patient
- Edit Patient
"""
