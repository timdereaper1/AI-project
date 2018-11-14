from flask import Blueprint, render_template

app = Blueprint('main', __name__)


@app.route('/')
def index_page():
    return render_template('index.html')


@app.route('/<path:page>')
def client_route_page(page):
    return render_template('index.html')
