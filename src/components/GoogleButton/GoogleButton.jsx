import { useEffect, useState } from "react";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth, googleSignIn, googleSignOut } from "../../service/auth";
import "./GoogleButton.css";
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

  firebaseAuth.onAuthStateChanged((user) => {
    setUser(user?.uid);
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
    await axios.post(url, body).catch(() => {});
  };

  return (
    <div>
      {user ? (
        <div className="googleNav">
          <Link to="/favorites">Favorites</Link>
          <div className="dropdown-menu">
            <button className="menu-btn">{displayName}</button>
            <div className="menu-content">
              <Profile />
              <button className="googleButton menu-btn" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button className="googleButton menu-btn" onClick={signIn}>
          Sign In
        </button>
      )}
    </div>
  );
}
export default GoogleButton;
