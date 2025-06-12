import { loginWithEmailAndPwd } from "../firebase/firebase-auth.js";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      window.alert("Vui lòng nhập email và mật khẩu.");
      return;
    }

    try {
      const userCredential = await loginWithEmailAndPwd(
        email,
        password,
        "Admin"
      );
      console.log("User Credential:", userCredential);
      const user = userCredential.user;
      if (!user) {
        throw new Error("Không tìm thấy user trong userCredential");
      }
      console.log("Đăng nhập thành công:");
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  }
);
