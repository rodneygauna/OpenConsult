'''
CLI Commands for the app
'''


# Imports
import random
from faker import Faker
from flask import Blueprint
from werkzeug.security import generate_password_hash
from src import db
from src.models import (
    User,
    Patient,
    Practice,
    UserPractice,
)
from src.dictionaries.dict_patient import (
    PATIENT_SEX,
    GENDER_IDENTITY,
    SEXUAL_ORIENTATION,
)
from src.dictionaries.dict_general import (
    USER_ROLE,
    USER_TYPE,
    NAME_SUFFIX,
)
from src.dictionaries.dict_street import (
    STREET_PREFIX_SUFFIX,
    STREET_TYPE_CHOICES,
)


# Faker instance
faker = Faker()


# Blueprint initialization
commands_bp = Blueprint('commands', __name__)


# Flask CLI Commands
@commands_bp.cli.command('db_create')
def db_create():
    '''Creates the database using SQLAlchemy'''
    db.create_all()
    print('Database created!')


@commands_bp.cli.command('db_drop')
def db_drop():
    '''Drops the database using SQLAlchemy'''
    db.drop_all()
    print('Database dropped!')


@commands_bp.cli.command('db_seed')
def db_seed():
    '''Seeds the database'''
    # Data to see the database with
    data = []

    # Create Admin - This needs to be first in this function
    data.append(User(
        email="admin@openconsult.com",
        password_hash=generate_password_hash(
            "admin@openconsult.com"),
        user_role='ADMIN',
        user_type='SUPER USER'
    ))

    # Create users
    for i in range(1, 51):

        data.append(User(
            email=f"test{i}@openconsult.com",
            password_hash=generate_password_hash(
                f"test{i}@openconsult.com"),
            user_role=random.choice([item[0] for item in USER_ROLE]),
            user_type=random.choice([item[0] for item in USER_TYPE]),
            firstname=faker.first_name(),
            lastname=faker.last_name()
        ))

    # Create practices
    for i in range(1, 11):

        data.append(Practice(
            name=f"Practice {i}",
            street_number=faker.building_number(),
            street_name=faker.street_name(),
            city=faker.city(),
            state=faker.state_abbr(),
            zipcode=faker.postcode(),
            phone_number=random.randint(1000000000, 9999999999),
            created_by=1  # Admin user's ID
        ))

    # Associate all users with first practice
    for i in range(1, 51):
        data.append(UserPractice(
            user_id=i,
            practice_id=1
        ))

    # Associate users with other practices
    for i in range(1, 51):
        data.append(UserPractice(
            user_id=i,
            practice_id=i
        ))

    # Create patients
    for i in range(1, 101):
        data.append(Patient(
            firstname=faker.first_name(),
            middlename=faker.first_name(),
            lastname=faker.last_name(),
            suffixname=random.choice([item[0] for item in NAME_SUFFIX]),
            date_of_birth=faker.date_of_birth(),
            sex=random.choice([item[0] for item in PATIENT_SEX]),
            gender_identity=random.choice(
                [item[0] for item in GENDER_IDENTITY]),
            sexual_orientation=random.choice(
                [item[0] for item in SEXUAL_ORIENTATION]),
            mobile_number=random.randint(1000000000, 9999999999),
            street_number=faker.building_number(),
            street_prefix=random.choice([item[0]
                                        for item in STREET_PREFIX_SUFFIX]),
            street_name=faker.street_name(),
            street_type=random.choice([item[0]
                                      for item in STREET_TYPE_CHOICES]),
            street_suffix=random.choice([item[0]
                                        for item in STREET_PREFIX_SUFFIX]),
            apartment_unit_room=random.choice(
                ['Apt', 'Suite']) + faker.building_number(),
            po_box_address=random.choice(
                ['PO Box', 'P.O. Box']) + faker.building_number(),
            city=faker.city(),
            state=faker.state_abbr(),
            zipcode=faker.postcode(),
        ))

    # Add data to the database
    for entry in data:
        db.session.add(entry)
    db.session.commit()
    print("Database seeded!")
