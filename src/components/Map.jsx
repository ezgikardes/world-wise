import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext'

function Map() {

    const navigate = useNavigate();
    const { cities } = useCities();

    const [mapPosition, setMapPosition] = useState([40, 0]);

    const [searchParams] = useSearchParams();

    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        }, [mapLat, mapLng]
    );

    return (
        <div className={styles.mapContainer} >
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span><span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={[mapLat, mapLng]} />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap();

    if (!position[0] || !position[1]) return null;

    map.setView(position);
    return null;
}

export default Map
