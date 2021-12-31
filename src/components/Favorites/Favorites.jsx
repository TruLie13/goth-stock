import { useEffect, useState } from "react";
import axios from "axios";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth } from "../../service/auth";
import styles from "./Favorites.css";
import { baseUrl } from "../../config/goth-stock-api";
import {
  Button,
  Card,
  CardMedia,
  CardActions,
  Container,
  Grid,
} from "@mui/material";

const Favorites = () => {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        setUser(uid);
        const url = `${baseUrl}/favorite/${uid}`;
        axios.get(url).then((res) => {
          if (res.status === 200) {
            setList(res.data.favorites);
          }
        });
      }
    });
  }, []);

  const remove = (id) => {
    const url = `${baseUrl}/favorite/${user}/`;
    const data = { id };
    axios
      .delete(url, { data })
      .then((res) => {
        if (res.status === 200) {
          setList(list.filter((item) => item.id !== id));
        }
      })
      .catch((e) => console.log(e.error));
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {list.map((item) => (
          <Grid key={item.id} item xs={12} sm={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.photo_id}
                alt="green iguana"
              />
              <CardActions>
                <Button size="small" onClick={() => remove(item.id)}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
