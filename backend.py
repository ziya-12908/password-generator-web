from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import string

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow requests from different origins (like frontend hosted on Netlify)
CORS(app)

# Define the route to handle POST requests for password generation
@app.route('/generate-password', methods=['POST'])
def generate_password():
    try:
        # Get the data sent in the POST request
        data = request.get_json()

        # Extract parameters or set default values if not provided
        password_length = data.get('length', 12)
        use_uppercase = data.get('uppercase', True)
        use_lowercase = data.get('lowercase', True)
        use_numbers = data.get('numbers', True)
        use_symbols = data.get('symbols', True)

        # Validate the length parameter to be a positive integer
        if not isinstance(password_length, int) or password_length <= 0:
            return jsonify({"error": "Password length must be a positive integer"}), 400

        # Initialize the pool of characters for password generation
        password_characters = ""
        if use_uppercase:
            password_characters += string.ascii_uppercase
        if use_lowercase:
            password_characters += string.ascii_lowercase
        if use_numbers:
            password_characters += string.digits
        if use_symbols:
            password_characters += string.punctuation

        # Ensure there are characters available to generate the password
        if not password_characters:
            return jsonify({"error": "At least one character type (uppercase, lowercase, numbers, symbols) must be selected"}), 400

        # Generate the password by randomly choosing characters from the pool
        password = ''.join(random.choice(password_characters) for i in range(password_length))

        # Return the generated password in the response
        return jsonify({"password": password})

    except Exception as e:
        # Log any unexpected errors and return a 500 internal server error response
        app.logger.error(f"Error generating password: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)