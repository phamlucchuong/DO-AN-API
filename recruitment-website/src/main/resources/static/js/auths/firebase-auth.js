import { auth } from './firebase-config.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';




export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();

    console.log('Google ID Token:', token);

    await fetch('/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

  } catch (error) {
    console.error('Lỗi đăng nhập Google:', error);
  }
}

export async function loginWithEmailAndPassword(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const token = await user.getIdToken();

    console.log('Email/Password ID Token:', token);

    await fetch('/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

  } catch (error) {
    console.error('Lỗi đăng nhập Email/Password:', error.message);
  }
}
