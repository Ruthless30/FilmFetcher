package org.example.filmfetcher.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "favorite_movies")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long movieId;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;
}