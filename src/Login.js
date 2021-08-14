import React, { useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "./firebase";
import { someContext } from "./App1";
import { useEffect } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
function Login() {
  let props = useContext(someContext);
  console.log(props);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);

      if (user) {
        console.log(user);
        let { displayName, email, uid } = user;
        props.checkOnline({ displayName, email, uid });
      } else {
        props.checkOnline(user);
      }
    });
  });

  function usernamePwLogin() {
    let u = document.querySelector(".username").value;
    let p = document.querySelector(".password").value;
    console.log(u);
    auth
      .signInWithEmailAndPassword(u, p)
      .then(() => {
        console.log("done");
      })
      .catch(() => {
        alert("wrong password");
      });
  }

  return (
    <>
      <div className="LoginContainer">
        <img
          className="instaLogo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyUXT8IpVkv4h6j9lSirVqC0bfJRhObw2q-WjJGzB_0hGXNbrVmsH8bQChHZWWz1fOH4&usqp=CAU"
        />
        <input type="text" className="username"></input>
        <input type="password" className="password"></input>
        <button className="login-btn" onClick={usernamePwLogin}>
          Login
        </button>
        <h3 className="or">or</h3>
        <button className="login-google" onClick={signInWithGoogle}>
          Login With Google
        </button>
      </div>
      <div className="createAc">
        <Link to="./CreateAc">Create Account</Link>
      </div>
      <h3>For Testing Username- test123@test.com</h3>
      <h3>Password-123456</h3>
    </>
  );
}
export default Login;
