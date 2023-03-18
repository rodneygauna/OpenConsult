'''
Views for the practice blueprint
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import Practice


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
                           title='LFWarchief - Practices',
                           practices=practices)


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
