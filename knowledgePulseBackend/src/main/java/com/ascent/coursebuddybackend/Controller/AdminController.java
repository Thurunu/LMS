package com.ascent.coursebuddybackend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ascent.coursebuddybackend.entity.Users;
import com.ascent.coursebuddybackend.repository.UserRepo;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserRepo userRepo;
    
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");
            
            if (username == null || password == null) {
                return ResponseEntity.badRequest().body("Username and password are required");
            }

            // Check if user already exists
            Users existing = userRepo.findByUsername(username);
            if (existing != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User already exists with username: " + username);
            }

            // Create new admin user
            Users admin = new Users();
            admin.setUsername(username);
            admin.setPassword(encoder.encode(password));
            admin.setRole("ADMIN");

            userRepo.save(admin);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Admin user created successfully");
            response.put("username", username);
            response.put("role", "ADMIN");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating admin: " + e.getMessage());
        }
    }


    @GetMapping("/list-users")
    public ResponseEntity<?> listUsers() {
        try {
            List<Users> users = userRepo.findAll();
            List<Map<String, Object>> userList = users.stream().map(user -> {
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("id", user.getId());
                userMap.put("username", user.getUsername());
                userMap.put("role", user.getRole());
                return userMap;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(userList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error listing users: " + e.getMessage());
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String newPassword = request.get("password");

            if (username == null || newPassword == null) {
                return ResponseEntity.badRequest().body("Username and password are required");
            }

            Users user = userRepo.findByUsername(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found: " + username);
            }

            user.setPassword(encoder.encode(newPassword));
            userRepo.save(user);

            return ResponseEntity.ok("Password updated successfully for user: " + username);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating password: " + e.getMessage());
        }
    }
}
