// Function to generate password based on user preferences
async function generatePassword() {
    const length = document.getElementById('password-length').value;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    // Prepare request body
    const requestBody = {
        length: length,
        include_uppercase: includeUppercase,
        include_lowercase: includeLowercase,
        include_numbers: includeNumbers,
        include_symbols: includeSymbols
    };

    try {
        // Send request to Flask backend to generate password
        const response = await fetch('http://127.0.0.1:5000/generate-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Error generating password');
        }

        const data = await response.json();
        // Display the generated password
        const passwordOutput = document.getElementById('password-output');
        passwordOutput.textContent = data.password;
    } catch (error) {
        console.error('Error fetching password:', error);
        const passwordOutput = document.getElementById('password-output');
        passwordOutput.textContent = 'Error fetching password.';
    }
}

// Function to copy password to clipboard
function copyToClipboard() {
    const passwordOutput = document.getElementById('password-output');
    const password = passwordOutput.textContent;

    if (password && password !== 'Error fetching password.') {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
                alert('Failed to copy password to clipboard.');
            });
    } else {
        alert('No password to copy!');
    }
}

// Event listeners for the buttons
document.getElementById('generate-password').addEventListener('click', generatePassword);
document.getElementById('copy-button').addEventListener('click', copyToClipboard);
