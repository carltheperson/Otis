from flask_pymongo import PyMongo

def init(app):
    global mongo
    mongo = PyMongo(app)