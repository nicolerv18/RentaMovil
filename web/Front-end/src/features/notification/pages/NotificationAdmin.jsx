import "./Notification.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/layout/NavBarAdmin.jsx";
import Footer from "../../../shared/components/layout/FooterAdmin.jsx";
import NotificationCenter from "../components/NotificationCenter.jsx";

function NotificationAdmin() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <NotificationCenter onBack={() => navigate(-1)} />
      <Footer />
    </>
  );
}

export default NotificationAdmin;
