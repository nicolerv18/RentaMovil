import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import Footer from '../../../../shared/components/layout/Footer';
import UserCard from "../components/UserCard";
import img from "../../../../assets/carro.png";
import style from"./CheckUser.module.css";
import {UserMock} from "../service/UserMock.js"
import FleetChartMaintenance from "../../historyMaintenance/components/FleetChartMaintenance.jsx";
import MonthlyChart from "../../historyMaintenance/components/MonthlyChart.jsx";
import { use, useState } from "react";
function CheckUser() {

    const [records, setRecords] = useState(UserMock);
    const [query,setSearch] = useState("");
    const [filterState, setFilterState] = useState ("")
    
    const filtrerRecords = records
    .filter((c) =>
        {
            const fs = String(filterState || '').toLocaleLowerCase();
            if (fs ===  'all' || fs === '')return true;
            return String(c.status || '').toLowerCase() === fs;
        } )
    .filter((c) =>
        {
            const q = String(query || '').trim().toLocaleLowerCase();
            if(!q) return true;
            return(
                String(c.userName || '').toLowerCase().includes(q) ||
                String(c.name || '').toLowerCase().includes(q) ||
                String(c.phone || '').toLowerCase().includes(q) ||
                String(c.email || '').toLocaleLowerCase().includes(q) 
            );
        })


    return (


        <>
            <NavBarAdmin />
            <section className={style['check-cards-user']}>
            <UserCard userName="Arnoldo" name="Pedro Perez Pena" avatar={img} email="pdro@gmail.com" phone="332323232" status="active" dateCreated="24/03/2020" />
            <UserCard userName="Arnoldo" name="Pedro Perez Pena" avatar={img} email="pdro@gmail.com" phone="332323232" status="active" dateCreated="24/03/2020" />
            <UserCard userName="Arnoldo" name="Pedro Perez Pena" avatar={img} email="pdro@gmail.com" phone="332323232" status="active" dateCreated="24/03/2020" />
            <UserCard userName="Arnoldo" name="Pedro Perez Pena" avatar={img} email="pdro@gmail.com" phone="332323232" status="active" dateCreated="24/03/2020" />
            </section>
            <Footer/>  
                   
        </>

    );
}
export default CheckUser;