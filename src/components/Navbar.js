import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme } from "@material-ui/core/styles";
import black from "@material-ui/core/colors/blue";
import { Grid } from "@material-ui/core";
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { GiBinoculars} from "react-icons/gi";
import {AiOutlineUser,AiOutlineCalendar} from 'react-icons/ai';
 import {FaUserAlt,FaBinoculars,FaCalendar} from 'react-icons/fa'
import { MdAddLocation } from "react-icons/md";

// const theme = createMuiTheme({
//   palette: {
//     primary: black,
//   },
// });

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//       // display: "grid",
//       // gridColumn: "2 / 3",
//       position: "fixed",
//       top : 0

//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//       fontFamily: "Dancing Script",
//       fontSize: "3rem",
//       textDecoration: "none",
//       color: "white",
      
//     },
//     navbar: {
//       background:  "black",
//       height: 65,
//     },
//   })
// );

const Navbar = () => {
  // const classes = useStyles();
  return (
    <>
      <div className="navbar">
        <div id="rover-logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
          <h3>Rover</h3>
          </Link>
          
        </div>
        <div id="navbar-icons">
        <Link to="/profile">
        <FaUserAlt  size={35} color="white"/>
        </Link>
        <Link to="/feeds">
        <FaBinoculars size={35} color="white" />
        </Link>
        <Link to="record-your-experience">
        <MdAddLocation  size={40} color="white" />
        </Link>
        <FaCalendar size={35} color="white"/>
        </div>
      </div>
    </>
  );
};

export default Navbar;
