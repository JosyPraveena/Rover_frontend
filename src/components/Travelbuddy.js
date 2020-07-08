import React from "react";
import Nav from "../components/Nav";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red ,blue,green} from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Grid from "@material-ui/core/Grid";
import {
  FcBusinesswoman,
  FcBusinessman,
  FcAutomotive,
  FcDepartment,
} from "react-icons/fc";
import Chip from "@material-ui/core/Chip";
import {MdTrain,MdDirectionsBus} from 'react-icons/md'
import {GiSailboat} from 'react-icons/gi'
import FadeIn from "react-fade-in";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    root:{
      width: '100%',
      height: 'auto'
    },
    title: {
      fontFamily: "Dancing Script",
      fontSize: "3rem",
      paddingTop: 30,


    },
    // root: {
    //   minHeight: 900,
    //   minWidth: "100%",
    // //   paddingLeft: 70,
    // //   display: "flex",
    // },
    card: {
      maxWidth: 400,
      margin: theme.spacing(3),
      // marginTop: "10vh",
      height: 'auto',
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    avatar1: {
      backgroundColor: blue[500],
    },
    avatar2: {
      backgroundColor: green[500],
    },
    chip: {
      margin: theme.spacing(1),
    },
  })
);
const Travelbuddy = () => {
  const classes = useStyles();
  return (
    <>
      <Nav />
      <FadeIn>
      <Typography variant="h3" className={classes.title} align="center">
        Find your travel group
      </Typography> <br/> <br/>
      <Grid container className={classes.root} alignItems="center" justify='center'>
        <Grid item >
          <Card className={classes.card} elevation={6} >
            <CardHeader
              avatar={
                <AvatarGroup max={4}>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    J
                  </Avatar>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    +2
                  </Avatar>
                </AvatarGroup>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Austria"
              subheader="August 20, 2020"
            />
            <CardMedia
              className={classes.media}
              image={
                "https://s27363.pcdn.co/wp-content/uploads/2020/05/One-Day-in-Hallstatt.jpg.optimal.jpg"
              }
            />
            <CardContent>
              <Chip
                className={classes.chip}
                icon={<FcBusinesswoman size={25} />  }
                label="Women trip"
              />
              <Chip
                className={classes.chip}
                icon={<FcAutomotive size={25} />}
                label="Commute"
              />
              <Chip
                className={classes.chip}
                icon={<FcDepartment size={25} />}
                label="Booked for 3 @Heritage Hotel"
              />
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
            </CardActions>
          </Card>
          </Grid>
          <Grid item>
          <Card className={classes.card} elevation={6}>
            <CardHeader
              avatar={
                <AvatarGroup max={4}>
                  <Avatar aria-label="recipe" className={classes.avatar1}>
                    AJ
                  </Avatar>
                  <Avatar aria-label="recipe" className={classes.avatar1}>
                    P
                  </Avatar>
                </AvatarGroup>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Luxembourg"
              subheader="September 12, 2020"
            />
            <CardMedia
              className={classes.media}
              image={
                "https://www.eu-startups.com/wp-content/uploads/2019/03/Luxembourg.jpg"
              }
            />
            <CardContent>
            <Chip className={classes.chip}
        icon={<FcBusinessman size={25}/> }
        label="Men trip"
      />
      <Chip className={classes.chip} icon={<MdTrain size={25} color='red'/>}
      label="Commute"/>
      <Chip  className={classes.chip}icon={<FcDepartment size={25}/>} label="Booked for 3 @Heritage Hotel"/>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card} elevation={6}>
            <CardHeader
              avatar={
                <AvatarGroup max={4}>
                  <Avatar aria-label="recipe" className={classes.avatar2}>
                    S
                  </Avatar>
                  <Avatar aria-label="recipe" className={classes.avatar2}>
                    P
                  </Avatar>
                  <Avatar aria-label="recipe" className={classes.avatar2}>
                    +1
                  </Avatar>
                </AvatarGroup>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Wansee Boating"
              subheader="July 28, 2020"
            />
            <CardMedia
              className={classes.media}
              image={
                "https://cdn.getyourguide.com/img/tour/570e2ba17c2f7.jpeg/146.jpg"
              }
            />
            <CardContent>
            <Chip className={classes.chip}
        icon={<FcBusinessman size={30}/>}
        label="Men trip"
      />
      <Chip className={classes.chip} icon={<MdDirectionsBus size={25} color='blue'/>}
      label="Commute"/>
      <Chip  className={classes.chip}icon={<GiSailboat size={25} color='#ff0c63'/>} label="Boats booked @Bootsverleih Berlin Wannsee"/>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </FadeIn>
    </>
  );
};

export default Travelbuddy;
