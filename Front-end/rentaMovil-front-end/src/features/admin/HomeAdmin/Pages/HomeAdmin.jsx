import "./HomeAdmin.css";

import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import FooterAdmin from "../../../../shared/components/layout/FooterAdmin";
import CartVehicule from "../../../../features/vehicles/components/CartVehicule"
import FiltrerBrand from "../../../../features/vehicles/components/FiltrerBrand";
import FiltrerPrice from "../../../../features/vehicles/components/FiltrerPrice";
import FiltrerType from "../../../../features/vehicles/components/FiltrerType";
import FiltrerModel from '../../../../features/vehicles/components/FiltrerModel';
import Banner from "../../../../shared/components/layout/Banner";
import img from "../../../../assets/carts/car1.jpg";
import img1 from "../../../../assets/img/img1.png"
import img2 from "../../../../assets/img/img2.jpg"
import img3 from "../../../../assets/img/img3.webp"
import FilterCalendar from '../../../../features/vehicles/components/FilterCalendar';



function Home(){
    return (
        <>
        <NavBarAdmin/>
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
              <CartVehicule name="MustangGT 500" age="2020" price="140.000" img={img} />
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

        <FooterAdmin/>
        </>
    )
}

export default Home;