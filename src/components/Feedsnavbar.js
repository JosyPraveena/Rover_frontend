import React, { useState,useEffect,useContext} from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import { FaUserAlt, FaBinoculars } from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import { MdAddLocation } from "react-icons/md";
import { Link } from "react-router-dom";
import {IoIosPeople} from 'react-icons/io'
import MyContext from "../Context/PostContext";
import {useEndpoint} from '../Context/EndpointContext'
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
      color: "#fff",
      textDecoration: "none",
      fontFamily: "Dancing Script",
      fontSize: "3.5rem",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
      inputRoot: {
        color: "primary",
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

const Feedsnavbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const {token} = useContext(MyContext)
  const { searchContent, setSearchContent,setSearchResults} = useContext(MyContext)
  const roverEndpoint = useEndpoint()
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const history = useHistory();
 
  useEffect(()=>{
    if(!searchContent.length)
    setSearchResults(null)
  },[searchContent,setSearchResults])

  const searchSubmit = (e) =>{
    e.preventDefault();

    fetch(`${roverEndpoint}/search-results/${searchContent}`)
    .then((res) => res.json())
    .then((data) => {
      setSearchResults(data);
    });
    // setSearchStatus(true)
  }
 
  const handleLogout = () =>{
    Cookies.remove(token)
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
              <FaUserAlt size={25} color="orange" />
            </Link>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            <Link to="/feeds">
              <FaBinoculars size={25} color="orange" />
            </Link>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            <MdAddLocation size={32} color="orange"  />
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            <Link to="/find-travel-buddies">
            <IoIosPeople size={35} color="orange" />
            </Link>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton>
            {/* <Redirect to="/"> */}
              <FiLogOut size={32} color="#ff5111" />
            {/* </Redirect> */}
          </IconButton>
        </MenuItem>
      </Grid>
    </Menu>
  );
  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Typography className={classes.title} noWrap variant="h4" 
            component={Link}
            to="/profile">
              Rover
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={searchSubmit}>
              <InputBase 
              
                // color="inherit"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
              />
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton>
                <Link to="/profile">
                  <FaUserAlt size={25} color="white" />
                </Link>
              </IconButton>
              <IconButton>
                <Link to="/feeds">
                  <FaBinoculars size={25} color="white" />
                </Link>
              </IconButton>
              <IconButton>
                <Link to='/record-your-experience'> 
                <MdAddLocation size={32} color="white"  />
                </Link>
              </IconButton>
              <IconButton>
                <Link to="/find-travel-buddies">
                <IoIosPeople size={35} color="white" />
                </Link>
              </IconButton>
             
              <IconButton>
              <Link to="/">
              <FiLogOut size={32} color="white" onClick={handleLogout}/>
              </Link>
            {/* </Redirect> */}
          </IconButton>
         
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </>
  );
};

export default Feedsnavbar;
