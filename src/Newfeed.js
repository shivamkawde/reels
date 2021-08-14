import "./Newfeed.css";
import { auth, signInWithGoogle, firestore, storage } from "./firebase";
import Newfeedcard from "./Newfeedcard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { someContext } from "./App1";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
function Newfeed() {
  let location = useHistory();

  let [posts, setPosts] = useState([]);
  let[Loding,setLoding]=useState(false);

  useEffect(() => {
    firestore.collection("newfeedposts").onSnapshot((querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setPosts(arr);
    });
  }, []);

  let props = useContext(someContext);

  return (
    <div>
     
      
      <div className="posts-container">
    {Loding?  <h1 className="wait">Uploding..........</h1>:
        posts.map((post, index) => {
          console.log(post.url);
          return <Newfeedcard key={index} post={post} className="vdocard" />;
        })}
       
        <input
          type="file"
          className="upload"
          onClick={(e) => {
            e.target.value = null;
          }}
          onChange={(e) => {
            let { name, size, type } = e.target.files[0];
            if (!e.target.files[0]) return;
            let file = e.target.files[0];

            console.log(e);
            size = size / 1000000;
            console.log(size)
            type = type.split("/")[0];
            console.log(type)

            if (type ==="video") {
              alert("file is not Image");
            } else if (size > 30) {
              alert("file is too big");
            } else {
              if (!e.target.files[0]) return;
              let f1 = (snapshot) => {
                console.log(snapshot.bytesTransferred);
                if ((snapshot.bytesTransferred !== size*1000000) )
                 setLoding(true) ;
                 if(snapshot.bytesTransferred === size*1000000)
                 {
                   setLoding(false)
                 }
              };
              let f2 = (error) => {
                console.log(error);
              };
              let f3 = () => {
                uploadtask.snapshot.ref.getDownloadURL().then((url) => {
                  console.log(url);

                  firestore.collection("newfeedposts").add({
                    username: props.user.displayName
                      ? props.user.displayName
                      : props.user.email,
                    url,
                    uid:props.user.uid,
                    likes: 0,
                    comments: [],
                  });
                });
              };

              let uploadtask = storage
                .ref(`/newfeedposts/${props.user.uid}/${Date.now()}${name}`)
                .put(file);
              uploadtask.on("state_changed", f1, f2, f3);
            }
          }}
        />
      
      </div>
      
      
      
      <Navbar />
    </div>
  );
}
export default Newfeed;
