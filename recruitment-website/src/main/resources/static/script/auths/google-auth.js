// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

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

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    console.log('ID Token:', token);

    // Gửi token về backend
    await fetch('/verify-token', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
  }
}
