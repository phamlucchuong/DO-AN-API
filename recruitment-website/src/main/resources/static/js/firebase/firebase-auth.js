import { auth } from './firebase-config.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';


// hàm đăng nhập bằng tài khoản gg
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
    }).then(async res => {
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('uid', data.uid);
        localStorage.setItem('email', data.email);
        localStorage.setItem('avatarURL', data.avatarURL);
        localStorage.setItem('role', data.role);
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



// hàm đăng nhập email pwd 
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
    }).then(async res => {
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('uid', data.uid);
        localStorage.setItem('email', data.email);
        localStorage.setItem('avatarURL', data.avatarURL);
        localStorage.setItem('role', data.role);
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


// hàm đăng ký email password
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
    }).then()

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


// hàm đăng xuất
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


// Hàm quên mật khẩu
export async function forgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư đến.');
  } catch (error) {
    console.error('Lỗi khi gửi email đặt lại mật khẩu:', error.message);
    if (error.code === 'auth/user-not-found') {
      alert('Không tìm thấy người dùng với email này.');
    } else if (error.code === 'auth/invalid-email') {
      alert('Email không hợp lệ.');
    } else {
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  }
}