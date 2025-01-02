// Show the Register form and hide the Login form
document.getElementById("registerLink").addEventListener("click", () => {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("register").classList.remove("hidden");
  });
  
  // Show the Login form and hide the Register form
  document.getElementById("loginLink").addEventListener("click", () => {
    document.getElementById("register").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
  });
  
  // Handle the Login form submission
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
      alert(`Login successful for: ${data.user.username}`);
    } catch (error) {
      alert('Login failed');
    }
  });
  
  // Handle the Register form submission
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const role = document.getElementById("role").value;
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
  
      const data = await response.json();
      alert(`${data.message} for: ${data.user.username} as a ${data.user.role}`);
    } catch (error) {
      alert('Registration failed');
    }
  });
  
