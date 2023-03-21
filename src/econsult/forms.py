'''
eConsult forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SearchField, SubmitField
from wtforms.validators import DataRequired
from src.econsult.dictionaries import CONSULT_STATUS


# Form - Add, Edit Consult
class ConsultForm(FlaskForm):
    '''Form to add or edit a consult'''

    patient = SearchField('Patient*', validators=[DataRequired()])
    creating_provider = SearchField(
        'Creating Provider*', validators=[DataRequired()])
    assigned_specialist = SearchField('Assigned Specialist')
    status = SelectField('Status*', choices=CONSULT_STATUS,
                         validators=[DataRequired()])
    # TODO: Make this a dropdown
    specialty = StringField('Specialty*', validators=[DataRequired()])
    chief_complaint = StringField(
        'Chief Complaint*', validators=[DataRequired()])
    comments_to_specialist = StringField('Comments to Specialist')
    main_question = StringField('Main Question*', validators=[DataRequired()])
    submit = SubmitField('Save')
    cancel = SubmitField('Cancel', render_kw={'formnovalidate': True})
