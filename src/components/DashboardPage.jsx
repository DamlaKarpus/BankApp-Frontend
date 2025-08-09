import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Hoşgeldiniz 👋</h2>
      <p>Burada hesap özetiniz, bakiye ve son işlemleriniz yer alacak.</p>

      <nav style={{ marginTop: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/accounts" style={{ textDecoration: 'none', color: '#007bff' }}>
              Hesaplarım
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/transactions" style={{ textDecoration: 'none', color: '#007bff' }}>
              İşlemlerim
            </Link>
          </li>
          <li>
            <Link to="/logout" style={{ textDecoration: 'none', color: '#dc3545' }}>
              Çıkış Yap
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DashboardPage;
