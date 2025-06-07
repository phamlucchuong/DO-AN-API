package com.example.recruitment_website.restcontrollers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.repositories.AccountRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    private AccountRepository accountRepository;

    // @PostMapping("/verify-token")
    // public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> body) {
    //     try {
    //         String token = body.get("token");
    //         String role = body.get("role"); // mặc định USER nếu không có
    //         FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
    //         String uid = decodedToken.getUid();
    //         String email = decodedToken.getEmail();
    //         String img = decodedToken.getPicture();
    //         // Nếu account chưa tồn tại thì tạo
    //         if (!accountRepository.existsById(uid)) {
    //             AccountEntity account = new AccountEntity();
    //             account.setUid(uid);
    //             account.setEmail(email);
    //             account.setRole(role);
    //             account.setIsDeleted(false);
    //             accountRepository.save(account);
    //         }
    //         return ResponseEntity.ok(Map.of("uid", uid, "email", email, "avatarURL", img, "role", role));
    //     } catch (FirebaseAuthException e) {
    //         e.printStackTrace();
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    //     }
    // }
    @PostMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> body) {
        try {
            String token = body.get("token");
            String role = body.get("role");
            if (token == null || token.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thiếu token");
            }
            if (role == null || role.isEmpty()) {
                role = "Employee";
            }

            System.out.println("Verify token: " + token);
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);

            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String img = decodedToken.getPicture() != null ? decodedToken.getPicture() : "";

            System.out.println("Decoded uid: " + uid);

            if (!accountRepository.existsById(uid)) {
                AccountEntity account = new AccountEntity();
                account.setUid(uid);
                account.setEmail(email);
                account.setRole(role);
                account.setIsDeleted(false);
                accountRepository.save(account);
                System.out.println("Lưu tài khoản thành công: " + uid);
            } else {
                System.out.println("Tài khoản đã tồn tại: " + uid);
            }

            return ResponseEntity.ok(Map.of("uid", uid, "email", email, "avatarURL", img, "role", role));
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }

}
