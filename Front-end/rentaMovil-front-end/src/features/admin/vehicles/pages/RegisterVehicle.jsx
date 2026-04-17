import Navbar from "../../../../shared/components/layout/Navbar";
import Footer from '../../../../shared/components/layout/Footer';
import VehicleForm from "../components/VehicleForm";
import FileDialog from "../../../../shared/components/layout/FileDialog";
import style from'./RegisterVehicle.module.css';
function RegisterVehicle() {
    return (
        <>
  
            <Navbar/>
            <VehicleForm />
            <div className={style.fileDialogs}>
                <FileDialog />
            </div>
            <Footer/>

        </>
    );
}
export default RegisterVehicle;