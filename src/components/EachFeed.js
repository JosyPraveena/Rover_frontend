import React, { useEffect, useState} from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
// import EditIcon from '@material-ui/icons/Edit';
// import Button from "@material-ui/core/Button";
// import MyContext from "../Context/PostContext";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import {Modal} from "@material-ui/core/Modal";
import {useEndpoint} from '../Context/EndpointContext'
import moment from 'moment'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      marginTop: "5vh",
      height: "auto",      
      // background: "#ffcdbb"
    },
    gridList: {
      flexWrap: "wrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    container: {
      backgroundColor: "#fffbf7",
    },
    itemcontainer: {
      padding: 30,
    },
    title: {
      fontFamily: "Dancing Script",
      fontSize: "3rem",
      fontWeight: "fontWeightBold",
      width: "100vw",
      display: "flex",
      justifyContent: "center" ,
      // padding: 20
      paddingBottom: 20
    },
    icon:{
      color: "#ff4500"
    },
    paper:{
      background: '#f0f0f0',
      padding: 20,
      justifyItems: 'center'
    },
    girditem:{
      backgroundColor: '#f5f5f5',
      maxWidth: "100%",
    maxHeight: "50%"
    },
    slider:{
      maxWidth: "100%",
      maxHeight: "100%"
    },

    subtitle:{
      fontFamily: 'Dancing Script'
    },
    
  })
);

const EachFeed = () =>{
    const classes = useStyles();
    const roverEndpoint = useEndpoint()
    const { id } = useParams();
    const [data,setData] = useState(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      async function fetchData() {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const queryUrl = `${roverEndpoint}/post/${id}`;
        const data = await fetch(queryUrl, requestOptions);
        const res = await data.json();
        setData(res);
        // console.log(res)
      }
  
      fetchData();
    }, [id,roverEndpoint]);

    return(
            <>
            <Nav/>
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={8}>
                <Card className={classes.root} elevation={6}>
                <Grid container className={classes.itemcontainer}>
                <Grid item xs={12} className={classes.griditem}>
                <div style={{display: "flex",
         /* flexDirection: "row" */ paddingLeft: '40px',
          justifyContent: "center", /*alignItems: 'baseline', *//*backgroundColor: '#ff9c77' */}}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      align='center'
                    >
                      {data && data.post_title}
                    </Typography>
                    
                   
                  </div>
                  <Typography variant='h5' className={classes.subtitle}>{data && `Recorded by ${data.username}`}</Typography>
                    <Typography variant='h5' className={classes.subtitle}>{data && moment(`${data.post_date}`).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}</Typography>
            <br/><br/>
            {/* <Grid container  className={classes.slider}>
              <Grid item xs={8} justify='center'> */}
              <div className="carousel-container">
                    <Carousel className='carousel-tag' showThumbs={false} showStatus={false} >
                    { data && data.images.map((each) => (
                        <img
                            src={`${roverEndpoint}${each.path}`}
                            alt={each.name}
                          />
                    ))}
                    </Carousel>
                    </div>
                       {/* </Grid>
                       </Grid> */}
                          <br/><br/><br/>
                    <Typography variant='h6'align="justify" fontFamily='Dancing Scripts'>
                      {data && parse(data.post_description)}
                    </Typography>
                </Grid>
                </Grid>
                </Card>
                
                </Grid>

            </Grid>
            </>
    )
}

export default EachFeed;