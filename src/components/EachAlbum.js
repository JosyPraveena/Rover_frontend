import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
// import EditIcon from '@material-ui/icons/Edit';
// import Button from "@material-ui/core/Button";
// import MyContext from "../Context/PostContext";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import { useEndpoint } from "../Context/EndpointContext";
import FadeIn from "react-fade-in";
import { Editor } from "@tinymce/tinymce-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      marginTop: "10vh",
      height: "auto",
      background: "#ffcdbb",
      transition: "all 0.3s ease-out",
      "&:hover": {
        opacity: 1,
        transform: "translateY(-15px)",
      },
    },
    gridList: {
      flexWrap: "nowrap",
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
      justifyContent: "center",
      // padding: 20
      paddingBottom: 20,
    },
    icon: {
      color: "#ff4500",
    },
    paper: {
      background: "#f0f0f0",
      padding: 20,
      justifyItems: "center",
    },
    girditem: {
      backgroundColor: "#f5f5f5",
    },
  })
);

const EachAlbum = () => {
  const classes = useStyles();
  // const { postDescription, setPostDescription ,  selectedFiles, setSelectedFiles} = useContext(MyContext)
  // console.log(
  //   postDescription,
  //   // setPostDescription,
  //   selectedFiles,
  //   // setSelectedFiles
  // );
  const roverEndpoint = useEndpoint();
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [editFlag, setEditFlag] = useState(false);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState(null);
  useEffect(() => {
    async function fetchData() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const queryUrl = `${roverEndpoint}/post/${id}`;
      const data = await fetch(queryUrl, requestOptions);
      const res = await data.json();
      setPostData(res);
    }

    fetchData();
  }, [id, roverEndpoint]);

  // const buttonStyle = {
  //   fontFamily: "Roboto",
  //   backgroundColor: "#ff5111",
  //   color: "white",
  //   fontSize: "16px",
  //   width: 65,
  //   height: 35,
  //   textTransform: 'capitalize',
  //   marginLeft: 50,
  //   border: 'none',
  //   padding: "14px 31px",
  // };
  const handleEditorChange = (content, editor) => {
    setDescription(content);
  };
  const fileSelectedHandler = (e) => {
    setFiles(e.target.files);
  };

  const handleEdit = () => {
    setEditFlag(true);
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + Cookies.get("token"));

    var formdata = new FormData();
    for (const file of files) {
      file && formdata.append("photos", file);
    }

    description && formdata.append("post_description", description);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${roverEndpoint}/post/editpost/${id}`, requestOptions)
      .then((response) => response.text())
      .then(() => {
        setEditFlag(false);
        window.location.reload(false);
      })
      .catch((error) => console.log("error", error));
  };

  // console.log(editFlag);
  return (
    <>
      <Nav />
      <FadeIn>
        {postData && (
          <Grid container justify="center" className={classes.container}>
            <Grid item xs={8}>
              <Card className={classes.root} elevation={6}>
                <Grid container className={classes.itemcontainer}>
                  <Grid item xs={12} className={classes.griditem}>
                    <div
                      style={{
                        display: "flex",
                        /* flexDirection: "row" */ paddingLeft: "40px",
                        justifyContent:
                          "center" /*alignItems: 'baseline', */ /*backgroundColor: '#ff9c77' */,
                      }}
                    >
                      <Typography
                        variant="h5"
                        className={classes.title}
                        align="center"
                      >
                        {postData && postData.post_title}
                      </Typography>
                      <div
                        style={{
                          width: "10vw",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      ></div>
                    </div>
                    <br />
                    {/* <EditIcon onClick={handleEdit} align='right'/> */}
                    <div className="carousel-container">
                      <Carousel
                        className="carousel-tag"
                        showThumbs={false}
                        showStatus={false}
                      >
                        {postData &&
                          postData.images.map((each) => (
                            <img
                              src={`${roverEndpoint}${each.path}`}
                              alt={each.name}
                              key={each.path}
                            />
                          ))}
                      </Carousel>

                      {/* <GridList
                      className={classes.gridList}
                      cols={3}
                      elevation={6}
                      //   {postData.images.length > 1 ? cols={1.5} : cols={2.5}}
                    >
                      {postData.images.map((each) => (
                        <GridListTile key={each.name}>
                          <img
                            src={`${roverEndpoint}${each.path}`}
                            alt={each.name}
                            style={{ width: "300px", height: "300px" }}
                          />
          
                        </GridListTile>
                      ))}
                    </GridList> */}
                    </div>{" "}
                    <br /> <br />
                    {editFlag === false ? (
                      // <Paper className={classes.paper}>
                      <Typography align="justify" fontFamily="Dancing Scripts">
                        {parse(postData.post_description)}
                      </Typography>
                    ) : (
                      // </Paper>
                      <Grid item xs={12}>
                        <label for="inputFiles">
                          <AddAPhotoIcon
                            fontSize="large"
                            className={classes.icon}
                          />
                        </label>
                        <input
                          type="file"
                          onChange={fileSelectedHandler}
                          multiple
                          id="inputFiles"
                          name="photos"
                          accept="image/png, image/jpeg"
                          hidden
                        />
                        <Editor
                          apiKey={process.env.REACT_APP_TINYKEY}
                          initialValue={`<p>${postData.post_description}<p>`}
                          init={{
                            margin: "auto",
                            maxWidth: "100%",
                            // padding: 10,
                            maxHeight: "100%",
                            menubar: false,
                            statusbar: false,
                            // width: 750,
                            fontFamily: "Dancing Script",
                            display: "inline-block",
                            overflow: "hidden",
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help",
                          }}
                          onEditorChange={handleEditorChange}
                        />{" "}
                      </Grid>
                    )}{" "}
                    <br /> <br /> <br />
                    <div className="savebutton">
                      <form onSubmit={handleUpdateSubmit}>
                        <button className="buttonstyle" type="submit">
                          Save
                        </button>
                      </form>
                      <button className="buttonstyle-edit" onClick={handleEdit}>
                        Edit
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        )}
      </FadeIn>
    </>
  );
};

export default EachAlbum;
