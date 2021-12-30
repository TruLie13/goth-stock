import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMwcuLTNQ4rPjfcJ7S1gyuzSiTaojGFEI",
  authDomain: "slick-stock.firebaseapp.com",
  projectId: "slick-stock",
  storageBucket: "slick-stock.appspot.com",
  messagingSenderId: "848105588878",
  appId: "1:848105588878:web:17d8f36e81ecc386dfa1df",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
