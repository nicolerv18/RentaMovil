import NavbarTwo from "../../../shared/components/layout/NavbarTwo.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Banner  from "../../../shared/components/layout/Banner.jsx";
import img1 from "../../../assets/img/img1.png"
import login1 from "../../../assets/img/Login1.png"
import login2 from "../../../assets/img/Login2.jpg"
import login3 from "../../../assets/img/Login3.jpg"
import './Login.css';

function Login(){
return(
    <>
    <NavbarTwo/>
    <LoginForm 
      onSubmit={async (data) => {
      console.log("Datos recibidos:", data);
      }} 
    />

    <div className="banner-container">
        <Banner imgs={[ login2, login3,login1]} text=""/>
    </div>

    <Footer/>
    </>
);
}


export default Login;