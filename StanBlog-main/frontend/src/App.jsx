import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Login/Welcome";
import AdminFrontPage from "./Login/AdminFrontPage";
import MainPage from "./MainPage/MainPage.jsx";
import CreateUser from "./Login/CreateUser.jsx";
import EmailLogin from "./Login/EmailLogin.jsx";
import { UserProvider } from "./Contexts/UserContext.jsx";
import ProtectedRoute from "./Login/ProtectedRoute.jsx";
import { Navigate } from "react-router-dom";
import ChangePassword from "./ChangePassword/ChangePassword.jsx";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/email-login" element={<EmailLogin />}/>
          
          <Route 
            path="/admin-front-page" 
            element={
              <ProtectedRoute requiredRole="Administrator">
                <AdminFrontPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/create-user" 
            element={
              <ProtectedRoute requiredRole="Administrator">
                <CreateUser />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/main-page" 
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/change-password" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;