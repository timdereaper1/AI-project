from flask import Flask, render_template
from app.routes import server as route


class Server():

    # initialize the server and register all blueprints
    def __init__(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(route)

    # returns the app instance
    def getApp(self):
        return self.app
