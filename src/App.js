import './App.css'

import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import mapProvider from "./mapProvider";
import israelGeoJson from './layers/Israel Marine Cables.json'

const center = [32.109333, 34.85549]

function App() {
    return (
        <MapContainer id="map" center={center} zoom={9} >
            <TileLayer
                url={mapProvider.url}
                attribution={mapProvider.attribution}
            />
            <GeoJSON data={israelGeoJson}/>
        </MapContainer>
    );
}

export default App;
