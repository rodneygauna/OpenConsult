'''
User forms for the application.
'''


# Imports
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, EqualTo
from wtforms import ValidationError
from src.models import User
from src.dictionaries.dict_general import USER_ROLE, USER_TYPE


# Register user form
class RegisterUserForm(FlaskForm):
    '''Register user form'''

    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo(
        'pass_confirm', message='Passwords must match.')])
    pass_confirm = PasswordField(
        'Confirm Password', validators=[DataRequired()])
    submit = SubmitField('Register')

    def check_email(self, field):
        '''Check if email is already registered.'''
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('This email is already registered.')


# Form - Edit User Profile
class EditUserForm(FlaskForm):
    '''Form to edit a user profile'''

    email = StringField('Email', validators=[DataRequired(), Email()])
    username = StringField('Username', validators=[DataRequired()])
    picture = FileField('Update Profile Picture', validators=[
                        FileAllowed(['jpg', 'png'])])
    submit = SubmitField('Save')

    def check_email(self, field):
        '''Check if email is already registered.'''
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('This email is already registered.')


# Form - Login
class LoginForm(FlaskForm):
    '''Form to login a user'''

    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Log In')


# Form - Add Practice User
class AddPracticeUserForm(FlaskForm):
    '''Form to add a user to a practice'''

    user_role = SelectField('User Role', choices=USER_ROLE,
                            validators=[DataRequired()])
    user_type = SelectField('User Type', choices=USER_TYPE,
                            validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo(
        'pass_confirm', message='Passwords must match.')])
    pass_confirm = PasswordField(
        'Confirm Password', validators=[DataRequired()])
    submit = SubmitField('Add User')
