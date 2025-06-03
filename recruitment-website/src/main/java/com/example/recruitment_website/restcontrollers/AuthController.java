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
public class AuthController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> body) {
        try {
            String token = body.get("token");
            String role = body.get("role"); // mặc định USER nếu không có

            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();

            // Nếu account chưa tồn tại thì tạo
            if (!accountRepository.existsById(uid)) {
                AccountEntity account = new AccountEntity();
                account.setUid(uid);
                account.setEmail(email);
                account.setRole(role);
                account.setIsDeleted(false);

                accountRepository.save(account);
            }

            return ResponseEntity.ok(Map.of("uid", uid, "email", email, "role", role));
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

}
