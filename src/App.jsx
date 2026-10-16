import { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import TodoPage from './pages/TodoPage.jsx';
import { getCurrentUser, saveCurrentUser, clearCurrentUser } from './auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  function handleLogin(email) {
    saveCurrentUser(email);
    setCurrentUser(email);
  }

  function handleLogout() {
    clearCurrentUser();
    setCurrentUser(null);
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <TodoPage userEmail={currentUser} onLogout={handleLogout} />;
}

export default App;
