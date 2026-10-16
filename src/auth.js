// Demo-only authentication. There is no backend, so credentials live here.
const DEMO_USER = {
  email: 'student@example.com',
  password: 'password123',
};

const CURRENT_USER_KEY = 'todo-app:current-user';

export function checkCredentials(email, password) {
  return email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password;
}

export function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function saveCurrentUser(email) {
  localStorage.setItem(CURRENT_USER_KEY, email);
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
