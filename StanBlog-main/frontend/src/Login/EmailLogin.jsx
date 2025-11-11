import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import LogoName from './LogoName';

function EmailLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser();

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(('http://localhost:8000/api/email-login'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                alert(errorData?.message || 'Neuspješna prijava.');
                setLoading(false);
                return;
            }

            const data = await response.json();
            const access_token = data.access;
            const refresh_token = data.refresh;
            const decodedUserData = jwtDecode(access_token);

            const userData = {
                accessToken: access_token,
                refreshToken: refresh_token,
                email: decodedUserData.email,
                username: decodedUserData.username,
                role: decodedUserData.role,
                user_id: decodedUserData.user_id,
            };

            login(userData);

            if (userData.role === 'Administrator') {
                navigate('/admin-front-page');
            } else {
                navigate('/main-page');
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Došlo je do greške prilikom prijave.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="all-container">
            <LogoName />
            <div className="email-login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>E-pošta</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Unesite e-poštu"
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
                            placeholder="Unesite lozinku"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Prijava...' : 'Prijava'}
                    </button>
                </form>
            </div>
            <p className="back-text" onClick={handleBack}>
                ← Povratak na prethodnu stranicu
            </p>
        </div>
    );
}

export default EmailLogin;