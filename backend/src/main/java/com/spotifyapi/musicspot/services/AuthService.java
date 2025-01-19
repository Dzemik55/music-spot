package com.spotifyapi.musicspot.services;

import com.spotifyapi.musicspot.models.User;
import com.spotifyapi.musicspot.models.dtos.SignUpRequest;
import org.apache.hc.client5.http.auth.InvalidCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public User newUserFromSignUpRequest(SignUpRequest signUpRequest) {
        return mapSignUpRequestToUser(signUpRequest);
    }

    public boolean userExistsByUsername(String username) {
        return userService.existsByUsername(username);
    }

    public boolean userExistsByEmail(String email) {
        return userService.existsByEmail(email);
    }

    public User validCredentials(String usernameOrEmail, String password) throws InvalidCredentialsException {
        User existingUser = userService.getUserByUsernameOrByEmail(usernameOrEmail);
        if (passwordEncoder.matches(password, existingUser.getPassword())) {
            return existingUser;
        }
        throw new InvalidCredentialsException();
    }

    private User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        return user;
    }
}
