import React, { useState } from "react";
import "../App.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
import { Redirect } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import {useEndpoint} from '../Context/EndpointContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    // placetag:{
    //   color: "orange"
    // }
  })
);

const Uploadpage = ({ handleSubmit, road }) => {
  const [state, setState] = useState({
    checkedB: false,
  });

  const [posted, setPosted] = useState(false);

  const [postDescription, setPostDescription] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const buttonStyle = {
    fontFamily: "Roboto",
    backgroundColor: "#FF4500",
    color: "white",
    fontSize: "1rem",
  };

  let array1 = [
    {
      lat: "52.5074933",
      lon: "13.4148099",
      tag_type: "restaurant",
      name: "Mom's Kitchen",
      distance: 28,
    },
    {
      lat: "52.5075711",
      lon: "13.4146683",
      tag_type: "restaurant",
      name: "Bäckerei Bacco",
      distance: 39,
    },
    {
      lat: "52.5069295",
      lon: "13.4135957",
      tag_type: "restaurant",
      name: "Sushi for you",
      distance: 123,
    },
    {
      lat: "52.5064781",
      lon: "13.416557",
      tag_type: "restaurant",
      name: "Thai Huong Snack",
      distance: 140,
    },
    {
      lat: "52.5062984",
      lon: "13.4171876",
      tag_type: "restaurant",
      name: "Rosengarten am Engelbecken",
      distance: 184,
    },
    {
      lat: "52.5094535",
      lon: "13.4120303",
      tag_type: "restaurant",
      name: "Agora",
      distance: 310,
    },
    {
      lat: "52.5077516",
      lon: "13.4206012",
      tag_type: "restaurant",
      name: "Berliner Wappen",
      distance: 365,
    },
    {
      lat: "52.5041376",
      lon: "13.4178117",
      tag_type: "restaurant",
      name: "Die Henne - Alt-Berliner Wirtshaus",
      distance: 407,
    },
    {
      lat: "52.5038517",
      lon: "13.4188298",
      tag_type: "restaurant",
      name: "Clanndestino",
      distance: 468,
    },
  ];
  let array2 = [
    {
      lat: "52.5071228",
      lon: "13.4192474741258",
      tag_type: "park",
      name: "Michaelkirchplatz",
      distance: 274,
    },
    {
      lat: "52.5047015",
      lon: "13.4175068340883",
      tag_type: "park",
      name: "Rosengarten",
      distance: 341,
    },
    {
      lat: "52.50414415",
      lon: "13.4146040734642",
      tag_type: "park",
      name: "Alfred-Döblin-Platz",
      distance: 369,
    },
    {
      lat: "52.50420385",
      lon: "13.4171484819274",
      tag_type: "park",
      name: "Luisenstädtischer Kanal",
      distance: 383,
    },
    {
      lat: "52.50560815",
      lon: "13.4206973877785",
      tag_type: "park",
      name: "Immergrüner Garten",
      distance: 423,
    },
    {
      lat: "52.505573",
      lon: "13.4208118904297",
      tag_type: "park",
      name: "Ehemaliger Luisenstädtischer Kanal",
      distance: 431,
    },
  ];

  const array3 = array1.concat(array2);
  const classes = useStyles();
  const [place, setPlace] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const roverEndpoint = useEndpoint()
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
      .then((result) => result)
      .catch((error) => console.log("error", error));

    setPosted(true);
  };

  const fileSelectedHandler = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleEditorChange = (content, editor) => {
    setPostDescription(content);
  };

  return (
    <>
      <div className="location-section">
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
            {array3.map((each) => {
              return (
                <MenuItem
                  value={each.name}
                  key={each.distance}
                  className={classes.places}
                >
                  {each.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <br />
      <br />
      <div className="upload-section">
        <form>
          <div className="post-section">
            <label for="inputFiles">
              <FontAwesomeIcon
                icon={faCameraRetro}
                size="3x"
                style={{ color: "black" }}
              />{" "}
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
          </div>
        </form>
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
        {posted && <Redirect to="/profile" />}
      </div>{" "}
      <br />
      <br />
      <br />
      <Editor
        apiKey={process.env.REACT_APP_TINYKEY}
        initialValue="<p>Write your experience...</p>"
        init={{
          height: 400,
          menubar: false,
          statusbar: false,
           width:700,
          fontFamily: "Dancing Script",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />{" "}
      <br />
      <br />
      <Button style={buttonStyle} type="submit" onClick={handleSubmitPost}>
        Save
      </Button>
    </>
  );
};

export default Uploadpage;
