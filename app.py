from flask import Flask

app = Flask(__name__)

# run the server if the app.py file is the main entry point
if __name__ == '__main__':
    app.run(debug=True)
