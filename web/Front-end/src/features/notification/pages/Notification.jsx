import "./Notification.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/layout/Navbar.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";
import NotificationCenter from "../components/NotificationCenter.jsx";

function Notification() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <NotificationCenter onBack={() => navigate(-1)} />
      <Footer />
    </>
  );
}

export default Notification;
