import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import LogoName from '../Login/LogoName';

function ChangePassword(){
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { getValidAccessToken, logout } = useUser();
    const navigate = useNavigate();

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

        let response = await fetch('http://localhost:8000/api/change-password', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ 
                oldPassword, 
                newPassword 
            }),
        });
        
        if (response.status === 401) {
            console.log('Access token istekao, osvježavam i ponavljam zahtjev...');
            
            const newAccessToken = await getValidAccessToken();
            if (!newAccessToken) {
                alert('Vaša sesija je istekla. Molimo prijavite se ponovno.');
                logout();
                navigate('/');
                return;
            }

            response = await fetch('api/change-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newAccessToken}`
                },
                body: JSON.stringify({ 
                    oldPassword, 
                    newPassword 
                }),
            });
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            alert(errorData?.message || 'Promjena lozinke nije uspjela.');
            setLoading(false);
            return;
        }

        const result = await response.json();
        
        if (result.success) {
            alert('Lozinka je uspješno promijenjena!');
            
            setOldPassword('');
            setNewPassword('');
            
            navigate('/main-page');
        } else {
            alert("Promjena lozinke nije uspjela.")
        }

    } catch (error) {
        console.error('Greška pri promjeni lozinke:', error);
        alert('Došlo je do greške prilikom promjene lozinke.');
    } finally {
        setLoading(false);
    }
};

    const handleBack = () => {
        navigate("/main-page");
    }

return (
        <div className="all-container">
            <LogoName />
            <div className="email-login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Stara lozinka</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            placeholder="Unesite staru lozinku"
                            disabled={loading}
                        />
                    </div>
                    <div className="input-group">
                        <label>Nova lozinka</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder="Unesite novu lozinku"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Potvrđujem...' : 'Potvrdi'}
                    </button>
                </form>
            </div>
            <p className="back-text" onClick={handleBack}>
                ← Povratak na prethodnu stranicu
            </p>
        </div>
    );
}

export default ChangePassword