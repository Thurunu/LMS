package com.ascent.coursebuddybackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ascent.coursebuddybackend.Service.UserService;
import com.ascent.coursebuddybackend.config.RegistrationResponse;
import com.ascent.coursebuddybackend.entity.Users;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody Users user) {
        RegistrationResponse response = userService.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        try {
            String token = userService.verify(user);
            if ("Invalid Credentials".equals(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new RegistrationResponse(null, null, null, "Invalid Credentials"));
            }
            // Return consistent response format with token
            RegistrationResponse response = new RegistrationResponse(
                user.getUsername(),
                userService.getUserByUsername(user.getUsername()).getRole(),
                token,
                "Login successful"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RegistrationResponse(null, null, null, "Login failed: " + e.getMessage()));
        }
    }


}
