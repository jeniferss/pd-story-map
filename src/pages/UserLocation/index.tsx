import MapAnimation from '../../components/MapAnimation';
import CONSTS from "../../utils/conts.ts";
import {useEffect, useState} from "react";
import {useMap} from 'react-leaflet';
import L from 'leaflet';

export default function UserLocation() {
    const map = useMap();
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [locationRequested, setLocationRequested] = useState(false);

    useEffect(() => {
        const requestLocation = async () => {
            return new Promise<void>((resolve) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const {latitude, longitude} = position.coords;
                            const userCoords: [number, number] = [latitude, longitude];
                            setUserLocation(userCoords);
                            resolve();
                        },
                        (error) => {
                            console.log("Localização não disponível:", error);
                            resolve();
                        }
                    );
                } else {
                    resolve();
                }
            });
        };

        requestLocation().then(() => {
            setLocationRequested(true);
        });
    }, []);

    const steps = [
        {
            type: 'fly' as const,
            center: CONSTS.BRASIL_CENTER,
            zoom: CONSTS.BRASIL_ZOOM,
            delayMs: 600,
            durationSec: 2
        },
        {type: 'wait' as const, delayMs: 100},
        ...(userLocation ? [
            {type: 'fly' as const, center: userLocation, zoom: 16, delayMs: 600, durationSec: 2}
        ] : [])
    ];

    if (!locationRequested) {
        return null;
    }

    return (
        <MapAnimation
            key="user-location-animation"
            steps={steps}
            onComplete={() => {
                if (map) {
                    const popupContent = userLocation ?
                        `<div style="text-align: center;">
                            <h3>Ei! Achei você!</h3>
                            <p style="margin-top: 1rem; color: #666;">Calma, não é espionagem! Nenhum de seus dados será salvo.</p>
                        </div>`
                        :
                        `<div style="text-align: center;">
                            <h3>Poxa… não consegui te localizar desta vez </h3>
                            <p style="margin-top: 1rem; color: #666;">De qualquer forma, vamos continuar explorando!</p>
                        </div>`;

                    L.marker(userLocation || CONSTS.JACAREI_CENTER, {
                        icon: L.icon({
                            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                        }),
                        title: 'Sua localização'
                    }).addTo(map).bindPopup(popupContent).openPopup();
                }
            }}
        />
    );
}

