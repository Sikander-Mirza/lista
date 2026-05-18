import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon issue in Leaflet (needed for markers to show)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  map.setView([lat, lng], 10);
  return null;
};

const MapForm = () => {
  const [position, setPosition] = useState({ lat: 40.7128, lng: -74.006 }); // Default: New York
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        search
      )}`
    );
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
    } else {
      alert("Location not found!");
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter address or country"
          className="p-2 border w-[70%]"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <MapContainer
        center={[position.lat, position.lng]}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            Found: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
          </Popup>
        </Marker>
        <RecenterMap lat={position.lat} lng={position.lng} />
      </MapContainer>
    </div>
  );
};

export default MapForm;
