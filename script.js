// Character sets for password generation
const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similarChars: 'il1Lo0O'
};

// DOM elements
const passwordInput = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const excludeSimilarCheck = document.getElementById('exclude-similar');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const copyNotification = document.getElementById('copy-notification');
const generateModeBtn = document.getElementById('generate-mode');
const testModeBtn = document.getElementById('test-mode');
const settingsDiv = document.querySelector('.settings');
const passwordTips = document.getElementById('password-tips');

let currentMode = 'generate'; // 'generate' or 'test'

// Mode switching
function switchMode(mode) {
    currentMode = mode;
    
    if (mode === 'generate') {
        generateModeBtn.classList.add('active');
        testModeBtn.classList.remove('active');
        passwordInput.readOnly = true;
        passwordInput.placeholder = 'Click Generate Password';
        passwordInput.classList.add('readonly');
        settingsDiv.style.display = 'block';
        generateBtn.style.display = 'block';
        generateBtn.textContent = 'Generate Password';
        passwordTips.classList.add('hidden');
        clearPasswordAndStrength();
    } else {
        testModeBtn.classList.add('active');
        generateModeBtn.classList.remove('active');
        passwordInput.readOnly = false;
        passwordInput.placeholder = 'Enter your password to test its strength';
        passwordInput.classList.remove('readonly');
        passwordInput.focus();
        settingsDiv.style.display = 'none';
        generateBtn.style.display = 'none';
        passwordTips.classList.remove('hidden');
        clearPasswordAndStrength();
    }
}

// Clear password and reset strength meter
function clearPasswordAndStrength() {
    passwordInput.value = '';
    strengthBar.className = 'strength-bar';
    strengthText.textContent = 'Password Strength';
    strengthText.className = 'strength-text';
}

// Clear button functionality
function clearPassword() {
    clearPasswordAndStrength();
    if (currentMode === 'test') {
        passwordInput.focus();
    }
}

// Update length display when slider changes
lengthSlider.addEventListener('input', function() {
    lengthValue.textContent = this.value;
});

// Mode button event listeners
generateModeBtn.addEventListener('click', () => switchMode('generate'));
testModeBtn.addEventListener('click', () => switchMode('test'));

// Password input event listener for test mode
passwordInput.addEventListener('input', function() {
    if (currentMode === 'test' && this.value.length > 0) {
        updatePasswordStrength(this.value);
    } else if (currentMode === 'test' && this.value.length === 0) {
        clearPasswordAndStrength();
    }
});

// Generate password function
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let charset = '';
    
    // Build character set based on selected options
    if (uppercaseCheck.checked) charset += characterSets.uppercase;
    if (lowercaseCheck.checked) charset += characterSets.lowercase;
    if (numbersCheck.checked) charset += characterSets.numbers;
    if (symbolsCheck.checked) charset += characterSets.symbols;
    
    // Remove similar characters if option is checked
    if (excludeSimilarCheck.checked) {
        for (let char of characterSets.similarChars) {
            charset = charset.replace(new RegExp(char, 'g'), '');
        }
    }
    
    // Check if at least one character type is selected
    if (charset === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    // Display password and update strength
    passwordInput.value = password;
    updatePasswordStrength(password);
}

// Password strength calculation with detailed feedback
function updatePasswordStrength(password) {
    let score = 0;
    let feedback = '';
    let suggestions = [];
    
    // Length scoring with more detailed criteria
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (password.length >= 20) score += 1;
    
    // Character variety scoring
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    
    if (hasLower) score += 1;
    if (hasUpper) score += 1;
    if (hasNumber) score += 1;
    if (hasSymbol) score += 1;
    
    // Additional complexity checks
    const hasRepeatedChars = /(.)\1{2,}/.test(password);
    const hasSequentialChars = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password);
    const hasCommonPatterns = /(?:password|123456|qwerty|abc123|admin|welcome|login)/i.test(password);
    
    if (!hasRepeatedChars) score += 0.5;
    if (!hasSequentialChars) score += 0.5;
    if (!hasCommonPatterns) score += 0.5;
    
    // Generate suggestions for improvement
    if (password.length < 12) suggestions.push('Use at least 12 characters');
    if (!hasLower) suggestions.push('Add lowercase letters');
    if (!hasUpper) suggestions.push('Add uppercase letters');
    if (!hasNumber) suggestions.push('Add numbers');
    if (!hasSymbol) suggestions.push('Add special characters');
    if (hasRepeatedChars) suggestions.push('Avoid repeated characters');
    if (hasSequentialChars) suggestions.push('Avoid sequential patterns');
    if (hasCommonPatterns) suggestions.push('Avoid common words');
    
    // Update tips in test mode
    if (currentMode === 'test') {
        const tipsList = document.getElementById('tips-list');
        if (suggestions.length > 0) {
            tipsList.innerHTML = suggestions.map(tip => `<li>${tip}</li>`).join('');
        } else {
            tipsList.innerHTML = '<li>✅ Excellent! Your password meets all security criteria</li>';
        }
    }
    
    // Determine strength level
    if (score < 3) {
        strengthBar.className = 'strength-bar weak';
        strengthText.className = 'strength-text weak';
        feedback = 'Weak - Needs improvement';
    } else if (score < 5) {
        strengthBar.className = 'strength-bar fair';
        strengthText.className = 'strength-text fair';
        feedback = 'Fair - Could be stronger';
    } else if (score < 7) {
        strengthBar.className = 'strength-bar good';
        strengthText.className = 'strength-text good';
        feedback = 'Good - Well secured';
    } else {
        strengthBar.className = 'strength-bar strong';
        strengthText.className = 'strength-text strong';
        feedback = 'Strong - Excellent security!';
    }
    
    strengthText.textContent = feedback;
}

// Copy password to clipboard
function copyPassword() {
    if (passwordInput.value === '') {
        alert('Please generate a password first!');
        return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(passwordInput.value).then(function() {
        // Show notification
        copyNotification.classList.add('show');
        
        // Hide notification after 2 seconds
        setTimeout(function() {
            copyNotification.classList.remove('show');
        }, 2000);
    }).catch(function(err) {
        // Fallback for older browsers
        passwordInput.select();
        document.execCommand('copy');
        
        copyNotification.classList.add('show');
        setTimeout(function() {
            copyNotification.classList.remove('show');
        }, 2000);
    });
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
clearBtn.addEventListener('click', clearPassword);

// Initialize app in generate mode WITHOUT auto-generating a password
window.addEventListener('load', function() {
    switchMode('generate');
    // Removed generatePassword() call - now password only generates when user clicks button
});