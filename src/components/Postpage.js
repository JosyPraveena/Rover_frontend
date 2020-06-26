import React, {useState,useEffect} from 'react'
import '../App.css'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
      paddingLeft: 45
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250
    }
  })
);

const Postpage = ({handleSubmit,road}) =>{

  const [state, setState] = useState({
    checkedB: false
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  let array1 = [
    {
      lat: "52.5074933",
      lon: "13.4148099",
      tag_type: "restaurant",
      name: "Mom's Kitchen",
      distance: 28
    },
    {
      lat: "52.5075711",
      lon: "13.4146683",
      tag_type: "restaurant",
      name: "Bäckerei Bacco",
      distance: 39
    },
    {
      lat: "52.5069295",
      lon: "13.4135957",
      tag_type: "restaurant",
      name: "Sushi for you",
      distance: 123
    },
    {
      lat: "52.5064781",
      lon: "13.416557",
      tag_type: "restaurant",
      name: "Thai Huong Snack",
      distance: 140
    },
    {
      lat: "52.5062984",
      lon: "13.4171876",
      tag_type: "restaurant",
      name: "Rosengarten am Engelbecken",
      distance: 184
    },
    {
      lat: "52.5094535",
      lon: "13.4120303",
      tag_type: "restaurant",
      name: "Agora",
      distance: 310
    },
    {
      lat: "52.5077516",
      lon: "13.4206012",
      tag_type: "restaurant",
      name: "Berliner Wappen",
      distance: 365
    },
    {
      lat: "52.5041376",
      lon: "13.4178117",
      tag_type: "restaurant",
      name: "Die Henne - Alt-Berliner Wirtshaus",
      distance: 407
    },
    {
      lat: "52.5038517",
      lon: "13.4188298",
      tag_type: "restaurant",
      name: "Clanndestino",
      distance: 468
    }
  ];
  let array2 = [
    {
      lat: "52.5071228",
      lon: "13.4192474741258",
      tag_type: "park",
      name: "Michaelkirchplatz",
      distance: 274
    },
    {
      lat: "52.5047015",
      lon: "13.4175068340883",
      tag_type: "park",
      name: "Rosengarten",
      distance: 341
    },
    {
      lat: "52.50414415",
      lon: "13.4146040734642",
      tag_type: "park",
      name: "Alfred-Döblin-Platz",
      distance: 369
    },
    {
      lat: "52.50420385",
      lon: "13.4171484819274",
      tag_type: "park",
      name: "Luisenstädtischer Kanal",
      distance: 383
    },
    {
      lat: "52.50560815",
      lon: "13.4206973877785",
      tag_type: "park",
      name: "Immergrüner Garten",
      distance: 423
    },
    {
      lat: "52.505573",
      lon: "13.4208118904297",
      tag_type: "park",
      name: "Ehemaliger Luisenstädtischer Kanal",
      distance: 431
    }
  ];

  
  const buttonStyle = {
    fontFamily : 'Pangolin',
  
  }
  const array3 = array1.concat(array2);
  const classes = useStyles();
  const [place, setPlace] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handlePlacelist = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlace(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

    return(
        <>
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
        <div className="location-section">
      <Button className={classes.button}>Select location</Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Place</InputLabel>
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
    <em>{`${road.road}, ${road.suburb}`}</em>
          </MenuItem>
          <MenuItem> or </MenuItem>
          {array3.map(each => {
            return (
              <MenuItem value={each.name} key={each.distance}>
                {each.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

   
    </div>

        </div>
<br/><br/>
<div>
  <h3>{`Title: ${place}`}</h3></div>

        {/* <form method="POST" action="http://localhost:3000/upload/cat-pics" enctype="multipart/form-data"> */}
     <div className="post-section" >
<FontAwesomeIcon icon={faCameraRetro} size='2x' style={{color:"grey"}} /> 
<input type="file" multiple
       id="avatar" name="avatar" 
       accept="image/png, image/jpeg"/>
       
        </div>
        {/* </form> */}
        <form className="post-section1"  >

<textarea id="experience-textfield" placeholder="What your experience in this place?" name="experience-textfield" rows="9" cols="50">
  
  </textarea>
  <br/><br/>
</form>

<Button style={buttonStyle} onClick={handleSubmit} variant="contained" color="primary"> Save </Button>

        </>
    )
}

export default Postpage