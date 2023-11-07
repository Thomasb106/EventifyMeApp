# Import necessary modules from the Flask library
from flask import Flask, jsonify

# Create an instance of the Flask class. This instance will be our WSGI application.
app = Flask(__name__)

# Define a route for the endpoint '/hello' with allowed method 'GET'.
@app.route('/hello', methods=['GET'])
def hello_world():
    # When this endpoint is hit, it will return a JSON object with the message "Hello from Python!"
    return jsonify(message="Hello from Python!")

# Check if this script is executed as the main module and not imported elsewhere.
if __name__ == '__main__':
    # If true, run the Flask development server with debugging mode turned on.
    app.run(debug=True)
