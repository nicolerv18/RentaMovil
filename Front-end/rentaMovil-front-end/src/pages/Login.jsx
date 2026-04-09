import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Banner  from "../components/Banner";
import img1 from "../assets/img/img1.png"
import login1 from "../assets/img/Login1.png"
import login2 from "../assets/img/Login2.jpg"
import login3 from "../assets/img/Login3.avif"


function Login(){
return(
    <>
    <NavbarTwo/>
    <LoginForm 
  onSubmit={async (data) => {
    console.log("Datos recibidos:", data);
  }} 
/>
        <Banner imgs={[ login2, login3,login1]} text="Disfruta la libertad de moverte cuando quieras con vehículos cómodos, seguros y en excelente estado. Ofrecemos alquiler rápido, precios accesibles y planes flexibles que se adaptan a tu viaje, ya sea por trabajo o placer. Elige tu vehículo ideal y conduce sin preocupaciones."/>

    <Footer/>
    </>
);
}


export default Login;