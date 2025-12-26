package org.example.filmfetcher.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Movie {
    private Long id;
    private String original_title;
    private String overview;
    private String release_date;
    private Float vote_average;
    private String poster_path;
}
