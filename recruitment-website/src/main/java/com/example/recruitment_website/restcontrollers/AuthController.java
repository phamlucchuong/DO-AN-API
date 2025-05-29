package com.example.recruitment_website.restcontrollers;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.Map;

@RestController
public class AuthController {

    @PostMapping("/verify-token")
    public ResponseEntity<String> verifyToken(@RequestBody Map<String, String> body, HttpSession session) {
        String idToken = body.get("token");

        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();

            // Lưu thông tin vào session hoặc DB tuỳ anh
            session.setAttribute("uid", uid);
            session.setAttribute("email", email);

            return ResponseEntity.ok("Xác thực thành công");
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực thất bại");
        }
    }
}
