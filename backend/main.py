from flask import Flask, jsonify, request, Blueprint
from flask_restful import Resource, Api
from flask_cors import CORS

from api.Adventure import Adventure, AdventureSpecific
from api.Export import Export
from api.resources import Db

app = Flask(__name__)
CORS(app)
api_bp = Blueprint("api", __name__, url_prefix="/api")

api = Api(api_bp)

api.add_resource(Adventure, "/adventure")
api.add_resource(AdventureSpecific, "/adventure/<id>")
api.add_resource(Export, "/export/<id>")

app.register_blueprint(api_bp)

app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://db:27017/otis'

Db.init(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0:5000", debug=True)