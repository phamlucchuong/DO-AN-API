import { auth } from './firebase-config.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword
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
        window.location.href = role === 'Employee' ? '/index' : '/employer/dashboard';
      } else {
        alert('Xác thực thất bại!');
      }
    });

  } catch (error) {
    console.error('Lỗi đăng nhập Email/Password:', error.message);
  }
}


export async function registerWithEmailAndPassword(email, password, role) {
  try {
    const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    if (!userCredential) {
      throw new Error('Không nhận được userCredential từ Firebase');
    }
    const user = userCredential.user;
    if (!user) {
      throw new Error('Không tìm thấy user trong userCredential');
    }

    const token = await user.getIdToken();
    localStorage.setItem('idToken', token);

    console.log('Register ID Token:', token);

    const res = await fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, role }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error('Xác thực thất bại: ' + errorText);
    }
    return userCredential;
  } catch (error) {
    console.error('Lỗi đăng ký:', error.message);
    alert('Đăng ký thất bại (registerWithEmailAndPassword/firebase-auth.js): ' + error.message);
    throw error; // Ném lỗi để register.js xử lý
  }
}



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



export async function logout() {
  try {
    await signOut(auth);
    console.log('Đăng xuất thành công!');
    localStorage.removeItem('idToken'); // Xoá token nếu cần
    window.location.href = '/index'; // Redirect sau khi logout
  } catch (error) {
    console.error('firebase-auth.js-logout: Lỗi khi đăng xuất:', error.message);
  }
}