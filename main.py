from flask import Flask, jsonify, request, Blueprint
from flask_restful import Resource, Api
from flask_cors import CORS

from resources.Screen import Screen, MainScreen, ScreenSpecific, ScreenOptionArray
from resources.Option import Option, OptionSpecific

from resources import Db

app = Flask(__name__)
CORS(app)
api_bp = Blueprint("api", __name__, url_prefix="/api")
# CORS(app, resources={r"*": {"origins": "*", "Access-Control-Allow-Origin": "*"}})

api = Api(api_bp)

api.add_resource(Screen, "/screen")
api.add_resource(ScreenSpecific, "/screen/<id>")
api.add_resource(MainScreen, "/screen-main")
api.add_resource(ScreenOptionArray, "/screen/option-array/<id>")
api.add_resource(Option, "/option")
api.add_resource(OptionSpecific, "/option/<id>")
app.register_blueprint(api_bp)

app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://db:27017/otis'


Db.init(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0:5000", debug=True)