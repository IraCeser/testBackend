import React from "react";
import { useNavigate } from "react-router-dom";
import "./loginStyles.css";
import { useUser } from "../Contexts/UserContext";

function AdminFrontPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGoToMain = () => navigate("/main-page");
  const handleNewUser = () => navigate("/create-user");

  return (
    <div className="admin-page-container">
      <p onClick={handleGoToMain}>Početna stranica</p>
      <p onClick={handleNewUser}>Stvori korisnika</p>
    </div>
  );
}

export default AdminFrontPage;