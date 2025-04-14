from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate-password', methods=['POST'])
def generate_password():
    data = request.get_json()
    length = data.get('length', 12)
    use_upper = data.get('uppercase', True)
    use_lower = data.get('lowercase', True)
    use_digits = data.get('numbers', True)
    use_symbols = data.get('symbols', False)

    characters = ''
    if use_upper:
        characters += string.ascii_uppercase
    if use_lower:
        characters += string.ascii_lowercase
    if use_digits:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    if not characters:
        return jsonify({'error': 'No character sets selected'}), 400

    password = ''.join(random.choice(characters) for _ in range(length))
    return jsonify({'password': password})











