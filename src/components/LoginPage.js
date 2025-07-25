import React from 'react';
import './LoginPage.css';

function LoginPage({ onSwitchToRegister }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Giriş Yap</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Email adresinizi girin" />
          <label>Şifre</label>
          <input type="password" placeholder="Şifrenizi girin" />
          <button type="submit">Giriş Yap</button>
        </form>
        <div className="register-link">
          Hesabınız yok mu?{' '}
          <a href="#!" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
            Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
