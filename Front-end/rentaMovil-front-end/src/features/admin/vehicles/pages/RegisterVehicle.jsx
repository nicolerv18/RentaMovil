import Navbar from "../../../../shared/components/layout/Navbar";
import Footer from '../../../../shared/components/layout/Footer';
import VehicleForm from "../components/VehicleForm";
import style from'./RegisterVehicle.module.css';
function RegisterVehicle() {
    return (
        <>
            <Navbar/>
            <VehicleForm />
            <Footer/>

        </>
    );
}
export default RegisterVehicle;