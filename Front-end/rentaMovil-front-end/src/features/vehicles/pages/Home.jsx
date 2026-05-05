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
import { useState } from 'react';
import { branches } from '../data/branches.js';



function Home(){
    const { t } = useTranslation();
const carsMock = [
  {
    id: 1,
    name: "MustangGT 500",
    price: 140000,
    img: img,
    branch: branches[0],
    reservas: []
  },
  {
    id: 2,
    name: "Swift 500",
    price: 100000,
    img: img,
    branch: branches[2],
    reservas: []
  },
    {
    id: 3,
    name: "Toyota 500",
    price: 150000,
    img: img,
    branch: branches[1],
    reservas: []
  }
];
const [carsFiltered, setCarsFiltered] = useState(carsMock);
const isAvailable = (car, start, end) => {
  return !car.reservas.some((r) => {
    return start <= r.end && end >= r.start;
  });
};
const handleSearch = ({ branch, startDate, endDate }) => {

  const disponibles = carsMock.filter(car =>
    car.branch.toLowerCase().includes(branch.toLowerCase()) &&
    isAvailable(car, startDate, endDate)
  );

  setCarsFiltered(disponibles);
};
    return (
        <>
        <Navbar/>
        <div className="banner-wrapper">
            <div className="banner-container">
                <Banner
                  imgs={[img1, img2, img3]}
                />
                <FilterCalendar onSearch={handleSearch}/>
            </div>
        </div>
        <section className="home-container">

          <div className="main-column">
            <div className="card-vehicule-container">
              {carsFiltered.length === 0 ? (
                <p>No hay vehículos disponibles</p>
              ) : (
                carsFiltered.map(car => (
                  <CartVehicule
                    key={car.id}
                    name={car.name}
                    price={car.price}
                    img={car.img}
                    branch={car.branch}
                  />
                ))
              )}
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