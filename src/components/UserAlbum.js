import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { GiHand } from "react-icons/gi";
import { FaSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Typography from "@material-ui/core/Typography";
import {useEndpoint} from '../Context/EndpointContext'
import FadeIn from "react-fade-in";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 230,
      minWidth: "100vw",
      padding: 70,
    },
    card: {
      maxHeight: 255,
      maxWidth: 400,
      margin: theme.spacing(3),
      textDecoration: "none",
      transition: "all 0.3s ease-out",
      "&:hover": {
        opacity: 1,
        transform: "translateY(-15px)",
      },
    },
    media: {
      height: 200,
      width: 400,
    },
    posttitle: {
      paddingBottom: 10,
    },
    username: {
      fontFamily: "Dancing Script",
      fontSize: "3rem",
    },
    subtitle:{
      paddingTop: 20,
      paddingLeft: 100,
      fontFamily: "Dancing Script",
      fontSize: "2rem", 
    }
  })
);

const UserAlbum = () => {
  const classes = useStyles();
  const roverEndpoint = useEndpoint()
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + Cookies.get("token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${roverEndpoint}/user/me`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUserData(result))
      .catch((error) => console.log("error", error));
  }, [roverEndpoint]);

  return (
    <>
      <Nav />
      <div className="useralbum">
      <FadeIn>
        <div id="welcome-tag">
          <GiHand color="#ffcc00" id="hand" size={60} />
          <Typography className={classes.username}>
            {userData && `${userData.user_name}`}
          </Typography> <br/>
       
        </div>
        <Typography className={classes.subtitle}>
            Your bundle of experiences...
          </Typography>
        </FadeIn>
      <FadeIn>
        <Grid container className={classes.root} justify="flex-start">
          {userData && userData.posts.length ? (
            userData.posts.map((each) => {
              let picture = "https://www.tellerreport.com/images/no-image.png";

              if (
                each.images.length &&
                (each.images[0].path !== null ||
                  each.images[0].path !== undefined)
              ) {
                picture = `${roverEndpoint}${each.images[0].path}`;
              }
              return (
                // <>
                
                <Card elevation={6}
                  className={classes.card}
                  key={each._id}
                  component={Link}
                  to={`/place/${each._id}`}
                >
                  <CardMedia
                    className={classes.media}
                    image={picture}
                    title={each.post_title}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="initial"
                      align="center"
                      className={classes.posttitle}
                    >
                      {each.post_title}
                    </Typography>
                  </CardContent>
                </Card>
                //  </FadeIn>
              );
            })
          ) : (
            <>
            <div className="noposts">
              {" "}
              <h1> No experiences to show </h1>{" "}              
              <FaSadTear color="#ffcc00" size={40} /> 
                  </div> 
                  <div style={{width: "100%",paddingTop: '30px'}}>
                  <Link to='/record-your-experience'  style={{ textDecoration: 'none' }}>
                  <h1 style={{color:"#ff5111",fontFamily: 'Dancing Script',textAlign:'center'}}> Click here to add your experiences</h1>
                  </Link>
                  </div>
            
             </>
          )}
        </Grid>
        </FadeIn>
      </div>
    </>
  );
};

export default UserAlbum;
