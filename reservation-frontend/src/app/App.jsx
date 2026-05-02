import { useState } from 'react';
import LoginPage from '../pages/Login/LoginPage';
import TablesPage from '../pages/Tables/TablesPage';
import { authStorage } from '../services/authStorage';

function App() {
  const [token, setToken] = useState(() => authStorage.getToken());

  function handleLogin(nextToken) {
    authStorage.setToken(nextToken);
    setToken(nextToken);
  }

  function handleLogout() {
    authStorage.clearToken();
    setToken('');
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <TablesPage onLogout={handleLogout} />;
}

export default App;
