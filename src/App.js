import {} from "firebase/auth";
import "./App.css";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import FavoritesPage from "./Pages/FavoritesPage";

const RedirectRoute = () => {
  return <Navigate to="/" />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<RedirectRoute />} />
        </Routes>
      </BrowserRouter>
      {/* <Search /> */}
      {/* <Favorites /> */}
    </div>
  );
}

export default App;
