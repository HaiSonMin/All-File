/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCityContext } from "../contexts/CityContext";
import { useEffect } from "react";
import Button from "./Button";
import useGeolocation from "../hooks/useGeolocation";
import useUrlPosition from "../hooks/useUrlPosition";
export default function Map() {
  const { cities } = useCityContext();
  const [mapPositions, setMapPositions] = useState([10.847894, 106.7892458]);
  const { getPosition, isLoading, position: myPosition } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  // Execute when Lat, Lng change
  useEffect(() => {
    console.log("Re-Render SetPos");
    if (lat && lng) setMapPositions(() => [lat, lng]);
  }, [lat, lng]);

  // Execute when myPosition change
  useEffect(() => {
    console.log("Re-Render SetPos For MyPosition");
    if (Object.getOwnPropertyNames(myPosition).length)
      setMapPositions(() => [myPosition.lat, myPosition.lng]);
  }, [myPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button onClick={getPosition} type={"position"}>
        {isLoading ? "Loading..." : "Get My Position"}
      </Button>{" "}
      <MapContainer
        center={mapPositions}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPositions} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Set Center Went Change Lat,Lng
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// Redirect to form when we click to the map
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
