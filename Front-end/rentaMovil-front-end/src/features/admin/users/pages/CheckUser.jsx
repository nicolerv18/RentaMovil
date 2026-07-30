import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import Footer from '../../../../shared/components/layout/Footer';
import UserCard from "../components/UserCard";
import img from "../../../../assets/carro.png";
import style from"./CheckUser.module.css";
function CheckUser() {
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