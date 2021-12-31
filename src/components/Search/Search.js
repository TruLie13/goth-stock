import axios from "axios";
import "../../App.css";
import {} from "firebase/auth";
import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import {} from "firebase/auth";
import firebaseApp from "../../config/firebase-config";
import { firebaseAuth } from "../../service/auth";
import "./Search.css";
import { baseUrl } from "../../config/goth-stock-api";
import { Snackbar } from "@mui/material";

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "Z6P4P2mmqMaHaHkHCPXzxA8lNDACWrd7crnXuDFaORk",
});

const PhotoComp = ({ photo, uid }) => {
  const { urls } = photo;

  const saveImage = (url) => {
    const saveUrl = `${baseUrl}/favorite/${uid}/`;
    axios.post(saveUrl, { photo_id: url }).then(() => {
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Added to Favorites"
      />
      <img
        className="img"
        alt=""
        src={urls.regular}
        onDoubleClick={() => saveImage(urls.regular)}
      />
    </Fragment>
  );
};

const Body = () => {
  const [uid, setUid] = useState(null);
  const [data, setPhotosResponse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        setUid(uid);
      }
    });
  }, []);

  const search = (event) => {
    event.preventDefault();

    api.search
      .getPhotos({
        query: `${searchTerm}`,
        orientation: "landscape",
        color: "black_and_white",
      })
      .then((result) => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  };

  const updateSearchTerm = (event) => {
    setSearchTerm(event?.target?.value);
  };

  return (
    <div>
      <div>
        <form onSubmit={search}>
          <input
            className="searchInput"
            autoComplete="off"
            name="searchTerm"
            placeholder="Search for Images"
            onChange={updateSearchTerm}
            value={searchTerm}
          />
        </form>
        {/* <button onClick={search}>Search</button> */}
      </div>
      {data ? (
        <div className="feed">
          <div className="columnUl">
            {data.response.results.map((photo) => (
              <div key={photo.id} className="li">
                <PhotoComp photo={photo} uid={uid} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

function App() {
  return (
    <main className="root">
      <Body />
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
