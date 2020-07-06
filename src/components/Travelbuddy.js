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
import { red } from "@material-ui/core/colors";
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
import {MdTrain} from 'react-icons/md'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontFamily: "Dancing Script",
      fontSize: "3rem",
      paddingTop: 30,
      textShadow: '1px 1px #ff0000'

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
      height: 450,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    avatar: {
      backgroundColor: red[500],
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
      <Typography variant="h3" className={classes.title} align="center">
        Find your travel group
      </Typography>
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
                icon={<FcBusinesswoman size={30} />  }
                label="Women trip"
              />
              <Chip
                className={classes.chip}
                icon={<FcAutomotive size={30} />}
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
        icon={<FcBusinessman size={30}/>}
        label="Men trip"
      />
      <Chip className={classes.chip} icon={<MdTrain size={30} color='red'/>}
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
        icon={<FcBusinessman size={30}/>}
        label="Men trip"
      />
      <Chip className={classes.chip} icon={<MdTrain size={30} color='red'/>}
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
      </Grid>
    </>
  );
};

export default Travelbuddy;
