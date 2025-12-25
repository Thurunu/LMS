package com.ascent.coursebuddybackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ascent.coursebuddybackend.config.RegistrationResponse;
import com.ascent.coursebuddybackend.entity.Users;
import com.ascent.coursebuddybackend.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    public RegistrationResponse register(Users user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Users savedUser = userRepo.save(user);
        
        // Generate token for the saved user
        String token = jwtService.generateToken(savedUser.getUsername(), savedUser.getRole());
        
        return new RegistrationResponse(
            savedUser.getUsername(),
            savedUser.getRole(),
            token,
            "User registered successfully"
        );
    }

    public String verify(Users user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if(authentication.isAuthenticated()) {
            // Get the actual user from database to get the role
            Users dbUser = userRepo.findByUsername(user.getUsername());
            return jwtService.generateToken(dbUser.getUsername(), dbUser.getRole());
        }
        else
            return "Invalid Credentials";
    }

    public Users getUserByUsername(String username) {
        if(username == null)
            throw new IllegalArgumentException("Username cannot be null");
        return userRepo.findByUsername(username);
    }
}