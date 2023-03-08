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

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, index=True)
    profile_image = db.Column(
        db.String(20), nullable=False, default='default_profile.png')
    password_hash = db.Column(db.String(128))
    created_date = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow)
    firstname = db.Column(db.String(255))
    middlename = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    status = db.Column(db.String(10), default='Active')

    def __init__(self, email, password):
        self.email = email
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''Checks if the password is correct'''
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"User email: {self.email}"
