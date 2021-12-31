import { Link } from "react-router-dom";
import GoogleButton from "../GoogleButton";
import "./Navbar.css";

const Navbar = () => (
  <div className="nav-bar">
    <div className="nav-body">
      <div className="links">
        <Link to="/">Goth Stock</Link>
      </div>
      <div>
        <GoogleButton />
      </div>
    </div>
  </div>
);
export default Navbar;
