import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newAccountName, setNewAccountName] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchAccounts = async () => {
    if (!userId) {
      setError('Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapınız.');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`http://localhost:8080/api/accounts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccounts(res.data);
    } catch (err) {
      setError('Hesaplar alınırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddAccount = async () => {
    if (!userId) {
      setError('Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapınız.');
      return;
    }

    try {
      setError('');
      await axios.post(
        `http://localhost:8080/api/accounts/open/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAccountName('');
      fetchAccounts();
    } catch (err) {
      setError('Hesap açılırken hata oluştu.');
    }
  };

  const handleCloseAccount = async (accountId) => {
    if (!window.confirm('Bu hesabı kapatmak istediğinize emin misiniz?')) return;

    try {
      setError('');
      await axios.put(
        `http://localhost:8080/api/accounts/close/${accountId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAccounts();
    } catch (err) {
      setError('Hesap kapatılırken hata oluştu.');
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hesaplarınız</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {accounts.length === 0 ? (
        <p>Henüz hesap yok.</p>
      ) : (
        <ul>
          {accounts.map(acc => (
            <li key={acc.id} style={{ marginBottom: '10px' }}>
              <strong>{acc.name || 'İsimsiz Hesap'}</strong> — Bakiye: {acc.balance} TL
              <button
                onClick={() => handleCloseAccount(acc.id)}
                style={{ marginLeft: 15, cursor: 'pointer' }}
              >
                Kapat
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '30px' }}>
        <input
          type="text"
          placeholder="Yeni hesap ismi (opsiyonel)"
          value={newAccountName}
          onChange={(e) => setNewAccountName(e.target.value)}
          style={{ padding: '5px', width: '200px' }}
          disabled // backend isim almıyorsa devre dışı
        />
        <button
          onClick={handleAddAccount}
          style={{ marginLeft: 10, padding: '6px 12px', cursor: 'pointer' }}
        >
          Hesap Aç
        </button>
      </div>
    </div>
  );
}

export default AccountsPage;
