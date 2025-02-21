import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const storePosition = [42.42252131982671, 14.28253974600266]; 

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Location() {
  useEffect(() => {
    console.log("Componente caricato");
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Dove Siamo</h2>
      <p className="text-center">Vieni a trovarci nel nostro punto vendita!</p>

      <div id="map-debug" style={{ height: "400px", width: "100%", backgroundColor: "#f8f9fa" }}>
        <MapContainer center={storePosition} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={storePosition}>
            <Popup>
              <strong>Il Nostro Negozio</strong> <br />
              <strong>Indirizzo:</strong> Via adriatica, 58 - Francavilla al Mare 66023 CH <br />
              <strong>Orari:</strong> 9:00 - 19:00
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Location;
