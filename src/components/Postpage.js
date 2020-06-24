import React, {useState,useEffect} from 'react'
import { Map, Marker, TileLayer,Popup } from "react-leaflet";

import '../App.css'

const Postpage = () =>{

    const [lat, setLat] = useState(0);
    const [lng, setLon] = useState(0);
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(geo => {
        setLat(geo.coords.latitude);
        setLon(geo.coords.longitude);
      });
    });
    const position = [lat,lng]
    return(
        <>
        <div className="leaflet-container">
      <Map center={position} zoom={15}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={position}>
          <Popup>You are here</Popup>
          </Marker>
        </Map>
        </div>
        </>
    )
}

export default Postpage