// package com.example.recruitment_website.configs;


// import com.google.auth.oauth2.GoogleCredentials;
// import com.google.firebase.FirebaseApp;
// import com.google.firebase.FirebaseOptions;
// import jakarta.annotation.PostConstruct;
// import org.springframework.context.annotation.Configuration;

// import java.io.IOException;
// import java.io.InputStream;

// @Configuration
// public class FirebaseConfig {

//     @PostConstruct
//     public void initialize() throws IOException {
//         InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");

//         FirebaseOptions options = FirebaseOptions.builder()
//                 .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                 .build();

//         if (FirebaseApp.getApps().isEmpty()) {
//             FirebaseApp.initializeApp(options);
//         }
//     }
// }
