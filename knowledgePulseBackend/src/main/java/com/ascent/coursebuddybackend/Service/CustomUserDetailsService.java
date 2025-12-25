package com.ascent.coursebuddybackend.Service;

import com.ascent.coursebuddybackend.entity.CustomUserDetails;
import com.ascent.coursebuddybackend.entity.Users;
import com.ascent.coursebuddybackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = userRepo.findByUsername(username);
        System.out.println("Username: " + username);

        if(user == null) {
            System.out.println("Üser not found");
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return new CustomUserDetails(user);
    }
}
