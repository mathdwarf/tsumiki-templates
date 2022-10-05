from ..utils import get_app_logger, get_exception_status_code
logger = get_app_logger(__name__)

from flask import Blueprint, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import \
    BadRequest, InternalServerError, MethodNotAllowed

template_api = Blueprint('template_api', __name__, url_prefix='/template')
CORS(template_api)

@template_api.route("/post-json", methods=["POST"])
def post_json():
    logger.info(request)

    response_json = '{}'
    status_code = 200

    try:
        if request.method != 'POST':
            raise MethodNotAllowed('Method is not allowed.')

        json = request.data.decode('utf-8')
        logger.info(json)

        try:
            # 
            # The API functions body is coding here.
            # 
            pass

        except Exception as e:
            logger.error(f'Internal process was failed : {str(e)}')
            raise InternalServerError('Internal process was failed.')

        response_json = jsonify({'response': 'This is an api response data.'})
        status_code = 200

    except Exception as e:
        response_json, status_code = get_exception_status_code(e)

    logger.info('The process with a post file is completed.')
    return response_json, status_code

@template_api.route("/post-files", methods=["POST"])
def post_files():
    logger.info(request)
    
    response_json = '{}'
    status_code = 200

    try:
        if request.method != 'POST':
            raise MethodNotAllowed('Method is not allowed.')

        files = request.files.getlist('file')
        if len(files) <= 0:
            raise BadRequest('No uploaded file.')

        try:
            for file in files:
                logger.info(file.filename)
                # 
                # The API functions body is coding here.
                # 

        except Exception as e:
            logger.error(f'Internal process was failed : {str(e)}')
            raise InternalServerError('Internal process was failed.')

        response_json = jsonify({'response': 'This is an api response data.'})
        status_code = 200

    except Exception as e:
        response_json, status_code = get_exception_status_code(e)

    logger.info('The process with a post file is completed.')
    return response_json, status_code
