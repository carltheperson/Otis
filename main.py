from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/otis'

mongo = PyMongo(app)

@app.route("/screen", methods=["POST"])
def set_screen():
    data = request.get_json()
    
    title = data["title"]
    text = data["text"]

    screen = mongo.db.screens
    screen_id = screen.insert({"title": title, "text": text})

    return jsonify({"id": str(screen_id)})


@app.route("/screen/<id>", methods=["GET"])
def get_screen(id):
    screen = mongo.db.screens
    output = screen.find_one({"_id": ObjectId(id)})

    output["_id"] = str(output["_id"])

    return jsonify({"result": output})



if __name__ == '__main__':
    app.run(debug=True)