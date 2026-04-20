import NavbarTwo from "../../../shared/components/layout/NavbarTwo";
import '../../../styles/Home.css';
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from "../../../shared/components/layout/Footer";
import CartVehicule from "../../../features/vehicles/components/CartVehicule"
import Filtrer from "../../../features/vehicles/components/Filtrer";
import Banner from "../../../shared/components/layout/Banner";
import img from "../../../assets/carts/mustang.jpg";
import img1 from "../../../assets/img/img1.png"
import img2 from "../../../assets/img/img2.png"
import img3 from "../../../assets/img/img3.webp"
import AdminPanel from "../Components/AdminPanel";


function Home(){
    return (
        <>
        <Navbar/>
        <section className="home-container">
        <div className="card-vehicule-container">
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
            <CartVehicule  name="MustangGT 500"age="2020" price="140.000" img={img} />
<div className="AdminPanel-container">
        <AdminPanel/>
        </div>
        </div>
        <div className="sildebar-containner">
        <div className="filtrer-container">
        <Filtrer/>
        </div>
        <div className="banner-container">
        <Banner imgs={[img1, img2, img3]} text="Disfruta la libertad de moverte cuando quieras con vehículos cómodos, seguros y en excelente estado. Ofrecemos alquiler rápido, precios accesibles y planes flexibles que se adaptan a tu viaje, ya sea por trabajo o placer. Elige tu vehículo ideal y conduce sin preocupaciones."/>
        </div>
        </div>
        </section>
        <Footer/>

        </>
    )
}

export default Home;