import React, { useState } from 'react';
import { useUser } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [email, setEmail] = useState('');
    const [korisnickoIme, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [udioUVlasnistvu, setUdioUVlasnistvu] = useState('');
    const [uloga, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const { getValidAccessToken, logout } = useUser();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const accessToken = await getValidAccessToken();
            if (!accessToken) {
                alert('Vaša sesija je istekla. Molimo prijavite se ponovno.');
                logout();
                navigate('/');
                return;
            }

            const response = await fetch('http://localhost:8000/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    email,
                    korisnickoIme,
                    password,
                    uloga,
                    udioUVlasnistvu
                }),
            });
            if (response.status === 401) {
                const newAccessToken = await getValidAccessToken();
                if (!newAccessToken) {
                    alert('Sesija je istekla. Molimo prijavite se ponovno.');
                    logout();
                    navigate('/');
                    return;
                }

                const retryResponse = await fetch('createUserEndpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newAccessToken}`,
                    },
                    body: JSON.stringify({
                        email,
                        korisnickoIme,
                        password,
                        uloga,
                    }),
                });

                if (!retryResponse.ok) {
                    alert('Neuspješno kreiranje korisnika.');
                    setLoading(false);
                    return;
                }

                alert('Korisnik uspješno kreiran!');
                setEmail('');
                setUsername('');
                setPassword('');
                setRole('user');
                setUdioUVlasnistvu('');
                setLoading(false);
                return;
            }

            if (!response.ok) {
                alert('Neuspješno kreiranje korisnika.');
                setLoading(false);
                return;
            }

            alert('Korisnik uspješno kreiran!');
            setEmail('');
            setUsername('');
            setPassword('');
            setRole('user');
        } catch (err) {
            console.error('Greška prilikom kreiranja korisnika:', err);
            alert('Došlo je do greške.');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="create-user-container">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="input-group">
          <label>Korisničko ime</label>
          <input
            type="text"
            value={korisnickoIme}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Unesite korisničko ime novog korisnika"
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>E-pošta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Unesite e-poštu novog korisnika"
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>Lozinka</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Unesite lozinku novog korisnika"
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>Udio u vlasništvu</label>
          <input
            type="text"
            value={udioUVlasnistvu}
            onChange={(e) => setUdioUVlasnistvu(e.target.value)}
            required
            placeholder="Unesite udio u vlasništvu novog korisnika"
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>Uloga korisnika</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="uloga" 
                value="s" 
                checked={uloga === "s"}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
              />
              Suvlasnik
            </label>
            <label>
              <input 
                type="radio" 
                name="uloga" 
                value="a" 
                checked={uloga === "a"}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
              />
              Admin
            </label>
            <label>
              <input 
                type="radio" 
                name="uloga" 
                value="ps" 
                checked={uloga === "ps"}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
              />
              Predstavnik
            </label>
          </div>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Kreiranje..." : "Stvori"}
        </button>
      </form>
      <p className="back-text" onClick={handleBack}>
        ← Povratak na prethodnu stranicu
      </p>
    </div>
  );
}

export default CreateUser;