'''
Main views for the core app
'''


# Imports
from flask import render_template, Blueprint, flash


# Blueprint
core_bp = Blueprint('core', __name__)


# Home page
@core_bp.route('/')
def index():
    '''Home page'''

    # Testing flash messages
    flash('Page loaded successfully.', 'success')

    return render_template('core/index.html',
                           title='OpenConsult - Home')
