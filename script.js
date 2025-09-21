// DOM Elements
const loginSection = document.getElementById('login-section');
const loginTitle = document.getElementById('login-title');
const loginButton = document.getElementById('login-button');
const emailLabel = document.getElementById('email-label');
const loginTypeButtons = document.querySelectorAll('.login-type-btn');
const emailInput = document.getElementById('email');
const sendResetLinkBtn = document.getElementById('send-reset-link');

// Set initial user type
let userType = 'citizen';
updateLoginButton();

// Login type selection
loginTypeButtons.forEach(button => {
    button.addEventListener('click', function() {
        loginTypeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        userType = this.getAttribute('data-type');

        // Update login title
        loginTitle.textContent = userType.charAt(0).toUpperCase() + userType.slice(1) + ' Login';

        // Update placeholder based on user type
        if (userType === 'citizen') {
            emailInput.placeholder = "Enter your email address";
            emailLabel.textContent = "Email Address";
        } else if (userType === 'worker') {
            emailInput.placeholder = "Enter your worker ID";
            emailLabel.textContent = "Worker ID";
        } else if (userType === 'admin') {
            emailInput.placeholder = "Enter your admin username";
            emailLabel.textContent = "Username";
        } else {
            emailInput.placeholder = "Enter your volunteer ID";
            emailLabel.textContent = "Volunteer ID";
        }

        updateLoginButton();
    });
});

// Update login button based on user type
function updateLoginButton() {
    loginButton.className = 'btn w-100 ' + (userType === 'citizen' ? 'btn-citizen' : userType === 'worker' ? 'btn-worker' : userType === 'admin' ? 'btn-admin' : 'btn-champion');
    loginButton.textContent = 'Sign In as ' + userType.charAt(0).toUpperCase() + userType.slice(1);
}

// Login functionality
loginButton.addEventListener('click', function() {
    // Simple validation
    if (emailInput.value.trim() === '' || document.getElementById('password').value === '') {
        alert('Please enter both credentials and password');
        return;
    }

    // Redirect to the appropriate dashboard
    if (userType === 'citizen') {
        window.location.href = 'citizen-dashboard.html';
    } else if (userType === 'worker') {
        window.location.href = 'worker-dashboard.html';
    } else if (userType === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else {
        window.location.href = 'champion-dashboard.html';
    }
});

// Forgot password functionality
sendResetLinkBtn.addEventListener('click', function() {
    const resetEmail = document.getElementById('reset-email').value;
    if (!resetEmail) {
        alert('Please enter your email address');
        return;
    }

    // Simulate sending reset link
    alert('Password reset link has been sent to ' + resetEmail);

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
    modal.hide();
});

// Back to login functionality for all dashboards
document.addEventListener('DOMContentLoaded', () => {
    const backToLoginButtons = document.querySelectorAll('.back-to-login');
    backToLoginButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });
});