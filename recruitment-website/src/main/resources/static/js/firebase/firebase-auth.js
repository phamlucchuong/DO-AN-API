import { auth } from './firebase-config.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  // FacebookAuthProvider
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';

export async function loginWithGoogle(role) {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    localStorage.setItem('idToken', token);

    console.log('Google ID Token:', token);

    await fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, role }),
    }).then(res => {
      if (res.ok) {
        alert('Đăng nhập thành công!');
        window.location.href = '/index'; // hoặc bất kỳ trang nào bạn muốn chuyển đến
      } else {
        alert('Xác thực thất bại!');
      }
    });

  } catch (error) {
    console.error('Lỗi đăng nhập Google:', error);
  }
}


export async function loginWithEmailAndPwd(email, password, role) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const token = await user.getIdToken();
    localStorage.setItem('idToken', token);

    console.log('Email/Password ID Token:', token);

    await fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, role }),
    }).then(res => {
      if (res.ok) {
        alert('Đăng nhập thành công!');
        window.location.href = '/index'; // hoặc bất kỳ trang nào bạn muốn chuyển đến
      } else {
        alert('Xác thực thất bại!');
      }
    });

  } catch (error) {
    console.error('Lỗi đăng nhập Email/Password:', error.message);
  }
}

// function loginWithFacebook() {

// }


// export async function loginWithFacebook(role) {
//   const provider = new FacebookAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     const token = await user.getIdToken();

//     console.log('Facebook ID Token:', token);

//     await fetch('/api/auth/verify-token', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token }),
//     }).then(res => {
//       if (res.ok) {
//         alert('Đăng nhập Facebook thành công!');
//         window.location.href = '/index';
//       } else {
//         alert('Xác thực token thất bại!');
//       }
//     });

//   } catch (error) {
//     console.error('Lỗi đăng nhập Facebook:', error.message);
//   }
// }