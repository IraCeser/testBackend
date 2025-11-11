import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const getValidAccessToken = async () => {
        let accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken || !refreshToken) {
            return null;
        }

        try {
            const decoded = jwtDecode(accessToken);
            if (decoded.exp * 1000 < Date.now()) {
                console.log('Access token istekao, osvježavam...');
                
                const res = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh_token: refreshToken }),
                });

                if (!res.ok) {
                    throw new Error('Refresh failed');
                }

                const { access_token: newAccessToken, refresh_token: newRefreshToken } = await res.json();

                localStorage.setItem('accessToken', newAccessToken);
                if (newRefreshToken) {
                    localStorage.setItem('refreshToken', newRefreshToken);
                }
                
                const newDecoded = jwtDecode(newAccessToken);
                const updatedUser = {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken || refreshToken,
                    email: newDecoded.email,
                    username: newDecoded.username,
                    role: newDecoded.role,
                    user_id: newDecoded.user_id,
                };
                setUser(updatedUser);
                
                accessToken = newAccessToken;
                console.log('Token uspješno osvježen');
            }

            return accessToken;
        } catch (err) {
            console.error('Greška pri osvježavanju tokena:', err);
            logout();
            return null;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const accessToken = await getValidAccessToken();
                if (!accessToken) {
                    setLoading(false);
                    return;
                }

                const decoded = jwtDecode(accessToken);
                setUser({
                    accessToken,
                    refreshToken: localStorage.getItem('refreshToken'),
                    email: decoded.email,
                    username: decoded.username,
                    role: decoded.role,
                    user_id: decoded.user_id,
                });
            } catch (error) {
                console.error('Error initializing user:', error);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        if (userData.accessToken) {
            localStorage.setItem('accessToken', userData.accessToken);
        }
        if (userData.refreshToken) {
            localStorage.setItem('refreshToken', userData.refreshToken);
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        getValidAccessToken,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};