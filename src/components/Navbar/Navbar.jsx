import { Link } from "react-router-dom";
import GoogleButton from "../GoogleButton";
import "./Navbar.css";

const Navbar = () => (
  <div className="nav-bar">
    <div className="nav-body">
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
      <GoogleButton />
    </div>
  </div>
);
export default Navbar;
