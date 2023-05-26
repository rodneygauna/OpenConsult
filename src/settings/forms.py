'''
Settings forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField


# Form - Add, Edit Specialty
class SpecialtyForm(FlaskForm):
    """Form to add or edit a specialty"""

    name = StringField('Name*', render_kw={'class': 'u-full-width'})
    description = TextAreaField('Description', render_kw={
                                'class': 'u-full-width'})
    submit = SubmitField('Submit', render_kw={'class': 'button-primary'})
    cancel = SubmitField('Cancel', render_kw={'formnovalidate': True})
