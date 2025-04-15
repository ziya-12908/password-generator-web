from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def home():
    return "Password Generator API is running"

@app.route('/generate-password', methods=['POST'])
def generate_password():
    data = request.get_json()

    length = data.get('length', 12)
    use_uppercase = data.get('uppercase', True)
    use_lowercase = data.get('lowercase', True)
    use_numbers = data.get('numbers', True)
    use_symbols = data.get('symbols', True)

    characters = ''
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_lowercase:
        characters += string.ascii_lowercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    if not characters:
        return jsonify({'error': 'No character types selected'}), 400

    password = ''.join(random.choice(characters) for _ in range(length))
    return jsonify({'password': password})















