import React, { useState, useEffect,useContext } from "react";
import {
  fade,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Feedsnavbar from "../components/Feedsnavbar";
import parse from "html-react-parser";
import Box from "@material-ui/core/Box";
import moment from "moment";
import MyContext from "../Context/PostContext";
import Modal from "@material-ui/core/Modal";
import {useEndpoint} from '../Context/EndpointContext'
import FadeIn from "react-fade-in";
import {Link} from 'react-router-dom' 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(5),
      paddingTop: 100
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 1000,
      marginBottom: 40,
		transition: "all 0.3s ease-out",
		"&:hover": {
			opacity: 1,
			transform: "translateY(-5px)",
		},
    },
    image: {
      // width: "50%",
      // height: "auto"
      maxWidth: "100%",
      maxHeight: "100%",
    },
    img: {
      // margin: "auto",
      // display: "block",
      width: 200,
      height: 150
    },
    picture: {  
			maxWidth: "100%",
			maxHeight: "100%",
		},

		pictureContainer: {
			width: "400px",
			margin: "150px auto",
			[theme.breakpoints.down(550)]: {
				width: "300px",
			},
		},
    textContainer:{
      width: 505
    }
  })
);

export default function SearchResults () {
    const classes = useStyles();
    const roverEndpoint = useEndpoint()
    // const { searchContent, setSearchContent,searchResults,setSearchResults,searchStatus, setSearchStatus} = useContext(MyContext);
    const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
    return(
        
        <div className="feed-page">

            
          <Grid container className={classes.root}>
            {searchResults &&
              searchResults.map((each) => {
                let picture = "https://www.tellerreport.com/images/no-image.png";
  
                if (
                  each.images.length &&
                  (each.images[0].path !== null ||
                    each.images[0].path !== undefined)
                ) {
                  picture = `${roverEndpoint}${each.images[0].path}`;
                }
                return each.view === true ? (
                  <Paper className={classes.paper} key={each._id}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item>
                        <ButtonBase className={classes.image} onClick={handleOpen}>
                          <img
                            className={classes.img}
                            alt="complex"
                            src={picture}
                          />
                        </ButtonBase>
                        <Modal open={open} onClose={handleClose}>
                                  <div className={classes.pictureContainer}>
                                      <img className={classes.picture} alt='complex' src={picture} />
                                  </div>
                              </Modal>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} className={classes.textContainer}>
                          <Grid item xs>
                            <Typography gutterBottom variant="h5">
                              {each.post_title}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {parse(each.post_description)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              style={{
                                cursor: "pointer",
                                fontStyle: "italic",
                                fontSize: "1rem",
                              }}
                            >
                              - {each.username}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography style={{ fontStyle: "italic" }}>
                            {moment(`${each.post_date}`).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                     
                    </Grid>
                  </Paper>
                ) : null
              })
        }
          </Grid>
        </div>
    )
}