import './loginStyles.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../Contexts/UserContext';
import { jwtDecode } from 'jwt-decode';

function SignInWays() {
    const navigate = useNavigate();
    const { login } = useUser();

    const handleEmailLogin = () => {
        navigate('/email-login');
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;

            const response = await fetch(('http://localhost:8000/api/google-login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                throw new Error('Neuspješna Google prijava.');
            }

            const { access_token, refresh_token } = await response.json();

            const decodedUserData = jwtDecode(access_token);

            const userData = {
                accessToken: access_token,
                refreshToken: refresh_token,
                email: decodedUserData.email,
                username: decodedUserData.username,
                role: decodedUserData.role,
                user_id: decodedUserData.user_id
            };

            login(userData);

            if (userData.role === 'Administrator') {
                navigate('/admin-front-page');
            } else {
                navigate('/main-page');
            }

        } catch (error) {
            console.error('Greška prilikom Google prijave:', error);
            alert('Neuspješna Google prijava.');
        }
    };

    return (
        <div className='button-container'>
            <h2 className='sign-in-header'>Prijavi se</h2>
            <button className='sign-in-button' onClick={handleEmailLogin}>
                Prijavi se emailom
            </button>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert('Google prijava nije uspjela')}
            />
        </div>
    );
}

export default SignInWays;