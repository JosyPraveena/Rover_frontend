import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(5)
    },
    paper: {
      padding: theme.spacing(5),
      margin: "auto",
      maxWidth: 1000
    },
    image: {
      width: 150,
      height: 150
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  })
);

export default function Feeds() {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchPost() {
    fetch("http://localhost:3000/post/allposts")
      .then(res => res.json())
      .then(data => {
        setData(data);
      }) } fetchPost()
  }, []);


  return (
      <div className="feed-page">
           <div className={classes.root}>
      {data ?
        data.map(each => {
            return each.view === true ?
          <Paper className={classes.paper} key={each._id} >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={`http://localhost:3000${each.images[0].path}`}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h5">
                      {each.post_title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {each.post_description}
                    </Typography>
                    
                  </Grid>
                  <Grid item>
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        - {each.username}
                      </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">21/06/2020</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper> : null}
        ) : <div>Loading</div>}
    </div>

      </div>
   
  );
}
