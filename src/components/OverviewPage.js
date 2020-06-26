import React, {useState,useEffect} from 'react'
import { Map, Marker, TileLayer,Popup } from "react-leaflet";
import Postpage from '../components/Postpage'
import '../App.css'
// import { set } from 'js-cookie';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: 1000,
      width: 1000
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
    // const [restaurants,setRestaurants] = useState(null)
    // const [parks,setParks] = useState(null)
    
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
        <div className="overview-page">
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
        {record===true ? <Postpage handleSubmit={handleSubmit} road={road}/> :null}
        </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        </div>
        
        
        
        </>
    )
}

export default OverviewPage