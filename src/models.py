'''
Database models for the application.
'''

# Imports
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from src import db, login_manager


# User model
@login_manager.user_loader
def load_user(user_id):
    '''Loads the user from the database'''
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    '''User model'''

    __tablename__ = 'users'

    # IDs
    id = db.Column(db.Integer, primary_key=True)
    # Login Information
    email = db.Column(db.String(255), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    # Timestamps
    created_date = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow)
    # User Role
    user_role = db.Column(db.String(10), default='STAFF')
    # User Type
    user_type = db.Column(db.String(10), default='USER')
    # Status
    status = db.Column(db.String(10), default='ACTIVE')
    # Profile Picture
    profile_image = db.Column(
        db.String(255), nullable=False, default='default_profile.png')
    # User Demographics
    firstname = db.Column(db.String(255))
    middlename = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    suffixname = db.Column(db.String(5))
    credentials = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''Checks if the password is correct'''
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"User email: {self.email}"


class Practice(db.Model):
    '''Practice model'''

    __tablename__ = 'practices'

    # IDs
    id = db.Column(db.Integer, primary_key=True)
    # Timestamps
    created_date = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    updated_date = db.Column(db.DateTime, default=datetime.utcnow)
    updated_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Practice Information
    name = db.Column(db.Text, nullable=False)
    street_number = db.Column(db.String(10))
    street_prefix = db.Column(db.String(2))
    street_name = db.Column(db.Text)
    street_type = db.Column(db.String(5))
    street_suffix = db.Column(db.String(2))
    suite_unit_number = db.Column(db.Text)
    po_box_address = db.Column(db.Text)
    city = db.Column(db.Text)
    state = db.Column(db.String(2))
    zipcode = db.Column(db.String(10))
    phone_number = db.Column(db.String(10))
    fax_number = db.Column(db.String(10))
    email = db.Column(db.String(255))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Practice Name: {self.name}"


class UserPractice(db.Model):
    '''User Practice model'''

    __tablename__ = 'user_practice'

    # IDs
    id = db.Column(db.Integer, primary_key=True)
    # User ID
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Practice ID
    practice_id = db.Column(db.Integer, db.ForeignKey('practices.id'))

    def __init__(self, user_id, practice_id):
        self.user_id = user_id
        self.practice_id = practice_id

    def __repr__(self):
        return f"User ID: {self.user_id} Practice ID: {self.practice_id}"


class Patient(db.Model):
    '''Patient model'''

    __tablename__ = 'patients'

    # IDs
    id = db.Column(db.Integer, primary_key=True)
    # Timestamps
    created_date = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    updated_date = db.Column(db.DateTime, default=datetime.utcnow)
    updated_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Status
    status = db.Column(db.String(10), default='ACTIVE')
    # Profile Picture
    profile_image = db.Column(
        db.String(255), nullable=False, default='default_profile.png')
    # Patient Demographics
    firstname = db.Column(db.String(255), nullable=False)
    middlename = db.Column(db.String(255))
    lastname = db.Column(db.String(255), nullable=False)
    suffixname = db.Column(db.String(5))
    # Patient Date of Birth
    date_of_birth = db.Column(db.Date, nullable=False)
    # Patient Sex at Birth
    sex = db.Column(db.String(1), nullable=False)
    # Patient Gender Identity
    gender_idenity = db.Column(db.Text)
    # Patient Sexual Orientation
    sexual_orientation = db.Column(db.Text)
    # Patient Contact Information
    mobile_number = db.Column(db.String(10))
    home_number = db.Column(db.String(10))
    work_number = db.Column(db.String(10))
    # Patient Address
    street_number = db.Column(db.String(10))
    street_prefix = db.Column(db.String(2))
    street_name = db.Column(db.Text)
    street_type = db.Column(db.String(5))
    street_suffix = db.Column(db.String(2))
    apartment_unit_room = db.Column(db.Text)
    po_box_address = db.Column(db.Text)
    city = db.Column(db.Text)
    state = db.Column(db.String(2))
    zipcode = db.Column(db.String(10))

    def __init__(self, firstname, lastname, date_of_birth, sex):
        self.firstname = firstname
        self.lastname = lastname
        self.date_of_birth = date_of_birth
        self.sex = sex

    def __repr__(self):
        return f"Patient Name: {self.firstname} {self.lastname}"
