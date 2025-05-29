// Import các module cần thiết từ Firebase CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHs5AVN6MdMq8gLuznuFqH_aoPLo8V6a8",
  authDomain: "recruitment-website-b4d66.firebaseapp.com",
  projectId: "recruitment-website-b4d66",
  storageBucket: "recruitment-website-b4d66.firebasestorage.app",
  messagingSenderId: "63902630033",
  appId: "1:63902630033:web:a2565b6149ef031bfe3f30",
  measurementId: "G-6HM4WQ70G8"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo auth
export const auth = getAuth(app);
