#Version Control: 1.0 Iteration 1 
'''
Import necessary modules from the Flask library
This is just a simple backend test to make sure that the environment is set up correctly. 
It will return a JSON object with the message "Hello from Python!" when the endpoint '/hello' is hit with a GET request.
* Author: [Thomas Blennerhassett]
 * Date: [26/10/2023]
 * Source: [I wrote this code while follwing a tutorial on YouTube by Tech With Tim titled Python REST API Tutorial - Building a Flask REST API
 * Available at (https://www.youtube.com/watch?v=GMppyAPbLYk&list=PLzMcBGfZo4-l5kVSNVKGO60V6RkZ1mzPH&index=2)]
Start of code ->
'''
from flask import Flask, jsonify

# Create an instance of the Flask class. This instance will be our Web Server Gateway Interface (WSGI) application.
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
