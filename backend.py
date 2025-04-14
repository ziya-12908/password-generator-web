from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def generate_password(length, use_uppercase, use_lowercase, use_numbers, use_symbols):
    characters = ""
    
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_lowercase:
        characters += string.ascii_lowercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    if not characters:
        raise ValueError("At least one character set must be selected")

    password = ''.join(random.choice(characters) for _ in range(length))
    return password

@app.route('/generate-password', methods=['GET'])
def generate_password_route():
    try:
        length = int(request.args.get('length', 12))  # Default length is 12
        use_uppercase = request.args.get('uppercase', 'false').lower() == 'true'
        use_lowercase = request.args.get('lowercase', 'true').lower() == 'true'
        use_numbers = request.args.get('numbers', 'false').lower() == 'true'
        use_symbols = request.args.get('symbols', 'false').lower() == 'true'

        password = generate_password(length, use_uppercase, use_lowercase, use_numbers, use_symbols)
        return jsonify({"password": password})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 10000))  # Use port from environment variable
    app.run(host='0.0.0.0', port=port)



