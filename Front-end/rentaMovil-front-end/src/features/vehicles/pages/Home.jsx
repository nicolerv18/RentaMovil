import './Home.css';
import Navbar from "../../../shared/components/layout/Navbar.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";
import  CartVehicule from "../components/CartVehicule"
import FiltrerBrand from "../components/FiltrerBrand";
import FiltrerPrice from "../components/FiltrerPrice";
import FiltrerType from "../components/FiltrerType";
import FiltrerModel from '../components/FiltrerModel.jsx';
import Banner  from "../../../shared/components/layout/Banner.jsx";
import img from "../../../assets/carts/car1.jpg";
import img1 from "../../../assets/img/img1.png"
import img2 from "../../../assets/img/img2.jpg"
import img3 from "../../../assets/img/img3.webp"
import FilterCalendar from '../components/FilterCalendar.jsx';
import { useTranslation } from "react-i18next";



function Home(){
    const { t } = useTranslation();
    return (
        <>
        <Navbar/>
        <div className="banner-wrapper">
            <div className="banner-container">
                <Banner
                  imgs={[img1, img2, img3]}
                />
                <FilterCalendar/>
            </div>
        </div>
        <section className="home-container">

          <div className="main-column">
            <div className="card-vehicule-container">
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="Swift 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
            </div>
          </div>

          <aside className="sidebar-container">
            <FiltrerBrand/>
            <FiltrerPrice/>
            <FiltrerModel/>
            <FiltrerType/>
          </aside>

        </section>

        <Footer/>
        </>
    )
}

export default Home;