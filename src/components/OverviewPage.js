import React, { useState, useEffect, useContext } from "react";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import Uploadpage from "./Uploadpage";
import "../App.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { MdAddLocation } from "react-icons/md";
import Nav from "../components/Nav";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Cookies from "js-cookie";
import { useHistory} from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MyContext from "../Context/PostContext";
import {useEndpoint} from '../Context/EndpointContext'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import MyContext from '../Context/PostContext'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 700,
      marginTop: "5vh",
      maxHeight: "auto",
      [theme.breakpoints.down("md")]: {
        maxWidth: 650,
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: 550,
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: 350,
      },
    },
    button: {
      display: "block",
      marginTop: theme.spacing(2),
      paddingLeft: 20,
      width: 250,
      fontFamily: "Roboto",
      fontSize: 28,
      textTransform: "capitalize",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
      alignSelf: "center",
      fontSize: "5rem",
      [theme.breakpoints.down("1080")]: {
        minWidth: 210,
        alignSelf: "center",
        fontSize: "2rem",
      }
    },
    places: {
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: 300,
    },
    typo: {
      textAlign: "left",
      fontWeight: "fontWeightBold",
      paddingLeft: 25,
    },
    icon: {
      color: "grey",
      [theme.breakpoints.down("1080")]:{
        paddingLeft : 30
      },
      [theme.breakpoints.down("912")]:{
        paddingLeft : 50
      },
      [theme.breakpoints.down("812")]:{
        paddingLeft : 30
      }
    },
    username: {
      fontFamily: "Dancing Script",
      fontSize: "3rem",
      paddingTop: '20'
    },
    // editor:{
    //   [theme.breakpoints.down('1080')]:{
    //     width: 400,
    //     justify: 'center',  
    //   }
    // }
  })
);

