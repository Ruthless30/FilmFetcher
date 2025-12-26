package org.example.filmfetcher.controllers;


import lombok.RequiredArgsConstructor;
import org.example.filmfetcher.services.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/toggle/{movieId}")
    public ResponseEntity<Void> toggleFavorite(
            @PathVariable Long movieId,
            @RequestHeader("Authorization") String authHeader) {

        String username = favoriteService.extractUsernameFromHeader(authHeader);

        favoriteService.toggleFavorite(username, movieId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-list")
    public ResponseEntity<List<Long>> getMyFavorites(@RequestHeader("Authorization") String authHeader) {
        String username = favoriteService.extractUsernameFromHeader(authHeader);
        List<Long> favoriteIds = favoriteService.getUserFavoriteIds(username);

        return ResponseEntity.ok(favoriteIds);
    }


}
