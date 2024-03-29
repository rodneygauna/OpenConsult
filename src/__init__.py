'''
Initialization and configuration for the application.
'''


# Imports
import os
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager


# Read .env file
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')


# SQLite database
SQLITE_LOCATION = os.getenv(
    "SQLITE_LOCATION", os.path.abspath(os.path.dirname(__file__))
)


# Flask initialization
app = Flask(__name__)
basedir = SQLITE_LOCATION
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(
    basedir, 'database.db')


# Database initialization
db = SQLAlchemy(app)


# Migrations initialization
Migrate(app, db)


# Login manager initialization
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'users.login'


# Flask Blueprints
from src.cli_commands.cli_commands import commands_bp
from src.core.views import core_bp
from src.users.views import users_bp
from src.practices.views import practice_bp
from src.patients.views import patient_bp
from src.econsult.views import econsult_bp
from src.settings.views import settings_bp

app.register_blueprint(commands_bp)
app.register_blueprint(core_bp)
app.register_blueprint(users_bp)
app.register_blueprint(practice_bp)
app.register_blueprint(patient_bp)
app.register_blueprint(econsult_bp)
app.register_blueprint(settings_bp)
