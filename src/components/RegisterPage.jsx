import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:8080/api/users/register', {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });

      alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
      navigate('/login');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Kayıt başarısız. Lütfen tekrar deneyin.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <label>Ad Soyad</label>
          <input
            type="text"
            name="userName"
            placeholder="Adınızı ve soyadınızı girin"
            value={formData.userName}
            onChange={handleChange}
            required
          />
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
          <label>Şifre Tekrar</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Şifrenizi tekrar girin"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <div className="login-link" style={{ marginTop: '15px' }}>
          Zaten hesabınız var mı?{' '}
          <Link to="/login">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
