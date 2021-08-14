
import {someContext} from "./App1";
import {useContext, useEffect,useState} from "react"
import { firestore } from "./firebase";
import "./Photos.css"
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function Photos()
{

    let props=useContext(someContext)
    console.log(props)
    let[posts,setPosts]=useState([]);



    useEffect(()=>{

        let f = async () => {
            await firestore.collection("newfeedposts").onSnapshot((querySnapshot) => {
              let tempArr = [];
      
              querySnapshot.forEach((doc) => {
                  console.log(doc.data());
                  if(props.user){
                  if(props.user.uid===doc.data().uid){
                tempArr.push({
                  
                  data: doc.data(),
                });
              }
            }
            
              });
      
              setPosts(tempArr);
            });
          };
      
          f();
     },[])
     

     return(
       <>
       <Navbar/>
        <div className="photosMainDiv">
        
        <img
          className="proPic"
          src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
        />
        {props.user ? (
          props.user.displayName !== null ? (
            <b>{props.user.displayName}</b>
          ) : (
            <b className="proName">{props.user.email}</b>
          )
        ) : (
          ""
        )}
  
        <NavLink className="photosLink" to="./Profile">
          Reels
        </NavLink>
        <h3> Photos: {posts.length}</h3>
        
  
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

export default Photos;