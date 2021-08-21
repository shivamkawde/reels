import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import CreateAc from "./CreateAc";
import Home from "./Home";
import Navbar from "./Navbar";
import Newfeed from "./Newfeed";
import { createContext } from "react";
import { useState } from "react";
import Profile from "./Profile"
import Photos from "./Photos"
import Otheruserprofile from "./Otheruserprofile"
import Otheruserphotos from "./Otheruserphotos"
export let someContext = createContext();
function App1() {
  let [user, setUser] = useState(null);
  let checkOnline = (user) => setUser(user);
  return (
    <>
      <Router>
        <Switch>
          <someContext.Provider
            value={{ user: user, checkOnline: checkOnline }}
          >
            <Route path="/CreateAc">
              <CreateAc/>
            </Route>
            <Route path="/Navbar">
              <Navbar/>
            </Route>
            <Route path="/Login">
              <Login />
            </Route> 

             <Route path="/Photos">
              <Photos/>
            </Route>

            <Route path="/Home">
              <Home></Home>
            </Route>
           

            <Route path="/Newfeed">
              <Newfeed/>
            </Route>


            <Route path="/Profile">
              <Profile/>
            </Route>
            <Route path="/Otheruserprofile">
              <Otheruserprofile/>
            </Route>
            <Route path="/Otheruserphotos">
              <Otheruserphotos/>
            </Route>
            

            <Route path="/">
              <App />
            </Route>
          </someContext.Provider>
        </Switch>
      </Router>
    </>
  );
}
export default App1;
// export { someContext };
