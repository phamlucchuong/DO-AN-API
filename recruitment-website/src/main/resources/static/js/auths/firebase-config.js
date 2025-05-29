// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHs5AVN6MdMq8gLuznuFqH_aoPLo8V6a8",
  authDomain: "recruitment-website-b4d66.firebaseapp.com",
  projectId: "recruitment-website-b4d66",
  storageBucket: "recruitment-website-b4d66.firebasestorage.app",
  messagingSenderId: "63902630033",
  appId: "1:63902630033:web:a2565b6149ef031bfe3f30",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };