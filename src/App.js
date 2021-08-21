
import { useContext } from "react";
import Home from "./Home";
import Login from "./Login";
import Loginloding from "./Loginloding"
import {someContext} from "./App1"
import CreateAc from "./CreateAc";
import { Redirect } from "react-router-dom";
function App() {
  console.log(someContext)
  let props=useContext(someContext)
  console.log(props)
  return (
    <div className="App">
      
      {props.user?<Redirect to="/Home"></Redirect>:<Redirect to="/Login"></Redirect>
        }

    </div>
  );
}

export default App;
