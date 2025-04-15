document.getElementById('generateBtn').addEventListener('click', generatePassword);
document.getElementById('copyBtn').addEventListener('click', copyPassword);

async function generatePassword() {
  const length = parseInt(document.getElementById('length').value) || 12;
  const hasUppercase = document.getElementById('uppercase').checked;
  const hasLowercase = document.getElementById('lowercase').checked;
  const hasNumbers = document.getElementById('numbers').checked;
  const hasSymbols = document.getElementById('symbols').checked;

  const passwordParams = {
    length,
    uppercase: hasUppercase,
    lowercase: hasLowercase,
    numbers: hasNumbers,
    symbols: hasSymbols
  };

  const responseMessage = document.getElementById('responseMessage');
  responseMessage.textContent = 'Generating password... Please wait.';

  try {
    const response = await fetch('/generate-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordParams)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById('result').value = data.password;
    responseMessage.textContent = 'Password generated successfully!';
  } catch (error) {
    responseMessage.textContent = 'Failed to generate password. Please try again!';
    console.error('Error generating password:', error);
  }
}

function copyPassword() {
  const passwordField = document.getElementById('result');
  if (passwordField.value) {
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      alert('Password copied to clipboard!');
    } catch (error) {
      alert('Failed to copy password.');
      console.error('Error copying password:', error);
    }
  } else {
    alert('No password to copy!');
  }
}