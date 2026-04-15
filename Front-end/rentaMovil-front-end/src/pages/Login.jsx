import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Banner  from "../components/Banner";
import img1 from "../assets/img/img1.png"
import login1 from "../assets/img/Login1.png"
import login2 from "../assets/img/Login2.jpg"
import login3 from "../assets/img/Login3.avif"
import '../pages/Login.css';

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