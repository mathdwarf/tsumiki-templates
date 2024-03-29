from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_user, logout_user, login_required, current_user
from flask_bcrypt import check_password_hash, generate_password_hash

from ..models.db_manager import db_manager
from ..models.user import User

auth = Blueprint('auth', __name__, url_prefix='/')

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            return redirect(url_for('auth.register'))

        new_user = User(email=email, name=name, password=generate_password_hash(password))
        is_success = db_manager.add_user(new_user)

        if is_success:
            return redirect(url_for('auth.login'))
        else:
            return redirect('')

    else:
        return render_template('registration.html')

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = True if request.form.get('remember') else False

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            flash('Please check your login details and try again.')
            return redirect(url_for('auth.login', is_authenticated=False))

        login_user(user, remember=remember)
        return redirect(url_for('main.index'))

    else:
        if current_user.is_authenticated:
            return redirect(url_for('main.index'))
        else:
            return render_template('login.html')

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
