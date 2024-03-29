from flask import Flask
from flask_limiter import Limiter

from .api.template_api import template_api

def create_app():
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    app.config['RATELIMIT_HEADERS_ENABLED'] = True
    
    limiter = Limiter(app, default_limits=["100/day;50/hour;10/minute;1/second"])
    limiter.limit("100/day;50/hour;10/minute;1/second")

    app.register_blueprint(template_api)
    return app
