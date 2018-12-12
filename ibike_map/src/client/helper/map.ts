import * as L from 'leaflet';
import LocationContext from '../context/location';

export const setupLayer = (map: L.Map) => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map);
}

export const setupLocation = (map: L.Map, center: L.LatLngExpression, zoom = 15) => {
    map.setView(center, zoom);
}
