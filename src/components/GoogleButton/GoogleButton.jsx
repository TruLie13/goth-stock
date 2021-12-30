import { useState } from "react";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth, googleSignIn, googleSignOut } from "../../service/auth";
import "../../App.css";
import styles from "./GoogleButton.css";

function GoogleButton() {
  const [user, setUser] = useState(null);

  firebaseAuth.onAuthStateChanged((user) => {
    setUser(user?.displayName);
  });

  const signOut = () => {
    googleSignOut();
  };

  const signIn = () => {
    googleSignIn();
  };

  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={signIn}>Google</button>
      )}
    </div>
  );
}
export default GoogleButton;
