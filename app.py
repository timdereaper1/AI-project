from app import Server

# create a new instance of the Server
server = Server()

# run the server if the app.py file is the main entry point
if __name__ == '__main__':
    server.app.run(debug=True, port=4000)
