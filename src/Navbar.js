import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { someContext } from "./App1";
import { auth, signInWithGoogle, firestore, storage } from "./firebase";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  let props = useContext(someContext);
  let location = useHistory();

  return (
    <>
      <div className="container">
        <NavLink
          exact
          activeClassName="activeLink"
          className="NavbarLink"
          to="./Newfeed"
        >
          New Feed
        </NavLink>
        <NavLink
          exact
          activeClassName="activeLink"
          className="NavbarLink"
          to="./Home"
        >
          {" "}
          Reels
        </NavLink>

        <NavLink
          exact
          activeClassName="activeLink"
          className="NavbarLink"
          to="./Profile"
        >
          Profile
        </NavLink>
        <button
          onClick={() => {
            auth.signOut();
            location.push("/login");
          }}
        >
          Logout
        </button>
        {props.user ? (
          <b style={{ color: "white", marginLeft: "8px" }}>
            {props.user.displayName === null
              ? props.user.email
              : props.user.displayName}
          </b>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Navbar;
