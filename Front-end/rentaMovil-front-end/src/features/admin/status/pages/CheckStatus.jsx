import Navbar from "../../../../shared/components/layout/Navbar";
import Footer from '../../../../shared/components/layout/Footer';
import img from "../../../../assets/carts/viejo.JPG"
import CartVehiculeStatus from "../components/CartVehiculeStatus";

function checkStatus(){
    return(
        <>
        <Navbar />
            <div>
            <CartVehiculeStatus name="Vehículo 1" text="Esste vehiculo tiene contrato con la naturaleza" state="Disponible" plate="ABC123" img={img} ubication="Ubicación 1" />
            <CartVehiculeStatus name="Vehículo 1" text="Esste vehiculo tiene contrato con la naturaleza" state="Disponible" plate="ABC123" img={img} ubication="Ubicación 1" />
            <CartVehiculeStatus name="Vehículo 1" text="Esste vehiculo tiene contrato con la naturaleza" state="Disponible" plate="ABC123" img={img} ubication="Ubicación 1" />
            
            </div>
        <Footer />
        </>
    )
}

export default checkStatus;