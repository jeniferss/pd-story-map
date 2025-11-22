import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import type {LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";

import proj4 from "proj4";

;(window as any).proj4 = proj4;

type MapLeafletProps = {
    center: LatLngExpression;
    zoom: number;
    children?: React.ReactNode;

    style?: React.CSSProperties;
};

export default function MapLeaflet({
                                       center,
                                       zoom,
                                       children,
                                       style,
                                   }: MapLeafletProps) {
    return (
        <div style={style}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}

                style={{width: "100%", height: "100%"}}

                minZoom={4}
                maxZoom={30}
            >
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    attribution="&copy; Stadia Maps & OpenMapTiles & OpenStreetMap"
                />

                {children}
            </MapContainer>
        </div>
    );
}
