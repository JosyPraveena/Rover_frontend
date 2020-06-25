import React, {useState,useEffect} from 'react'
import { Map, Marker, TileLayer,Popup } from "react-leaflet";
import getBoundingBox from '../utils/getBoundingBox'
import '../App.css'

const Postpage = ({handleSubmit}) =>{

    // const [lat, setLat] = useState(0);
    // const [lng, setLon] = useState(0);
  
    // useEffect(() => {
    //   navigator.geolocation.getCurrentPosition(geo => {
    //     setLat(geo.coords.latitude);
    //     setLon(geo.coords.longitude);
    //     console.log(getBoundingBox([lat,lng],1))
    //   });
    // });
    // const position = [lat,lng]
    return(
        <>
     <div >
        <label for="avatar">Choose a profile picture:</label>

<input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"/>
        </div>

        <form >
<label >Write your experience</label>
<textarea id="experience-textfield" name="experience-textfield" rows="9" cols="50">
  
  </textarea>
  <br/><br/>
</form>
<button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Postpage