import { useEffect, useState } from "react";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth, googleSignIn, googleSignOut } from "../../service/auth";
import "../../App.css";
import styles from "./GoogleButton.css";
import { baseUrl } from "../../config/goth-stock-api";
import axios from "axios";

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
        <div>
          <span style={{ margin: "0 8px" }}>{displayName}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signIn}>Google</button>
      )}
    </div>
  );
}
export default GoogleButton;
