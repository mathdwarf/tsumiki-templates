from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_login import LoginManager

from .views.main import main
from .views.auth import auth
from .models.db_manager import db_manager
from .models.user import User

def create_app():
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    app.config['RATELIMIT_HEADERS_ENABLED'] = True
    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    limiter = Limiter(app, key_func=get_remote_address, default_limits=["100/day;50/hour;10/minute;1/second"])
    limiter.limit("100/day;50/hour;10/minute;1/second")

    app.register_blueprint(main)
    app.register_blueprint(auth)

    db_manager.init_db(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app
