'''
Practice forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length
from src.dictionaries.dict_street import (
    STREET_PREFIX_SUFFIX,
    STREET_TYPE_CHOICES)
from src.dictionaries.dict_us_states import STATE


# Form - Add, Edit Practice
class PracticeForm(FlaskForm):
    '''Form to add or edit a practice'''

    name = StringField('Name*', validators=[DataRequired()])
    street_number = StringField(
        'Street Number*', validators=[DataRequired(), Length(min=1, max=10)])
    street_prefix = SelectField('Street Prefix', choices=STREET_PREFIX_SUFFIX)
    street_name = StringField('Street Name*', validators=[DataRequired()])
    street_type = SelectField('Street Type', choices=STREET_TYPE_CHOICES)
    street_suffix = SelectField('Street Suffix', choices=STREET_PREFIX_SUFFIX)
    suite_unit_number = StringField('Suite/Unit Number')
    po_box_address = StringField('PO Box Address')
    city = StringField('City*', validators=[DataRequired()])
    state = SelectField('State*', choices=STATE, validators=[DataRequired()])
    zipcode = StringField('Zipcode*', validators=[DataRequired()])
    phone_number = StringField('Phone Number*', validators=[DataRequired()])
    fax_number = StringField('Fax Number')
    email = StringField('Email')
    submit = SubmitField('Save')
    cancel = SubmitField('Cancel', render_kw={'formnovalidate': True})
