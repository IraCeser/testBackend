import { useNavigate } from "react-router-dom"
import { useUser } from "../Contexts/UserContext.jsx";

function MainPage(){
    const navigate = useNavigate();
    const { user } = useUser();

    const handleBack = () => {
        navigate(-1);
    }

    return (
    <div className="main-container">
        Dobrodošli! (uskoro više...)
        <button className="change-password-button" onClick={()=>{navigate('/change-password')}}>
            Promijeni lozinku
        </button>
        <p className="back-text" onClick={handleBack}>
            ← Povratak na prethodnu stranicu
        </p>
    </div>)
}

export default MainPage