import "leaflet/dist/leaflet.css"
import './App.css'

import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import mapProvider from "./mapProvider";
import israelGeoJson from './layers/Israel Marine Cables.json'

const center = [32.109333, 34.85549]

function App() {

    const onEachIsraeliCable = (cable, layer) => {
        const cableName = cable.properties.Name
        const cableLength = cable.properties.length
        const cableReadyForSe = cable.properties.ReadyForSe
        const cableOwner = cable.properties.owners
        const cableURL = cable.properties.url
        const cableData = `Cable name: ${cableName}<br/>
        Cable length: ${cableLength}<br/>
        Ready for service: ${cableReadyForSe}<br/>
        Cable owner: ${cableOwner}<br/>
        Cable URL: ${cableURL}`
        layer.bindTooltip(cableData, {sticky: true})
    }

    return (
        <MapContainer id="map" center={center} zoom={9}>
            <TileLayer
                url={mapProvider.url}
                attribution={mapProvider.attribution}
            />
            <GeoJSON data={israelGeoJson} onEachFeature={onEachIsraeliCable} />
        </MapContainer>
    );
}

export default App;
