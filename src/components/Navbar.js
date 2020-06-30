import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import black from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: black,
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontFamily: 'Dancing Script',
      fontSize: '3rem',
      textDecoration: "none",
      color: 'white'
    },
    navbar:{
        background: 'black',
        height: 65
    }
  }),
);

const Navbar =()=>{
    const classes = useStyles();
    return(
        <>
        <div className={classes.root}>
      <AppBar position="sticky"  className={classes.navbar}>
        <Toolbar>

          <Typography variant="h6" className={classes.title} component={Link} to='/' >
            Rover
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
        </>
    )
}

export default Navbar