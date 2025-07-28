import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  // Login mi gösterilecek yoksa Register mı? true = Login göster
  const [showLogin, setShowLogin] = useState(true);

  // Sayfalar arası geçiş fonksiyonu
  const togglePage = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <div className="App">
      {showLogin ? (
        <LoginPage onSwitchToRegister={togglePage} />
      ) : (
        <RegisterPage onSwitchToLogin={togglePage} />
      )}
    </div>
  );
}

export default App;
