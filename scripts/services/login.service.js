document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
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
        const password = document.getElementById('password').value;

        // Basic validation (can be expanded as per your requirements)
        if (!email || !password) {
            showToast('Please enter both email and password.', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:5100/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("response: " + JSON.stringify(data))
                // Save the JWT token in localStorage under 'token'
                localStorage.setItem('token', data.token);

                // Show success toast and redirect
                showToast(JSON.stringify(data), 'success');
                setTimeout(() => {
                    // Redirect to the homepage or a protected page (e.g., dashboard)
                    window.location.href = 'http://localhost:5501/dashboard.html'; // Change this to the desired page
                }, 3000);
            } else {
                showToast(data.msg || 'Invalid credentials. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Network error. Please try again later.', 'error');
        }
    });
});
