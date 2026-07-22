import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import Footer from '../../../../shared/components/layout/Footer';
import VehicleForm from "../components/VehicleForm";
import style from'./RegisterVehicle.module.css';
function RegisterVehicle() {
    return (
        <>
            <NavBarAdmin/>
            <VehicleForm />
            <Footer/>

        </>
    );
}
export default RegisterVehicle;