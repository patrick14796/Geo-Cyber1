import L from 'leaflet';
import blueMarkerIcon from "./marker-icon-blue.png";
import greenMarkerIcon from './marker-icon-green.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const blueIcon = L.icon({
    iconUrl: blueMarkerIcon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = L.icon({
    iconUrl: greenMarkerIcon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const markerIcons = {
    blueIcon,
    greenIcon
}
export default markerIcons