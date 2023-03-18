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

    # Gets all practices
    practices = Practice.query.order_by(Practice.name).all()

    return render_template('practices/practices.html',
                           title='LFWarchief - Practices',
                           practices=practices)
