import React, {useState,useEffect} from 'react'
import { Map, Marker, TileLayer,Popup } from "react-leaflet";
import getBoundingBox from '../utils/getBoundingBox'
import Postpage from '../components/Postpage'

import '../App.css'
import { set } from 'js-cookie';
import { Link } from 'react-router-dom';

const OverviewPage = ({record,handleClick,handleSubmit}) =>{ 

    const [lat, setLat] = useState(0);
    const [lng, setLon] = useState(0);
    const [road,setRoad] = useState(null);
    const [suburb,setSuburb] = useState(null)
    const [boudingBox, setBoundingBox] = useState(null)
    const [restaurants,setRestaurants] = useState(null)
    const [parks,setParks] = useState(null)
    
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(geo => {
        setLat(geo.coords.latitude);
        setLon(geo.coords.longitude);
      });

    },[lat,lng]);

    
  useEffect(() => {
    async function fetchData() {

      const queryUrl = `https://eu1.locationiq.com/v1/reverse.php?key=2ba94cf73afbaa&lat=${lat}&lon=${lng}&format=json`
      const data = await fetch(queryUrl)
      const res = await data.json()

      setRoad(res.address)
      setBoundingBox(res.boundingbox)
    //   setSuburb(res.address.suburb)
    }
    fetchData()
  },
    [lat, lng]
  )
 
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
   
        <button onClick={handleClick}>Record your experience </button> <br/> <br/>
       

        {record===true ? <Postpage handleSubmit={handleSubmit}/> :null}
        
        </>
    )
}

export default OverviewPage