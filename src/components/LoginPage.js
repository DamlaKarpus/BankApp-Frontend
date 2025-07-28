import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage({ onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // input değişikliklerini state'e kaydet
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // form gönderilince çalışacak
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.data.token);

      alert('Giriş başarılı!');

      // TODO: İstersen yönlendirme yapılabilir (örn. dashboard’a)
      // navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email adresinizi girin"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Şifre</label>
          <input
            type="password"
            name="password"
            placeholder="Şifrenizi girin"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <div className="register-link" style={{ marginTop: '15px' }}>
          Hesabınız yok mu?{' '}
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToRegister();
            }}
          >
            Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
