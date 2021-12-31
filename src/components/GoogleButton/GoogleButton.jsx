import { useEffect, useState } from "react";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth, googleSignIn, googleSignOut } from "../../service/auth";
import "./GoogleButton.css";
import "../../App.css";
import { baseUrl } from "../../config/goth-stock-api";
import axios from "axios";
import { Link } from "react-router-dom";
import Profile from "../Profile";

function GoogleButton() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    fetchDisplayName(user);
  }, [user]);

  firebaseAuth.onAuthStateChanged(({ uid }) => {
    setUser(uid);
  });

  const fetchDisplayName = async (uid) => {
    if (!uid) {
      return;
    }
    const url = `${baseUrl}/profile/${uid}/`;
    const res = await axios.get(url);
    if (res.status === 200) {
      setDisplayName(res.data.display_name);
    }
  };

  const signOut = () => {
    googleSignOut();
  };

  const signIn = async () => {
    const { displayName, uid } = await googleSignIn();
    const url = `${baseUrl}/profile/${uid}/`;
    const body = { display_name: displayName };
    await axios.post(url, body);
  };

  return (
    <div>
      {user ? (
        <div className="googleNav">
          <Link to="/favorites">Favorites</Link>
          <div class="dropdown-menu">
            <button class="menu-btn">{displayName}</button>
            <div class="menu-content">
              <Profile />
            </div>
          </div>
          <button className="googleButton" onClick={signOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <button className="googleButton" onClick={signIn}>
          Sign In
        </button>
      )}
    </div>
  );
}
export default GoogleButton;
