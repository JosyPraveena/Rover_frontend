import React, { useState, useEffect,useContext } from "react";
import {
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
      paddingTop: 50,
      maxwidth: "100%",
      height: 3500,
      backgroundColor: '#fffbf7'
    },
    paper: {
     
      height: 'auto',
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: "100%",
      marginBottom: 40,
		transition: "all 0.3s ease-out",
		"&:hover": {
			opacity: 1,
      transform: "translateY(-5px)",
      background: "#ffcdbb",
      color: 'black'
		},
    },
    image: {
      // width: "50%",
      // height: "auto"
      maxWidth: "100%",
      maxHeight: "100%",
      [theme.breakpoints.down(1196)]: {
        maxWidth: "200%",
        maxHeight: "200%",
        // paddingLeft: 200
        // justify: 'center'
      }
    },
    img: {
      // margin: "auto",
      // display: "block",
      width: 200,
      height: 150,
      [theme.breakpoints.down(1196)]: {
        // paddingLeft: 100
        // maxWidth: "100%",
        // maxHeight: '100%'

        maxWidth: "100%",
        maxHeight: '100%'
      },
      // [theme.breakpoints.down(1171)]: {
      //   // paddingLeft: 100
      //   // maxWidth: "100%",
      //   // maxHeight: '100%'

      //   width: 690,
      // height: 200,
      // }
      
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
    },
    imageitem:{
      [theme.breakpoints.down(1196)]: {
        paddingLeft: 100
      },
    },
    linktitle:{
      textDecoration: 'none',
      color: 'black'
    },
    postdescription:{
      overflow: 'hidden',
      lineHeight: '1.2em',
      height: '3.6em',
      // textOverflow: 'ellipsis',
      // whiteSpace: 'nowrap',
    },
    heading:{
      fontFamily: 'Dancing SCript',
      paddingBottom: 30
    }
  })
);

export default function Feeds() {
  const classes = useStyles();
  const roverEndpoint = useEndpoint()
  const [data, setData] = useState(null);

 const { searchStatus, setSearchStatus,searchResults,setSearchResults,searchContent} = useContext(MyContext)
  const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
  useEffect(() => { 
    async function fetchPost() {
      await fetch(`${roverEndpoint}/post/allposts`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
    fetchPost();
  }, [roverEndpoint]);

  // useEffect(() => {
  //   async function fetchSearchresults() {
  //     await fetch(`${roverEndpoint}/search-results/${searchStatus}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setSearchData(data);
  //       });
  //   }
  //   fetchSearchresults();
  // }, [searchStatus,roverEndpoint]);
  

  return (
    <>
     <Feedsnavbar />
     <FadeIn>
      {/* <div className="feed-page"> */}
        <Grid container className={classes.root} justify='center' >
        
          <Grid item xs={8}>
          <Typography variant='h2' color='black' className={classes.heading}>Escapades</Typography> 
          {searchResults && searchResults.length != null ? searchResults &&
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
                <Paper className={classes.paper} key={each._id} elevation={6}>
                  <Grid container spacing={3} alignItems="center">
                   
                    <Grid item className={classes.imageitem} justify='center'>

                      <ButtonBase className={classes.image} onClick={handleOpen}>
                        <img
                        textAlign='center'
                          className={classes.img}
                          alt="complex"
                          src={picture}
                        />
                      </ButtonBase>
                      {/* <Modal open={open} onClose={handleClose}>
								<div className={classes.pictureContainer}>
									<img className={classes.picture} alt='complex' src={picture} />
								</div>
							</Modal> */}
                      
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2} className={classes.textContainer}>
                        <Grid item xs>
                          <Typography className={classes.linktitle} gutterBottom variant="h6" component={Link} to={`/post/${each._id}`}>
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
                    </Grid></Grid>
                </Paper>
              ) :  null
            } )  
           : data &&
            data.map((each) => {
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
                      {/* <Modal open={open} onClose={handleClose}>
								<div className={classes.pictureContainer}>
									<img className={classes.picture} alt='complex' src={picture} />
								</div>
							</Modal> */}
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2} className={classes.textContainer}>
                        <Grid item xs>
                          <Typography className={classes.linktitle} gutterBottom variant="h4" component={Link} to={`/post/${each._id}`}>
                            {each.post_title}
                          </Typography>
                          <Typography variant="body2" gutterBottom align="justify" className={classes.postdescription}>
                            { parse(each.post_description)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h6"
                            style={{
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
              ) : null;
            })
          }
          </Grid>
        </Grid>
      {/* </div> */}
      </FadeIn>
    </>
  );
}
