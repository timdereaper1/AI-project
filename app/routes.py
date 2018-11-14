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
@server.route('/api/essay/mark')
def mark_essay():
    # the route is a post request which takes the essay or text from the
    # body object, takes the essay standards set for the essay from the
    # body object

    # TODO: save the essay in the database which will be used to retrain
    # the model in subsequent time intervals

    # using the trained model to mark the essay and returning the marks
    # and other related analysis such as total number of words and such
    # to the client
    return True
