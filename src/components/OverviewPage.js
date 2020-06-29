import React, {useState,useEffect} from 'react'
import { Map, Marker, TileLayer,Popup } from "react-leaflet";
import Uploadpage from './Uploadpage'
import '../App.css'
// import { set } from 'js-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt,faBinoculars } from "@fortawesome/free-solid-svg-icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { FcBinoculars,FcStackOfPhotos } from 'react-icons/fc';
import {GiBinoculars,GiWhiteBook,GiBookCover,GiSecretBook} from'react-icons/gi'
import {MdPhotoAlbum} from 'react-icons/md'

import Navbar from '../components/Navbar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: 1000,
      width: 900
    }
  })
);

const OverviewPage = ({record,handleClick,handleSubmit}) =>{ 
    const classes = useStyles();
    const [lat, setLat] = useState(0);
    const [lng, setLon] = useState(0);
    const [road,setRoad] = useState({
        "house_number": "50",
        "road": "Annenstraße",
        "suburb": "Mitte",
        "city_district": "Mitte",
        "state": "Berlin",
        "postcode": "10179",
        "country": "Germany",
        "country_code": "de"
    });

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(geo => {
        setLat(geo.coords.latitude);
        setLon(geo.coords.longitude);
      });

    },[lat,lng]);

    
//   useEffect(() => {
//     async function fetchData() {

//       const queryUrl = `https://eu1.locationiq.com/v1/reverse.php?key=2ba94cf73afbaa&lat=${lat}&lon=${lng}&format=json`
//       const data = await fetch(queryUrl)
//       const res = await data.json()

//       setRoad(res.address)
//       setBoundingBox(res.boundingbox)
//     //   setSuburb(res.address.suburb)
//     }
//     fetchData()
//   },
//     [lat, lng]
//   )
 
    const position = [lat,lng]
    return(
        <>
        <Navbar/>
        <div className="overview-page">
        <Link to="/profile">
<GiSecretBook id="photos-icon"size={80} color="white"/>
</Link>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <Paper className={classes.paper}>
        <div className="leaflet-container">
        <Map center={position} zoom={14}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
      <Popup>{road.road}</Popup>
      </Marker>
    </Map>
     
        </div>
       { record===false ? <div id="text-overview"><h3>Wanna record your experience?</h3></div> :null}
        {record===false ?
        <div id="marker">
            
        <FontAwesomeIcon  onClick={handleClick} icon={faMapMarkerAlt} size='4x' style={{color:"#FF0000"}}/>
        </div> :null}
        {record===true ? <Uploadpage handleSubmit={handleSubmit} road={road}/> :null}
        </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <FontAwesomeIcon id="binocular" icon={GiBinoculars} size='3x' style={{color: "	#FFFFFF"}}/> */}
        <div className="icons">
        <Link to = '/feeds'>

<GiBinoculars size={80} id="binocular" color='white'/>
</Link>



        </div>
        
        
        {/* <Link to = '/feeds'>
        <FcBinoculars id="binocular" size={80}/>    
        </Link> */}
       
        </div>
        
        
        
        </>
    )
}

export default OverviewPage