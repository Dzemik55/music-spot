package com.spotifyapi.musicspot.services;

import com.spotifyapi.musicspot.exceptions.UserNotFoundException;
import com.spotifyapi.musicspot.models.User;
import com.spotifyapi.musicspot.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByUsernameOrByEmail(String usernameOrEmail) {
        return userRepository.findByUsername(usernameOrEmail).or(() -> userRepository.findByEmail(usernameOrEmail)).orElseThrow(() -> new UserNotFoundException("User not found with username or email: " + usernameOrEmail));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) {
        return getUserByUsernameOrByEmail(usernameOrEmail);
    }
}
