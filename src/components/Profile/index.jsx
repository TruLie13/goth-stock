import { useState } from "react";
import axios from "axios";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth, googleSignIn, googleSignOut } from "../../service/auth";
import { baseUrl } from "../../config/goth-stock-api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");

  firebaseAuth.onAuthStateChanged(({ uid }) => {
    setUser(uid);
  });

  const updateDisplayName = async () => {
    const url = `${baseUrl}/profile/${user}/`;
    const body = { display_name: displayName };
    const res = await axios.put(url, body);
    if (res.status === 200) {
      window.location.reload();
    }
  };

  return (
    <div>
      <h2>Update Display Name</h2>
      <input
        placeholder="Display Name"
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
      />
      <button onClick={updateDisplayName}>Update</button>
    </div>
  );
};

export default Profile;
