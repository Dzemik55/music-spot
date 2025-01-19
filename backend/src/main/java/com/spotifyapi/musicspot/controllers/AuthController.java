package com.spotifyapi.musicspot.controllers;

import com.spotifyapi.musicspot.exceptions.UserAlreadyExistsException;
import com.spotifyapi.musicspot.models.User;
import com.spotifyapi.musicspot.models.dtos.AuthResponse;
import com.spotifyapi.musicspot.models.dtos.LoginRequest;
import com.spotifyapi.musicspot.models.dtos.SignUpRequest;
import com.spotifyapi.musicspot.services.AuthService;
import com.spotifyapi.musicspot.services.UserService;
import jakarta.validation.Valid;
import org.apache.hc.client5.http.auth.InvalidCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<AuthResponse> signUp(@Valid @RequestBody SignUpRequest request) {

        if (authService.userExistsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException(String.format("User with email %s already exists", request.getEmail()));
        }

        if (authService.userExistsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException(String.format("User with username %s already exists", request.getUsername()));
        }

        User user = userService.createUser(authService.newUserFromSignUpRequest(request));

        AuthResponse authResponse = new AuthResponse(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) throws InvalidCredentialsException {
        User user = authService.validCredentials(loginRequest.getUsernameOrEmail(), loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok(new AuthResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getName(),
                    user.getEmail()
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
