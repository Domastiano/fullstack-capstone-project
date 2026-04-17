async function handleLogin() {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  // Kolejne zapytania z nagłówkiem Authorization
  fetch('/api/profile', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
}
