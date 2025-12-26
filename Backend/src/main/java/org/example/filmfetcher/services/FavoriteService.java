package org.example.filmfetcher.services;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.example.filmfetcher.Exceptions.FavoriteExceptions;
import org.example.filmfetcher.entities.FavoriteMovie;
import org.example.filmfetcher.entities.UserEntity;
import org.example.filmfetcher.repository.FavoriteRepository;
import org.example.filmfetcher.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    @Value("${jwt.key}")
    private String SECRET_KEY;


    public void toggleFavorite(String username, Long movieId) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new FavoriteExceptions.ResourceNotFoundException("User '" + username + "' not found"));


        favoriteRepository.findByUserAndMovieId(user, movieId)
                .ifPresentOrElse(
                        fav -> favoriteRepository.delete(fav),
                        () -> favoriteRepository.save(FavoriteMovie.builder()
                                .user(user)
                                .movieId(movieId)
                                .build())
                );
    }

    public List<Long> getUserFavoriteIds(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return favoriteRepository.findByUser(user).stream()
                .map(FavoriteMovie::getMovieId)
                .toList();
    }

    public String getUsernameFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY.trim())
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            throw new FavoriteExceptions.InvalidTokenException("Session expired or invalid. Please log in again.");
        }
    }

    public boolean authenticateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(SECRET_KEY.trim())
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("JWT Verification Failed: " + e.getMessage());
            return false;
        }
    }
    public String extractUsernameFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new FavoriteExceptions.InvalidTokenException("Missing or malformed Authorization header.");
        }

        String token = authHeader.substring(7);

        if (!this.authenticateToken(token)) {
            throw new FavoriteExceptions.InvalidTokenException("Invalid or expired session.");
        }

        return this.getUsernameFromToken(token);
    }
}
