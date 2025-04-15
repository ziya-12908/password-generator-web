document.getElementById('generateBtn').addEventListener('click', generatePassword);
document.getElementById('copyBtn').addEventListener('click', copyPassword);

async function generatePassword() {
  const length = parseInt(document.getElementById('length').value) || 12; // Ensure it's a number
  const hasUppercase = document.getElementById('uppercase').checked;
  const hasLowercase = document.getElementById('lowercase').checked;
  const hasNumbers = document.getElementById('numbers').checked;
  const hasSymbols = document.getElementById('symbols').checked;

  const passwordParams = {
    length: length,
    uppercase: hasUppercase,
    lowercase: hasLowercase,
    numbers: hasNumbers,
    symbols: hasSymbols
  };

  const responseMessage = document.getElementById('responseMessage');
  responseMessage.textContent = 'Generating password... Please wait.';

  try {
    const response = await fetch('https://password-generator-web.onrender.com/generate-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordParams)
    });

    if (!response.ok) {
      throw new Error('Failed to generate password');
    }

    const data = await response.json();
    document.getElementById('result').value = data.password;
    responseMessage.textContent = 'Password generated successfully!';
  } catch (error) {
    responseMessage.textContent = 'Failed to generate password. Please try again!';
    console.error('Error:', error);
  }
}

function copyPassword() {
  const passwordField = document.getElementById('result');
  passwordField.select();
  passwordField.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand('copy');
  alert('Password copied to clipboard!');
}document.getElementById('generateBtn').addEventListener('click', generatePassword);
document.getElementById('copyBtn').addEventListener('click', copyPassword);

async function generatePassword() {
  const length = parseInt(document.getElementById('length').value) || 12;
  const hasUppercase = document.getElementById('uppercase').checked;
  const hasLowercase = document.getElementById('lowercase').checked;
  const hasNumbers = document.getElementById('numbers').checked;
  const hasSymbols = document.getElementById('symbols').checked;

  const passwordParams = {
    length: length,
    uppercase: hasUppercase,
    lowercase: hasLowercase,
    numbers: hasNumbers,
    symbols: hasSymbols
  };

  const responseMessage = document.getElementById('responseMessage');
  responseMessage.textContent = 'Generating password... Please wait.';

  try {
    const response = await fetch('http://127.0.0.1:5000/generate-password', {  // 👈 Local Flask server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordParams)
    });

    if (!response.ok) {
      throw new Error('Failed to generate password');
    }

    const data = await response.json();
    document.getElementById('result').value = data.password;
    responseMessage.textContent = 'Password generated successfully!';
  } catch (error) {
    responseMessage.textContent = 'Failed to generate password. Please try again!';
    console.error('Error:', error);
  }
}

function copyPassword() {
  const passwordField = document.getElementById('result');
  passwordField.select();
  passwordField.setSelectionRange(0, 99999);
  document.execCommand('copy');
  alert('Password copied to clipboard!');
}