from flask import Blueprint, render_template

server = Blueprint('main', __name__)


# the index route, renders the web app to the client browser
@server.route('/')
def index():
    return render_template('index.html')


# using the app routing system
@server.route('/<path:page>')
def app_routing(page):
    return render_template('index.html')

# the mark route, takes the essay from the request body with the set
# standards for the essay if any, then using the trained model to
# mark the essay returning back the marks for the essay
