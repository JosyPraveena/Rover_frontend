import React,{useState,useEffect} from "react"
import Cookies from "js-cookie";
import Navbar from "./Navbar";

const UserAlbum = () =>{

    const [userProfile,setUserProfile] = useState(null)
    useEffect ( () =>{
        var myHeaders = new Headers();
        myHeaders.append("authorization", "Bearer " + Cookies.get("token"));
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8080/user/me", requestOptions)
          .then(response => response.json())
          .then(result => setUserProfile(result))
          .catch(error => console.log('error', error));
    },[])

    // console.log(userProfile)

return(
    <>
     <Navbar/>
     {userProfile && <h4>{userProfile.user_name}</h4>}
    <div className="user-album">
   
   {userProfile && 
   <>
  
  { userProfile.posts.map( album =>
  
  <div className="albums">
     <img alt={album.post_title} src={`http://localhost:8080${album.images[0].path}`}/>
   </div>)}
   </>
   }
    
    </div>
    
    
    </>
)
}

export default UserAlbum