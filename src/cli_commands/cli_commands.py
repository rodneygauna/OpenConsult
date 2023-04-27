'''
CLI Commands for the app
'''


# Imports
import random
import names
from flask import Blueprint
from werkzeug.security import generate_password_hash
from src import db
from src.models import User, Patient, Practice, UserPractice, Consult


# Blueprint initialization
commands_bp = Blueprint('commands', __name__)


# Flask CLI Commands
@commands_bp.cli.command('create_db')
def db_create():
    '''Creates the database using SQLAlchemy'''
    db.create_all()
    print('Database created!')


@commands_bp.cli.command('drop_db')
def db_drop():
    '''Drops the database using SQLAlchemy'''
    db.drop_all()
    print('Database dropped!')


@commands_bp.cli.command('seed_db')
def db_seed():
    '''Seeds the database'''
    # Data to see the database with
    data = []

    # Create Admin - This needs to be first in this function
    data.append(User(
        email="admin@openconsult.com",
        password=generate_password_hash(
            "admin@openconsult.com", method='sha256'),
        user_role='ADMIN',
        user_type='SUPER USER'))

    # Create users
    for i in range(1, 11):
        user_role = random.choice(['PROVIDER', 'SPECIALIST', 'STAFF'])

        data.append(User(
            email=f"test{i}@openconsult.com",
            password=generate_password_hash(
                f"test{i}@openconsult.com", method='sha256'),
            user_role=user_role,
            user_type='USER'))

    # Create practices
    for i in range(1, 11):
        street_number = random.randint(1, 1000)
        street_name = names.get_last_name()
        city = names.get_last_name()
        state = random.choice(['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE'])
        zipcode = random.randint(10000, 99999)
        phone_number = random.randint(1000000000, 9999999999)

        data.append(Practice(
            name=f"Practice {i}",
            street_number=street_number,
            street_name=street_name,
            city=city,
            state=state,
            zipcode=zipcode,
            phone_number=phone_number,
            created_by=1))  # Admin user's ID

    # Add data to the database
    for entry in data:
        db.session.add(entry)
    db.session.commit()
    print("Database seeded!")
