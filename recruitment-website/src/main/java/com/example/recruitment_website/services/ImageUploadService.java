package com.example.recruitment_website.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class ImageUploadService {

    // Thay YOUR_CLOUD_NAME, YOUR_API_KEY, YOUR_API_SECRET bằng thông tin tài khoản Cloudinary của bạn
    private static final Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
        "cloud_name", "douztlzs6",
        "api_key", "867496272771413",
        "api_secret", "QYIu80Nn32YorZ4zmIQZHt25X0g"
    ));

    public String uploadToCloudinary(MultipartFile file) {
        if (file.isEmpty()) {
            return null;
        }

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Lỗi upload ảnh lên Cloudinary", e);
        }
    }

    public String uploadPdfToCloudinary(MultipartFile file) {
        if (file.isEmpty()) {
            return null;
        }

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "raw" // phải là raw để Cloudinary xử lý PDF
            ));
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Lỗi upload PDF lên Cloudinary", e);
        }
    }
}