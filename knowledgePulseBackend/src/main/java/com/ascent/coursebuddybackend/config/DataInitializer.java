package com.ascent.coursebuddybackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.ascent.coursebuddybackend.entity.Users;
import com.ascent.coursebuddybackend.repository.UserRepo;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepo userRepo;
    
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        Users existingAdmin = userRepo.findByUsername("admin@admin.com");
        if (existingAdmin == null) {
            Users admin = new Users();
            admin.setUsername("admin@admin.com");
            admin.setPassword(encoder.encode("admin123")); // Change this password!
            admin.setRole("ADMIN");
            userRepo.save(admin);

        } else {
            System.out.println("✓ Admin user already exists");
            System.out.println("  Username: " + existingAdmin.getUsername());
            System.out.println("  Role: " + existingAdmin.getRole());
            System.out.println("  If you forgot the password, delete this user from the database or reset it manually.");
        }
    }
}
