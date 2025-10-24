import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useState} from 'react';
import type {LatLngExpression, LocationEvent} from 'leaflet';

function LocationMarker() {
    const [position, setPosition] = useState<LatLngExpression | null>(null);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e: LocationEvent) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 13);
        }
    });

    return position ? (
        <Marker position={position}>
            <Popup>Você está aqui!</Popup>
        </Marker>
    ) : null;
}

export default function MapLeaflet() {
    return (
        <div style={{width: '600px', height: '500px'}}>
            <MapContainer
                center={[-14.235, -51.9253] as LatLngExpression}
                zoom={4}
                scrollWheelZoom={false}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    minZoom={0}
                    maxZoom={20}
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker/>
            </MapContainer>
        </div>
    );
}
