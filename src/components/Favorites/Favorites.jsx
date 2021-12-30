import { useEffect, useState } from "react";
import axios from "axios";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth } from "../../service/auth";
import styles from "./Favorites.css";
import { baseUrl } from "../../config/goth-stock-api";

const Favorites = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        const url = `${baseUrl}/favorite/${uid}`;
        axios.get(url).then((res) => {
          if (res.status === 200) {
            setList(res.data.favorites);
          }
        });
      }
    });
  }, []);

  return (
    <>
      {list.map((item) => (
        <img key={item.id} alt="" src={item.photo_id} />
      ))}
    </>
  );
};

export default Favorites;
