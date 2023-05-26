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
                          render_kw={'class': 'u-full-width select2'})
    creating_provider = SelectField(
        'Creating Provider*', coerce=int,
        validators=[DataRequired()],
        render_kw={'class': 'u-full-width select2'})
    # TODO: Make this a dropdown
    specialty = StringField('Specialty*', validators=[DataRequired()],
                            render_kw={'class': 'u-full-width'})
    chief_complaint = TextAreaField(
        'Chief Complaint*', validators=[DataRequired()],
        render_kw={'class': 'u-full-width'})
    comments_to_specialist = TextAreaField('Comments to Specialist',
                                           render_kw={'class': 'u-full-width'})
    main_question = TextAreaField(
        'Main Question*', validators=[DataRequired()],
        render_kw={'class': 'u-full-width'})
    submit = SubmitField('Save', render_kw={'class': 'button-primary'})
    cancel = SubmitField('Cancel', render_kw={'formnovalidate': True})
