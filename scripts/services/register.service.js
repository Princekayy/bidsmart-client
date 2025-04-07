document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const toast = document.getElementById('toast');

    // Show Toast message
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.style.backgroundColor = type === 'success' ? '#28a745' : '#e74c3c';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Form Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Basic validation checks
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:5100/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, phone, username }),
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Registration successful! Please log in.', 'success');
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            } else {
                showToast(data.msg || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Network error. Please try again later.', 'error');
        }
    });
});
