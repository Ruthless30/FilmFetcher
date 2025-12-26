package org.example.filmfetcher.controllers;


import org.example.filmfetcher.dto.MovieCardDTO;
import org.example.filmfetcher.dto.MovieDetailsDTO;
import org.example.filmfetcher.services.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController( MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/popular")
    public List<MovieCardDTO> getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/top")
    public List<MovieCardDTO> getTopRatedMovies() {
        return movieService.getTopRatedMovies();
    }

    @GetMapping("/upcoming")
    public List<MovieCardDTO> getUpcomingMovies() {
        return movieService.getUpcomingMovies();
    }

    @GetMapping("/{id}")
    public MovieDetailsDTO getMovie(@PathVariable String id) {
        return movieService.getMovieDetails(id);
    }

    @GetMapping("/search")
    public List<MovieCardDTO> getMovieByQuery(@RequestParam("query") String query) {return movieService.getMovieByQuery(query);}
}
