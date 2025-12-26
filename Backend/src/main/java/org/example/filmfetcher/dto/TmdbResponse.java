package org.example.filmfetcher.dto;

import lombok.Data;
import org.example.filmfetcher.entities.Movie;

import java.util.List;

@Data
public class TmdbResponse {
    private List<Movie> results;
}
