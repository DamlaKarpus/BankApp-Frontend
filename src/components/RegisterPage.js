import React from 'react';
import './RegisterPage.css';

function RegisterPage({ onSwitchToLogin }) {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Kayıt Ol</h2>
        <form>
          <label>Ad Soyad</label>
          <input type="text" placeholder="Adınızı ve soyadınızı girin" />
          <label>Email</label>
          <input type="email" placeholder="Email adresinizi girin" />
          <label>Şifre</label>
          <input type="password" placeholder="Şifrenizi girin" />
          <label>Şifre Tekrar</label>
          <input type="password" placeholder="Şifrenizi tekrar girin" />
          <button type="submit">Kayıt Ol</button>
        </form>
        <div className="login-link">
          Zaten hesabınız var mı?{' '}
          <a href="#!" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
            Giriş Yap
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
