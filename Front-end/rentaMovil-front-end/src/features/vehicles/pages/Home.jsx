import './Home.css';
import Navbar from "../../../shared/components/layout/Navbar.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";
import  CartVehicule from "../components/CartVehicule"
import Filtrer from "../components/Filtrer";
import Banner  from "../../../shared/components/layout/Banner.jsx";
import img from "../../../assets/carts/car1.jpg";
import img1 from "../../../assets/img/img1.png"
import img2 from "../../../assets/img/img2.jpg"
import img3 from "../../../assets/img/img3.webp"



function Home(){
    return (
        <>
        <Navbar/>
        <div className="banner-wrapper">
            <div className="banner-container">
                <Banner
                  imgs={[img1, img2, img3]}
                  text="Disfruta la libertad de moverte cuando quieras con vehículos cómodos, seguros y en excelente estado..."
                />
            </div>
        </div>
        <section className="home-container">

          <div className="main-column">
            <div className="card-vehicule-container">
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
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