import { useState, useEffect } from "react";
import "./Videocard.css";

import { someContext } from "./App1";
import { useContext } from "react";
import { storage, firestore } from "./firebase";
import { useHistory } from "react-router-dom";
function Videocard(p) {
  let location = useHistory();
  let [boxOpen, setBoxOpen] = useState(false);
  let [currentUserComment, setCurrentUserComment] = useState("");
  let [allComments, setAllComments] = useState([]);
  let [playing, setPlaying] = useState(false);
  let [like, setLike] = useState(false);
  let props = useContext(someContext);

  useEffect(() => {
    let f = async () => {
      let allCommentId = p.post.comments;
      let arr = [];

      for (let i = 0; i < allCommentId.length; i++) {
        let id = allCommentId[i];
        console.log(id);

        let doc = await firestore.collection("comments").doc(id).get();
        console.log(doc);
        let commentData = { ...doc.data(), id: doc.id };
        arr.push(commentData);
      }

      setAllComments(arr);
    };

    f();
  }, [p]);

  return (
    <div className="video-container">
      <div className="post">
        <img
          style={{
            height: "5%",
            width: "13%",
            position: "absolute",
            left: "0rem",
            top: "-2rem",
          }}
          src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
        />

        <b
          className="Linkusername"
          onClick={() => {
            console.log(p.post);
            location.push({
              pathname: "./Otheruserprofile",
              state: { otheruser: p.post },
            });
          }}
        >
          {p.post.username}
        </b>

        <video
          controls
          className="video"
          src={p.post.url}
          onClick={(e) => {
            if (playing) {
              setPlaying(false);
              e.currentTarget.pause();
            } else {
              setPlaying(true);
              e.currentTarget.play();
            }
          }}
        ></video>
        <div className="likeCmt">
          <p className="usenameReel"></p>
          <p className="song">
            <marquee></marquee>
          </p>
          <div className="likeIcon">
            <span
              class="material-icons-outlined"
              onClick={() => {
                console.log(p.post);
                if (!like) {
                  firestore
                    .collection("posts")
                    .doc(p.post.id)
                    .update({ likes: p.post.likes + 1 });
                  setLike(true);
                }
              }}
            >
              favorite_border
            </span>
            {p.post.likes}
          </div>

          <div
            className="cmtIcon"
            onClick={() => {
              setBoxOpen(true);
            }}
          >
            <span class="material-icons-outlined">chat_bubble_outline</span>
          </div>
        </div>
       

        {boxOpen ? (
          <div className="cmtBox">
            <button
              onClick={() => {
                if (boxOpen) {
                  setBoxOpen(false);
                } else {
                  setBoxOpen(true);
                }
              }}
            >
              close
            </button>

            {allComments.map((e, index) => {
              return (
                <div>
                  <img
                    className="profileImage"
                    src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                  ></img>
                  <b key={index}>{e.username}</b>
                  <p>{e.comment}</p>
                </div>
              );
            })}
            <input
              value={currentUserComment}
              className="cmtInput"
              type="text"
              placeholder="Post Comment"
              onChange={(e) => {
                setCurrentUserComment(e.currentTarget.value);
                console.log(e.currentTarget.value);
              }}
            ></input>

            {/* p=this for post context Api props for post
            props=this is for user  */}
            <button
              className="cmtPostBtn"
              onClick={() => {
                let PromiseOfcmomment = firestore.collection("comments").add({
                  comment: currentUserComment,
                  username:
                    props.user.displayName === null
                      ? props.user.email
                      : props.user.displayName,
                });

                setCurrentUserComment("");

                PromiseOfcmomment.then((docRef) => {
                  return docRef.get();
                }).then((doc) => {
                  firestore
                    .collection("posts")
                    .doc(p.post.id)
                    .update({
                      comments: [...p.post.comments, doc.id],
                    });
                });
              }}
            >
              post
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Videocard;
