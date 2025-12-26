package org.example.filmfetcher.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.example.filmfetcher.Exceptions.AuthExceptions;
import org.example.filmfetcher.entities.UserEntity;
import org.example.filmfetcher.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Value("${jwt.key}")
    private String SECRET_KEY;
    @Value("${jwt.expiration}")
    private int EXPIRATION;
    private UserRepository userRepository;
    public UserService(UserRepository userRepository) {this.userRepository=userRepository;}

    public void registerUser(String username, String plainPassword, String email) {
        if (userRepository.existsByUsername(username)) {
            throw new AuthExceptions.DuplicateUsername("The username '" + username + "' is already in use.");
        }

        String hashedPassword = BCrypt.hashpw(plainPassword, BCrypt.gensalt());

        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setPasswordHash(hashedPassword);
        newUser.setEmail(email);

        userRepository.save(newUser);
    }

    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}

