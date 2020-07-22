import React, { useState,useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import { FaUserAlt, FaBinoculars } from "react-icons/fa";
import {FiLogOut} from 'react-icons/fi'
import {IoIosPeople} from 'react-icons/io'
import { MdAddLocation } from "react-icons/md";
import { Link } from "react-router-dom";
import MyContext from '../Context/PostContext';
import Cookies from 'js-cookie'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // display: 'none',
      color: "#fff",
      textDecoration: "none",
      fontFamily: "Dancing Script",
      fontSize: "3.5rem",
     
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    inputRoot: {
      // color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      "&:hover": {
				transition: "all 0.3s ease-in-out",
				color: "#e62429",
			},
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    nav: {
      background: "#ff5111",
    },
  })
);

export default function Nav() {
  const classes = useStyles();
  // const history = useHistory();
  const {token} = useContext(MyContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogut = () =>{

  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () =>{
    Cookies.remove(token)
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Grid container justify="center">
        <MenuItem>
          <IconButton>
            <Link to="/profile">
              <FaUserAlt size={25} color="#ff5111" />
            </Link>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            <Link to="/feeds">
              <FaBinoculars size={25} color="#ff5111" />
            </Link>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            <Link to='/record-your-experience'>
            <MdAddLocation size={32} color="#ff5111"/>
            </Link>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            <Link to="/find-travel-buddies">
              <IoIosPeople size={35} color="#ff5111" />
            </Link>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            <Link to="/">
              <FiLogOut size={32} color="#ff5111" onClick={handleLogout}/>
            </Link>
          </IconButton>
        </MenuItem>
      </Grid>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h4"
            component={Link}
            to="/profile"
          >
            Rover
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <Link to="/profile">
                <FaUserAlt size={25} color="white" />
              </Link>
            </IconButton>
            <IconButton color="inherit">
              <Link to="/feeds">
                <FaBinoculars size={25} color="white" />
              </Link>
            </IconButton>
            <IconButton>
              <Link to='/record-your-experience'>
              <MdAddLocation size={32} color="white"/>
              </Link>
            </IconButton>
            <IconButton color="inherit">
              <Link to="/find-travel-buddies">
                <IoIosPeople size={35} color="white" />
              </Link>
            </IconButton>
            <IconButton>
            <Link to="/">
              <FiLogOut size={32} color="white" onClick={handleLogut} />
            </Link>
          </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
