import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

function LocationMarker({ setLocation }) {

    useMapEvents({
        click(e) {
            setLocation([e.latlng.lat, e.latlng.lng]);
        },
    });

    return null;
}

function MapComponent({ location, setLocation }) {

    const defaultPosition = [4.7110, -74.0721]; // Bogotá

    return (
        <MapContainer
            center={location || defaultPosition}
            zoom={13}
            style={{ height: "200px", width: "100%", borderRadius: "10px" }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker setLocation={setLocation} />

            {location && (
                <Marker position={location}>
                    <Popup>Ubicación seleccionada</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}

export default MapComponent;