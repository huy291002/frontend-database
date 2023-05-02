
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./main/Home";
import Login from "./main/Login";
import Createuser from "./main/Createuser"
export default function App() {
  return (
    <div className="home"> 
      <Router>  
        <Routes>
          <Route path ="/" element={<Login />} />
          <Route path ="/Home" element={<Home />} />
          <Route path = "/Createuser" element={<Createuser />} />
        </Routes>
      </Router>
  
    </div>
    
  );
}