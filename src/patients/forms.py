'''
Patient forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, DateField
from wtforms.validators import DataRequired, Length
from src.dictionaries.dict_street import (
    STREET_PREFIX_SUFFIX,
    STREET_TYPE_CHOICES)
from src.dictionaries.dict_us_states import STATE
from src.dictionaries.dict_patient import (
    PATIENT_SEX,
    GENDER_IDENTITY,
    SEXUAL_ORIENTATION)
from src.dictionaries.dict_general import (
    STATUS,
    NAME_SUFFIX)


# Form - Add, Edit Patient
class PatientForm(FlaskForm):
    '''Form to add or edit a patient'''

    firstname = StringField('First Name*', validators=[DataRequired()])
    middlename = StringField('Middle Name')
    lastname = StringField('Last Name*', validators=[DataRequired()])
    suffixname = SelectField('Suffix Name', choices=NAME_SUFFIX)
    status = SelectField('Status*', choices=STATUS,
                         validators=[DataRequired()])
    date_of_birth = DateField('Date of Birth*', format='%Y-%m-%d',
                              validators=[DataRequired()])
    sex = SelectField('Sex at Birth*', choices=PATIENT_SEX,
                      validators=[DataRequired()])
    gender_identity = SelectField('Gender Identity', choices=GENDER_IDENTITY)
    sexual_orientation = SelectField(
        'Sexual Orientation', choices=SEXUAL_ORIENTATION)
    mobile_number = StringField('Mobile Number')
    home_number = StringField('Home Number')
    work_number = StringField('Work Number')
    street_number = StringField(
        'Street Number*', validators=[DataRequired(), Length(min=1, max=10)])
    street_prefix = SelectField('Street Prefix', choices=STREET_PREFIX_SUFFIX)
    street_name = StringField('Street Name*', validators=[DataRequired()])
    street_type = SelectField('Street Type', choices=STREET_TYPE_CHOICES)
    street_suffix = SelectField('Street Suffix', choices=STREET_PREFIX_SUFFIX)
    apartment_unit_room = StringField('Suite/Unit Number')
    po_box_address = StringField('PO Box Address')
    city = StringField('City*', validators=[DataRequired()])
    state = SelectField('State*', choices=STATE, validators=[DataRequired()])
    zipcode = StringField('Zipcode*', validators=[DataRequired()])
    submit = SubmitField('Save')
    cancel = SubmitField('Cancel', render_kw={'formnovalidate': True})
