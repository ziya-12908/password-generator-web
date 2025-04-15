from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import random
import string
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)
app.logger.setLevel(logging.DEBUG)
CORS(app)

@app.route('/')
def serve_frontend():
    app.logger.info("Serving frontend: index.html")
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    app.logger.info(f"Serving static file: {path}")
    return send_from_directory('.', path)

@app.route('/test', methods=['GET'])
def test():
    app.logger.info("Test route accessed")
    return jsonify({"message": "Server is running!"})

@app.route('/generate-password', methods=['POST'])
def generate_password():
    app.logger.info("Received request for /generate-password")
    try:
        data = request.get_json(silent=True)
        if not data:
            app.logger.warning("No JSON data provided or invalid JSON")
            return jsonify({"error": "No data provided"}), 400
        app.logger.debug(f"Request data: {data}")
        password_length = data.get('length', 12)
        use_uppercase = data.get('uppercase', True)
        use_lowercase = data.get('lowercase', True)
        use_numbers = data.get('numbers', True)
        use_symbols = data.get('symbols', True)
        if not isinstance(password_length, int) or password_length <= 0:
            app.logger.warning(f"Invalid password length: {password_length}")
            return jsonify({"error": "Password length must be a positive integer"}), 400
        password_characters = ""
        if use_uppercase:
            password_characters += string.ascii_uppercase
        if use_lowercase:
            password_characters += string.ascii_lowercase
        if use_numbers:
            password_characters += string.digits
        if use_symbols:
            password_characters += string.punctuation
        if not password_characters:
            app.logger.warning("No character types selected")
            return jsonify({"error": "At least one character type must be selected"}), 400
        password = ''.join(random.choice(password_characters) for _ in range(password_length))
        app.logger.info("Password generated successfully")
        return jsonify({"password": password})
    except Exception as e:
        app.logger.error(f"Error generating password: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    app.logger.info("Starting Flask server on port 5001")
    app.run(debug=True, host='0.0.0.0', port=5001)