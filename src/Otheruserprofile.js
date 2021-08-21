import { useHistory, useLocation } from "react-router-dom";
import { firestore } from "./firebase";
import { useState, useEffect, useContext } from "react";
import { someContext } from "./App1";

import "./Profile.css";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function Otheruserprofile() {
  let location = useLocation();
  let props = useContext(someContext);
  console.log(props);
  console.log(location.state.otheruser);
  let [chatBox, setChatbox] = useState(false);
  let [message, setMessage] = useState("");
  let [posts, setPosts] = useState([]);
  let [uiMessage, setUiMessage] = useState([]);

  useEffect(() => {
    let f = async () => {
      await firestore.collection("posts").onSnapshot((querySnapshot) => {
        let tempArr = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          {
            if (location.state.otheruser.uid === doc.data().uid) {
              tempArr.push({
                data: doc.data(),
              });
              console.log("hiiiiiii");
            }
          }
        });

        setPosts(tempArr);
      });
    };

    f();
  }, []);

  useEffect(() => {
    let f = async () => {
      await firestore
        .collection("messages")
        .orderBy("time")
        .onSnapshot((querySnapshot) => {
          let tempArr = [];

          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            if (props.user) {
              if (
                (location.state.otheruser.uid === doc.data().receverid &&
                  props.user.uid === doc.data().senderid) ||
                (location.state.otheruser.uid === doc.data().senderid &&
                  props.user.uid === doc.data().receverid)
              ) {
                tempArr.push({
                  data: doc.data(),
                });
                console.log("hiiiiiii222222");
              }
            }
          });

          setUiMessage(tempArr);
        });
    };

    f();
  }, []);

  console.log(posts);
  console.log(uiMessage);

  return (
    <>
      <Navbar />
      <div className="prentPhoto">
        <img
          className="proPic"
          src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
        />
        <b className="proName">{location.state.otheruser.username}</b>

        <NavLink
          className="photosLink"
          to={{
            pathname: "./otheruserphotos",
            state: { otheruser: location.state.otheruser },
          }}
        >
          Photos
        </NavLink>
        <b
          style={{ color: "blue" }}
          onClick={() => {
            if (chatBox) {
              setChatbox(false);
            } else {
              setChatbox(true);
            }
          }}
        >
          Message
        </b>

        {chatBox ? (
          <div className="messageBox">
            <button
              onClick={() => {
                setChatbox(false);
              }}
            >
              close
            </button>
            {uiMessage.map((e) => {
              {
                console.log(e.data.message);
              }
              return (
                <div>
                  {/* <b>{e.data.receverusername}</b><br/> */}
                  <b className="">{e.data.senderusername}</b>
                  <p className="">{e.data.message}</p>
                </div>
              );
            })}

            <input
              className="mezSendbox"
              type="text"
              onChange={(e) => {
                setMessage(e.currentTarget.value);
              }}
            />
            <button
              className="sendBtn"
              onClick={() => {
                firestore.collection("messages").add({
                  senderid: props.user.uid,
                  senderusername:
                    props.user.displayName === null
                      ? props.user.email
                      : props.user.displayName,
                  receverid: location.state.otheruser.uid,
                  receverusername: location.state.otheruser.username,
                  message: message,
                  time: new Date().toLocaleTimeString(),
                });
              }}
            >
              send
            </button>
          </div>
        ) : (
          ""
        )}

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
export default Otheruserprofile;
