import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapComponent({
    mode = "view",
    branch,
    branches = [],
    selectedBranch,
    setSelectedBranch
}) {

    const center =
        mode === "view"
            ? [branch.lat, branch.lng]
            : selectedBranch
                ? [selectedBranch.lat, selectedBranch.lng]
                : [branches[0].lat, branches[0].lng];

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{
                height: "250px",
                width: "100%",
                borderRadius: "10px"
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mode === "view" && branch && (
                <Marker position={[branch.lat, branch.lng]}>
                    <Popup>
                        <strong>{branch.name}</strong>
                        <br />
                        {branch.address}
                    </Popup>
                </Marker>
            )}

            {mode === "select" &&
                branches.map((branch) => (
                    <Marker
                        key={branch.id}
                        position={[branch.lat, branch.lng]}
                        eventHandlers={{
                            click: () => setSelectedBranch(branch)
                        }}
                    >
                        <Popup>
                            <strong>{branch.name}</strong>
                            <br />
                            {branch.address}
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
}

export default MapComponent;