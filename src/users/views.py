'''
Views for the user blueprint
'''


# Imports
from datetime import datetime
from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from src import db
from src.users.forms import RegisterUserForm, LoginForm, EditUserForm
from src.models import User
from src.users.picture_handler import add_profile_pic


# Blueprint
users_bp = Blueprint('users', __name__)


# Register user
@users_bp.route('/register', methods=['GET', 'POST'])
def register_user():
    '''Registers a new user'''

    form = RegisterUserForm()

    if form.validate_on_submit():
        # Checks if email is already registered
        if User.query.filter_by(email=form.email.data).first():
            flash('Email already registered.')
            return redirect(url_for('users.register_user'))

        # Commits new user's data to the database
        user = User(email=form.email.data,
                    password=form.password.data)

        db.session.add(user)
        db.session.commit()
        flash('Registration successful.')
        return redirect(url_for('users.login'))

    return render_template('users/register.html',
                           title='LFWarchief - Create Account',
                           form=form)


# Login user
@users_bp.route('/login', methods=['GET', 'POST'])
def login():
    '''Logs in a user'''

    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()

        if user.check_password(form.password.data) and user is not None:
            login_user(user)

            next = request.args.get('next')

            if next is None or not next[0] == '/':
                next = url_for('core.index')

            flash('Login successful.')
            return redirect(next)

    return render_template('users/login.html',
                           title='LFWarchief - Login',
                           form=form)


# Logout user
@users_bp.route('/logout')
@login_required
def logout():
    '''Logs out a user'''

    logout_user()
    return redirect(url_for('core.index'))


# Edit user profile
@users_bp.route('/account', methods=['GET', 'POST'])
@login_required
def account():
    '''Edits a user's profile'''

    form = EditUserForm()

    if form.validate_on_submit():
        # Checks if a new profile picture is being uplaoded
        if form.picture.data:
            username = current_user.username
            pic = add_profile_pic(form.picture.data, username)
            current_user.profile_image = pic

        current_user.username = form.username.data
        current_user.email = form.email.data
        current_user.updated_date = datetime.utcnow()
        db.session.commit()
        flash('User Account Updated')
        return redirect(url_for('users.account'))

    elif request.method == 'GET':
        form.email.data = current_user.email

    profile_image = url_for(
        'static', filename='profile_pics/' + current_user.profile_image)
    return render_template('users/account.html',
                           title='LFWarchief - Account',
                           profile_image=profile_image,
                           form=form)
