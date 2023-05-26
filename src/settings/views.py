'''
Views for the settings blueprint
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import (
    Specialty
)
from src.settings.forms import (
    SpecialtyForm,
)


# Blueprint
settings_bp = Blueprint('settings', __name__)


# Add Specialty
@settings_bp.route('/specialty/add', methods=['GET', 'POST'])
@login_required
def add_specialty():
    """Adds a new specialty"""

    form = SpecialtyForm()

    if form.cancel.data:
        return redirect(url_for('core.index'))

    if form.validate_on_submit():
        # Checks if specialty already exists
        if Specialty.query.filter_by(name=form.name.data).first():
            flash('Specialty already exists.', 'error')
            return redirect(url_for('settings.add_specialty'))

        # Commits new specialty's data to the database
        specialty = Specialty(name=form.name.data,
                              description=form.description.data,
                              created_by=current_user.id,
                              created_date=datetime.utcnow())

        db.session.add(specialty)
        db.session.commit()

        flash('Specialty added.', 'success')
        return redirect(url_for('core.index'))

    return render_template('settings/add_specialty.html',
                           title='OpenConsult - Add Specialty',
                           form=form)
