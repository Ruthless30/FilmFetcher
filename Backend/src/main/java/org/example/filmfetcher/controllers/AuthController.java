package org.example.filmfetcher.controllers;

import org.example.filmfetcher.Exceptions.AuthExceptions;
import org.example.filmfetcher.dto.LoginRequest;
import org.example.filmfetcher.dto.RegisterRequest;
import org.example.filmfetcher.entities.UserEntity;
import org.example.filmfetcher.repository.UserRepository;
import org.example.filmfetcher.services.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {


    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        UserEntity user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new AuthExceptions.InvalidCredentials("Invalid username or password."));

        if (!BCrypt.checkpw(request.password(), user.getPasswordHash())) {
            throw new AuthExceptions.InvalidCredentials("Invalid username or password.");
        }

        String token = userService.generateToken(user.getUsername());

        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.registerUser(request.username(), request.password(), request.email());
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

}
