# Password Generator

A modern, customizable password generator with strength analysis built using HTML, CSS, and JavaScript. The application features dual modes for both generating secure passwords and testing existing password strength.

## Features

### Password Generation
- Customizable length from 4 to 50 characters
- Multiple character set options:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z) 
  - Numbers (0-9)
  - Special symbols (!@#$%^&*)
- Option to exclude similar-looking characters (0, O, l, I, 1)
- Real-time password strength analysis

### Password Testing
- Manual password input for strength evaluation
- Comprehensive security analysis including:
  - Length requirements
  - Character variety assessment
  - Detection of repeated characters
  - Sequential pattern identification
  - Common password pattern recognition
- Dynamic improvement suggestions
- Real-time feedback as you type

### User Interface
- Modern glass morphism design with backdrop blur effects
- Animated gradient backgrounds
- Smooth transitions and hover animations
- Mode toggle between generation and testing
- One-click copy functionality with visual feedback
- Responsive design for all device sizes
- Elegant strength meter with color-coded visual indicators

## Demo

[Live Demo](https://github.com/Yakubrajhere/password-generator)

## Password Strength Analysis

The strength meter evaluates passwords based on multiple criteria:

### Scoring System (9.5 points total)
- Length requirements: 8+ chars (1pt), 12+ chars (1pt), 16+ chars (1pt), 20+ chars (1pt)
- Character variety: lowercase (1pt), uppercase (1pt), numbers (1pt), symbols (1pt)
- Pattern analysis: no repeated chars (0.5pt), no sequential patterns (0.5pt), no common words (0.5pt)

### Strength Levels
- **Weak**: Score below 3 points - Immediate improvement needed
- **Fair**: Score 3-4 points - Acceptable but could be stronger
- **Good**: Score 5-6 points - Well-secured password
- **Strong**: Score 7+ points - Excellent security level

## Technologies Used

- HTML5 with semantic markup
- CSS3 featuring:
  - Flexbox and Grid layouts
  - CSS animations and transitions
  - Glass morphism effects with backdrop-filter
  - Responsive design principles
- Vanilla JavaScript with:
  - ES6+ features
  - Clipboard API integration
  - Real-time input validation
  - Advanced pattern matching algorithms

## Browser Compatibility

- Chrome 88+
- Firefox 94+
- Safari 14+
- Edge 88+

Note: Backdrop blur effects require modern browser support. Fallback styles are provided for older browsers.

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/password-generator.git
```

2. Navigate to the project directory:
```bash
cd password-generator
```

3. Open `index.html` in your web browser or serve using a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Access the application at `http://localhost:8000`

## File Structure

```
password-generator/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Application logic
└── README.md           # Project documentation
```

## Usage Instructions

### Password Generation Mode
1. Select desired password length using the slider
2. Choose character types to include using checkboxes
3. Optionally exclude similar-looking characters
4. Click "Generate Password" to create a new password
5. Use the copy button to copy the password to clipboard

### Password Testing Mode
1. Click "Test Password" tab to switch modes
2. Enter your existing password in the input field
3. View real-time strength analysis and suggestions
4. Follow the provided recommendations to improve security

## Security Considerations

- All password generation occurs client-side
- No passwords are transmitted or stored remotely
- Cryptographically secure random number generation
- Comprehensive pattern analysis for vulnerability detection
- Best practice security recommendations

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/enhancement`)
5. Open a Pull Request

## Development Guidelines

- Maintain vanilla JavaScript implementation
- Ensure responsive design compatibility
- Follow semantic HTML practices
- Include comprehensive error handling
- Test across multiple browsers and devices

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact Information

Project Repository: [https://github.com/yourusername/password-generator](https://github.com/yourusername/password-generator)

For issues and feature requests, please use the GitHub issue tracker.