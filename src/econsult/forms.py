'''
eConsult forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, TextAreaField
from wtforms.validators import DataRequired
from src.econsult.dictionaries import CONSULT_STATUS


# Form - Add, Edit Consult
class ConsultForm(FlaskForm):
    '''Form to add or edit a consult'''

    patient = SelectField('Patient*', coerce=int,
                          validators=[DataRequired()],
                          render_kw={'class': 'select2'})
    creating_provider = SelectField(
        'Creating Provider*', coerce=int,
        validators=[DataRequired()],
        render_kw={'class': 'select2'})
    status = SelectField('Status*', choices=CONSULT_STATUS,
                         validators=[DataRequired()])
    # TODO: Make this a dropdown
    specialty = StringField('Specialty*', validators=[DataRequired()])
    chief_complaint = TextAreaField(
        'Chief Complaint*', validators=[DataRequired()])
    comments_to_specialist = TextAreaField('Comments to Specialist')
    main_question = TextAreaField(
        'Main Question*', validators=[DataRequired()])
    submit = SubmitField('Save')
    cancel = SubmitField('Cancel', render_kw={'formnovalidate': True})
