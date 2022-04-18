import "leaflet/dist/leaflet.css"
import './App.css'



import {MapContainer, TileLayer, GeoJSON,Marker, Popup} from 'react-leaflet'
import mapProvider from "./mapProvider";
import israelGeoJson from './layers/Israel Marine Cables.json'
import telecomTerminals from './layers/TelecomTerminals2018.json.json'
import React, { Component } from 'react';
import L from 'leaflet';



import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
        const cableData = `Cable name: ${cableName}<br/>
        Cable length: ${cableLength}<br/>
        Ready for service: ${cableReadyForSe}<br/>
        Cable owner: ${cableOwner}<br/>
        Cable URL: ${cableURL}`
        layer.bindTooltip(cableData, {sticky: true})
    }


	const onEachIsraeliLandingSite = (terminal, layer) => {
		const terminalName = terminal.properties.Name
		const CabelsConnected2Terminal = terminal.properties.cable_id
		const CityID = terminal.properties.city_id
		const TerminalType = terminal.geometry.type
		const Fixcord = terminal.geometry.coordinates
		const terminalData = `Terminal name: ${terminalName}<br/>
		Cables Connected: ${CabelsConnected2Terminal}<br/>
		City ID: ${CityID}<br/>
		Type: ${TerminalType}<br/>
		Coordinate: ${Fixcord}`
		layer.bindTooltip(terminalData, {sticky: true})
	}



    return (
        <MapContainer id="map" center={center} zoom={9}>
            <TileLayer
                url={mapProvider.url}
                attribution={mapProvider.attribution}
            />
            <GeoJSON data={israelGeoJson} onEachFeature={onEachIsraeliCable} />
			<GeoJSON data={telecomTerminals} onEachFeature={onEachIsraeliLandingSite} />
        </MapContainer>
    );
}

export default App;
