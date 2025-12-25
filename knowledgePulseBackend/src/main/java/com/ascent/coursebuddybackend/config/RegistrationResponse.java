package com.ascent.coursebuddybackend.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegistrationResponse {
    private String username;
    private String role;
    private String token;
    private String message;
    

}