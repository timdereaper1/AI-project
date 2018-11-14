from flask import Flask, render_template
from flask_restful import Api
from src.server.routes.api import api
from src.server.routes.view import app as router


class Server():

    def __init__(self):
        self.app = Flask(__name__)

        # initialize the restful api
        self.api = Api(self.app)

        # set api routes
        for route in api:
            self.api.add_resource(route['res'], route['url'])

        # register the router
        self.app.register_blueprint(router)
