import React, { useEffect, useState, useContext } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import MyContext from "../Context/PostContext";
import Cookies from "js-cookie";
import parse from "html-react-parser";

import {useEndpoint} from '../Context/EndpointContext'

import { Editor } from "@tinymce/tinymce-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      marginTop: "10vh",
      height: 900,
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
      width: "90vw",
      display: "flex",
      justifyContent: "center" 
    },
    icon:{
      color: "#ff4500"
    }
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
  const roverEndpoint = useEndpoint()
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
  }, [id,roverEndpoint]);

  const buttonStyle = {
    fontFamily: "Roboto",
    backgroundColor: "#ff5111",
    color: "white",
    fontSize: "1rem",
    width: 65,
    height: 35,
    textTransform: 'capitalize',
    marginLeft: 100,
    border: "1px solid red",
            // width: "50vw",
            // display: "flex",
            // justifyContent: "flex-end",
            // paddingRight: "30px"
  };
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setEditFlag(false);
  };

  console.log(editFlag);
  return (
    <>
      <Nav />
      {postData && (
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={8}>
            <Card className={classes.root} elevation={6}>
              <Grid container className={classes.itemcontainer}>
                <Grid item xs={12}>
                 <div style={{display: "flex",
          flexDirection: "row",
          justifyContent: "space-between", alignItems: 'baseline',alignContent: 'stretch'}}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      align='center'
                    >
                      {postData.post_title}
                    </Typography>
                   <div style={{
            width: "10vw",
            display: "flex",
            justifyContent: "center",
          }}> 
          {/* <EditIcon onClick={handleEdit} align='right'/> */}
          <Button style={buttonStyle} onClick={handleEdit}>Edit</Button>
                    </div>
                   
                  </div>
      
                  <br />
                  {/* <EditIcon onClick={handleEdit} align='right'/> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
              
                    <GridList
                      className={classes.gridList}
                      cols={2.3}
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
                    </GridList>
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
                  </div>{" "}
                  <br /> <br />
                  {editFlag === false ? (
                    <Typography align="justify" fontFamily='Dancing Scripts'>
                      {parse(postData.post_description)}
                    </Typography>
                  ) : (
                    <Editor
                      apiKey="mkoaeakstug1m5gt3hpdotk40cnf5i678r19bxgls9hqqhgv"
                      initialValue={`<p>${postData.post_description}<p>`}
                      init={{
                        height: 400,
                        menubar: false,
                        statusbar: false,
                        width: 950,
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
                    />
                  )} <br/> <br/> <br/>
                  <div className='savebutton'>
                  <form onSubmit={handleUpdateSubmit} >
                    <button id='buttonstyle' type="submit" >Save</button>
                  </form>
                  </div>
                  
                  {/* <Button style={buttonStyle} type="submit" OnClick={handleUpdateSubmit}>
                    Save
                  </Button> */}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default EachAlbum;
