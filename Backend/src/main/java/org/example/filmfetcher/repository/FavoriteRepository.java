package org.example.filmfetcher.repository;

import org.example.filmfetcher.entities.FavoriteMovie;
import org.example.filmfetcher.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteMovie, Long> {
    List<FavoriteMovie> findByUser(UserEntity user);
    Optional<FavoriteMovie> findByUserAndMovieId(UserEntity user, Long movieId);
    void deleteByUserAndMovieId(UserEntity user, Long movieId);
}