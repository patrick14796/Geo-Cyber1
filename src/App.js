import "leaflet/dist/leaflet.css"
import './App.css'

import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import mapProvider from "./mapProvider";
import israelGeoJson from './layers/Israel Marine Cables.json'
import telecomTerminals from './layers/TelecomTerminals2018.json.json'
import React from 'react';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const israeliCableLayerArray = []


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const center = [32.109333, 34.85549]

function App() {


    const onEachIsraeliCable = (cable, layer) => {
        const cableName = cable.properties.Name
        const cableLength = cable.properties.length
        const cableReadyForSe = cable.properties.ReadyForSe
        const cableOwner = cable.properties.owners
        const cableURL = cable.properties.url
        const cableID = cable.properties.cable_id
        const cableData = `Cable name: ${cableName}<br/>
        Cable length: ${cableLength}<br/>
        Cable ID: ${cableID}<br/>
        Ready for service: ${cableReadyForSe}<br/>
        Cable owner: ${cableOwner}<br/>
        Cable URL: ${cableURL}`
        layer.bindTooltip(cableData, {sticky: true})

        layer.cableID = cableID
        israeliCableLayerArray.push(layer)


    }


    const onEachIsraeliLandingSite = (terminal, layer) => {
        const terminalName = terminal.properties.Name
        const connectedCables = terminal.properties.cable_id
        const CityID = terminal.properties.city_id
        const TerminalType = terminal.geometry.type
        const terminalData = `Terminal name: ${terminalName}<br/>
		Cables Connected: ${connectedCables}<br/>
		City ID: ${CityID}<br/>
		Type: ${TerminalType}`
        layer.bindTooltip(terminalData, {sticky: true})


        const originalColor = israeliCableLayerArray[0].options.color

        layer.on('mouseover', () => {

            let cableArray = connectedCables.split(',')

            israeliCableLayerArray.forEach((item) => {
                if (cableArray.includes(item.cableID)) {
                    item.setStyle({color: 'green'})
                }
            })
        })
        layer.on('mouseout', () => {
            israeliCableLayerArray.forEach((item) => {
                item.setStyle({color: originalColor})
            })
        })

    }


    return (
        <MapContainer id="map" center={center} zoom={9}>
            <TileLayer
                url={mapProvider.url}
                attribution={mapProvider.attribution}
            />
            <GeoJSON data={israelGeoJson} onEachFeature={onEachIsraeliCable}/>
            <GeoJSON data={telecomTerminals} onEachFeature={onEachIsraeliLandingSite}/>
        </MapContainer>
    );
}

export default App;
