from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests from your frontend

@app.route('/generate-password', methods=['POST'])  # POST method to generate passwords
def generate_password():
    data = request.get_json()  # Get data sent from frontend

    length = data.get('length', 12)  # Default to 12 if no length is provided
    uppercase = data.get('uppercase', True)
    lowercase = data.get('lowercase', True)
    numbers = data.get('numbers', True)
    symbols = data.get('symbols', True)

    # Password generation logic goes here
    password = "your_generated_password_logic_here"  # Replace with actual logic

    return jsonify({'password': password})  # Return password in JSON format

if __name__ == '__main__':
    app.run(debug=True)  # Run the app in debug mode


  





