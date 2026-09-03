import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultMarkerIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const selectedMarkerIcon = L.divIcon({
    className: "selected-branch-marker",
    html: "<span></span>",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

function MapFocus({ selectedBranch }) {
    const map = useMap();

    useEffect(() => {
        if (selectedBranch) {
            map.flyTo([selectedBranch.lat, selectedBranch.lng], 14, { duration: 0.6 });
        }
    }, [map, selectedBranch]);

    return null;
}

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

            {mode === "select" && <MapFocus selectedBranch={selectedBranch} />}

            {mode === "view" && branch && (
                <Marker position={[branch.lat, branch.lng]} icon={defaultMarkerIcon}>
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
                        icon={branch.id === selectedBranch?.id ? selectedMarkerIcon : defaultMarkerIcon}
                        zIndexOffset={branch.id === selectedBranch?.id ? 1000 : 0}
                        eventHandlers={{
                            click: () => setSelectedBranch?.(branch)
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
