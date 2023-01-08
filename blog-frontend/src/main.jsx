import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc8Yue2X2pC-w2OGvrVbN6AdGcx8CzM_E",
  authDomain: "full-stack-blog-b0bb6.firebaseapp.com",
  projectId: "full-stack-blog-b0bb6",
  storageBucket: "full-stack-blog-b0bb6.appspot.com",
  messagingSenderId: "1043830273191",
  appId: "1:1043830273191:web:9e3caa5f6fd09cd7d51782",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
