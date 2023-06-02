'''
eConsult forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from wtforms import SelectField, SubmitField, TextAreaField
from wtforms.validators import DataRequired
from src.icd10.dictionaries import ICD_10_CM


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


class ConsultResponseForm(FlaskForm):
    """Form to add or edit a consult response"""

    comments = TextAreaField('Comments*', validators=[DataRequired()],
                             render_kw={'class': 'u-full-width'})
    treatment_options = TextAreaField('Treatment Options',
                                      render_kw={'class': 'u-full-width'})
    potential_diagnosis_1 = SelectField(
        'Potential Diagnosis 1', coerce=int,
        choices=ICD_10_CM,
        render_kw={'class': 'u-full-width select2'})
    potential_diagnosis_2 = SelectField(
        'Potential Diagnosis 2', coerce=int,
        choices=ICD_10_CM,
        render_kw={'class': 'u-full-width select2'})
    potential_diagnosis_3 = SelectField(
        'Potential Diagnosis 3', coerce=int,
        choices=ICD_10_CM,
        render_kw={'class': 'u-full-width select2'})
    potential_diagnosis_4 = SelectField(
        'Potential Diagnosis 4', coerce=int,
        choices=ICD_10_CM,
        render_kw={'class': 'u-full-width select2'})
    submit = SubmitField('Submit', render_kw={'class': 'button-primary'})
