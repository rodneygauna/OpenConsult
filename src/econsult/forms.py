'''
eConsult forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


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
    specialty = SelectField('Specialty*', coerce=int,
                            validators=[DataRequired()],
                            render_kw={'class': 'u-full-width select2'})
    chief_complaint = TextAreaField(
        'Chief Complaint*', validators=[DataRequired()],
        render_kw={'class': 'u-full-width'})
    comments_to_specialist = TextAreaField('Comments to Specialist',
                                           render_kw={'class': 'u-full-width'})
    main_question = TextAreaField(
        'Main Question*', validators=[DataRequired()],
        render_kw={'class': 'u-full-width'})
    submit = SubmitField('Submit to Specialists', render_kw={
                         'class': 'button-primary'})
    save_as_draft = SubmitField('Save as Draft', render_kw={
                                'class': 'button-secondary'})
    cancel = SubmitField('Cancel', render_kw={'formnovalidate': True})
