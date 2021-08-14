
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { firestore } from "./firebase";
import{useState,useEffect} from "react"

import "./Profile.css";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";


function Otheruserphotos()
{


    let location=useLocation()
    console.log(location.state.otheruser)
 
    let [posts, setPosts] = useState([]);
 
    useEffect(() => {
      let f = async () => {
        await firestore.collection("newfeedposts").onSnapshot((querySnapshot) => {
          let tempArr = [];
  
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
             {
              if (location.state.otheruser.uid === doc.data().uid) {
                tempArr.push({
                  data: doc.data(),
                 
                });
                console.log("hiiiiiii")
              }
            }
          });
  
          setPosts(tempArr);
        });
      };
  
      f();
    }, []);
  
 
 
 console.log(posts)
 
     return(
         <>
      <Navbar/>
         <div className="prentPhoto">
           <img
             className="proPic"
             src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
           />
           <b className="proName">{location.state.otheruser.username}</b>
     
           <NavLink className="photosLink"  to={{pathname:"./otheruserprofile",state:{otheruser:location.state.otheruser}}}>
             reels
           </NavLink>
           <h3> photos : {posts.length}</h3>
           <NavLink className="reelsLink" to=""></NavLink>
     
           <div className="profileMainDiv">
             {posts.map((e) => {
               console.log(e.data);
               return (
                 <div className="profileReel">
                   <img controls className="vdoProfile" src={e.data.url}></img>
                 </div>
               );
             })}
           </div>
         </div> 
         </> 

     )

}
export default Otheruserphotos ;