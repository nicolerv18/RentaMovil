import NavbarTwo from "../components/NavbarTwo";
import '../pages/Home.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import  CartVehicule from "../components/CartVehicule"
import Filtrer from "../components/Filtrer";
import Banner  from "../components/Banner";
import img from "../assets/carts/mustang.jpg";
import img1 from "../assets/img/img1.png"
import img2 from "../assets/img/img2.png"
import img3 from "../assets/img/img3.webp"


function Home(){
    return (
        <>
        <Navbar/>
        <section className="home-container">
          <div className="main-column">
            <div className="banner-container">
              <Banner imgs={[img1, img2, img3]} text="Disfruta la libertad de moverte cuando quieras con vehículos cómodos, seguros y en excelente estado. Ofrecemos alquiler rápido, precios accesibles y planes flexibles que se adaptan a tu viaje, ya sea por trabajo o placer. Elige tu vehículo ideal y conduce sin preocupaciones."/>
            </div>
            <div className="card-vehicule-container">
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule  name="MustangGT 500" age="2020" price="140.000" img={img} />
            </div>
          </div>
          <aside className="sidebar-container">
            <Filtrer/>
          </aside>
        </section>
        <Footer/>

        </>
    )
}

export default Home;