const OverviewPage = () => {
  const classes = useStyles();
  const {
    postDescription,
    setPostDescription,
    selectedFiles,
    setSelectedFiles,
  } = useContext(MyContext);
const history = useHistory()
const {token} = useContext(MyContext)
  const [username,setUsername] = useState(null)
  const [lat, setLat] = useState(0);
  const [lng, setLon] = useState(0);
  const [road, setRoad] = useState({
    "address29": "KKC Berlin",
    "house_number": "15",
    "road": "Weiskopffstraße",
    "suburb": "Oberschöneweide",
    "city_district": "Treptow-Köpenick",
    "state": "Berlin",
    "postcode": "12459",
    "country": "Germany",
    "country_code": "de"
  });
  const roverEndpoint = useEndpoint()
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLat(geo.coords.latitude);
      setLon(geo.coords.longitude);
      // console.log([lat,lng])
      // Popup.openPopup()
    });
  }, [lat, lng]);

  const [record, setRecord] = useState(false);

  const handleClick = () => {
    setRecord(true);
  };


  useEffect(() => {
    console.log(token)
    if (token) {
    
      var myHeaders = new Headers();
      myHeaders.append("authorization", "Bearer " + token);
  
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
      fetch(`${roverEndpoint}/user/me`, requestOptions)
        .then((response) => response.json())
        .then((result) => setUsername(result.user_name))
        .catch((error) => console.log("error", error));
    }
  }, [roverEndpoint,token,setUsername]);

  const position = [lat, lng];
  const [state, setState] = useState({
    checkedB: false,
  });

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const buttonStyle = {
    fontFamily: "Roboto",
    backgroundColor: "#ff5111",
    color: "white",
    fontSize: "1rem",
  };

  let places = [
    "Anna Kim","Ristorante-Serafina","Kantinen & Partyservice Siering","Masala","Waldorf School Berlin-southeast",
    "LGC, Biosearch Technolgies","WBS CODING SCHOOL","Defensor Sicherheitsschule GmbH","Ruwisch & Kollegen GmbH","HIVE Institute","Netto","Rewe"]

  const [place, setPlace] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackOpen,setSnackOpen] = useState(false);

  // const handleSnackOpen = () =>{
  //   setSnackOpen(true)
  // }

  const handleSnackClose = () =>{
    setSnackOpen(false)
  }


  const handlePlacelist = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlace(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + Cookies.get("token"));
    var formdata = new FormData();
    for (const file of selectedFiles) {
      formdata.append("photos", file);
    }
    formdata.append("post_title", place);
    formdata.append("post_description", postDescription);
    formdata.append("city", road.suburb);
    formdata.append("place", place);
    formdata.append("view", state.checkedB);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${roverEndpoint}/post/create`, requestOptions)
      .then((response) => response.text())
      .then(() => {
      setRecord(false);
      setSnackOpen(true);
      history.push('/profile')
      })
      .catch((error) => console.log("error", error));
      
    
  };

  const fileSelectedHandler = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleEditorChange = (content, editor) => {
    setPostDescription(content);
  };

  return (
    <>
      <Nav /> <br/>
      
      <div style={{backgroundColor: "#fffbf7" ,  height: '1200px'}}>
      <Grid
        container
        justify="center"
        className={classes.container}
        alignItems="center"
      >
        <Grid item xs={6}>
        <Typography className={classes.username} align='center'>{username && `Welcome ${username} !`}</Typography>
        {/* <Typography className={classes.username}align='center'>Capture your experience</Typography> */}
          <Card className={classes.root} elevation={6}>
            <CardMedia>
              <div className="leaflet-container">
                <Map center={position} zoom={15} >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}  openPopup>
                    <Popup>{road.road}</Popup>
                  </Marker>
                </Map>
              </div>
            </CardMedia>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                {" "}
                <br />
                {record === false ? (
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Wanna capture your experience? <br />
                    <MdAddLocation
                      onClick={handleClick}
                      size={60}
                      color="red"
                    />
                  </Typography>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          id="demo-controlled-open-select-label"
                          className={classes.placetag}
                        >
                          Place
                        </InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={open}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={place}
                          onChange={handlePlacelist}
                        >
                          <MenuItem value={`${road.road}, ${road.suburb}`}>
                            <em>{`${road.road}, ${road.suburb} - (current location)`}</em>
                          </MenuItem>
                          <MenuItem> or </MenuItem>
                          {places.map((each) => {
                            return (
                              <MenuItem
                                value={each}
                                key={each}
                                className={classes.places}
                              >
                                {each}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <br />
                    <br />
                    
                    <div style={{ display: "flex" }}>
                      <label for="inputFiles">
                        <AddAPhotoIcon
                          fontSize="large"
                          className={classes.icon}
                        />
                      </label>
                      <input
                        type="file"
                        onChange={fileSelectedHandler}
                        multiple
                        id="inputFiles"
                        name="photos"
                        hidden
                        accept="image/png, image/jpeg"
                      />
                      {selectedFiles.length ? (
                        <div className="switch">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label="Public"
                          />
                        </div>
                      ) : null}
                      {/* {posted  &&  <Redirect to="/profile" />} */}
                    </div>{" "}
                    <br />
                    {/* <div style={{display:'flex' , alignItems:'baseline',justifyContent: 'space-around'}}>
                    <lable for='title-area' >Title</lable>
                    <input id='title-area' type='text'></input>
                    </div> */}
                    
                    {/* <TextField id="standard-basic" label="Standard" variant='standard' /><br/><br/> */}
                    <Grid container justify='center'>
                      <Grid item xs={12}  className={classes.editor}>
                      <Editor
                      className="overviewpage-editor"
                      apiKey="mkoaeakstug1m5gt3hpdotk40cnf5i678r19bxgls9hqqhgv"
                      initialValue="<p>Write your experience...</p>"
                      init={{
                        height: 400,
                        menubar: false,
                        statusbar: false,
                        width: 500,
                        fontFamily: "Dancing Script",
                        display: "flex",
                        justifyContent:'center',
                        overflow: "hidden",
                        borderRadius: 25,
                        
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help",
                      }}
                      onEditorChange={handleEditorChange}
                    />{" "}
                    </Grid>
                      </Grid>
                   
                    
                    <br />
                    <br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        style={buttonStyle}
                        type="submit"
                        onClick={handleSubmitPost}
                      >
                        Save
                      </Button>{" "}
                      {/* <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        // message="Note archived"
      >
       {snackOpen && <Alert severity="success">Captured your experience</Alert>}
      </Snackbar> */}
                    </div>
                  </>
                )}
              </CardContent>{" "}
            </div>
          </Card>
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default OverviewPage;
