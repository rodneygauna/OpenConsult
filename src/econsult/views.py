'''
Views for the econsult portion of the app.
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import current_user, login_required
from src import db
from src.models import Consult
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
