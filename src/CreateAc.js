import { useRef } from "react";
import { auth } from "./firebase";
import "./Login.css";
import { someContext } from "./App1";
import { useContext } from "react/cjs/react.development";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function CreateAc() {
  let usehistory = useHistory();
  let [username, setUsername] = useState(null);
  let props = useContext(someContext);
  console.log(props);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function signIn() {
    console.log("aa");

    auth
      .createUserWithEmailAndPassword(
        usernameRef.current.value,
        passwordRef.current.value
      )
      .then((user) =>
        //setUsername(user)
        console.log(user)
      );
    usehistory.push({
      pathname: "./App",
    });
  }

  return (
    <div>
      <div className="LoginContainer">
        <img
          className="instaLogo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyUXT8IpVkv4h6j9lSirVqC0bfJRhObw2q-WjJGzB_0hGXNbrVmsH8bQChHZWWz1fOH4&usqp=CAU"
        />
        <input
          type="email"
          ref={usernameRef}
          className="username"
          placeholder="Create Username"
        ></input>
        <input
          type="password"
          ref={passwordRef}
          className="password"
          placeholder="Create Password"
        ></input>
        <button className="login-btn" onClick={signIn}>
          Create
        </button>
      </div>
      <h3>Password length must be 6 letter</h3>
      <h3> Username format xyz@xyz.com</h3>
    </div>
  );
}
export default CreateAc;
