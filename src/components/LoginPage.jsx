import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      alert('Giriş başarılı!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
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
          <Link to="/register">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
