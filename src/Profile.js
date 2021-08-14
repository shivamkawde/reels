import { someContext } from "./App1";
import { useContext, useEffect, useState } from "react";
import { firestore } from "./firebase";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
function Profile() {
  let props = useContext(someContext);
  console.log(props);
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    let f = async () => {
      await firestore.collection("posts").onSnapshot((querySnapshot) => {
        let tempArr = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          if (props.user) {
            if (props.user.uid === doc.data().uid) {
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
  }, []);

  console.log(posts);
  return (
    <>
    <Navbar/>
    <div className="prentPhoto">
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
     

      <NavLink className="photosLink" to="./photos">
        Photos
      </NavLink>
      <h3> reels : {posts.length}</h3>
      <NavLink className="reelsLink" to=""></NavLink>

      <div className="profileMainDiv">
        {posts.map((e) => {
          console.log(e.data);
          return (
            <div className="profileReel">
              <video controls className="vdoProfile" src={e.data.url}></video>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
export default Profile;
