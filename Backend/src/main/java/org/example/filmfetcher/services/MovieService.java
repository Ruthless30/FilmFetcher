package org.example.filmfetcher.services;

import org.example.filmfetcher.client.MovieClient;
import org.example.filmfetcher.dto.Credits;
import org.example.filmfetcher.dto.MovieCardDTO;
import org.example.filmfetcher.dto.MovieDetailsDTO;
import org.example.filmfetcher.dto.TmdbResponse;
import org.example.filmfetcher.entities.Actor;
import org.example.filmfetcher.entities.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class MovieService {
    @Value("${api.key}")
    private String apiKey;
    private final MovieClient movieClient;

    public MovieService(MovieClient movieClient) {
        this.movieClient = movieClient;
    }

    public List<MovieCardDTO> getPopularMovies() {
        TmdbResponse response = movieClient.fetchPopularMovies();

        if (response == null || response.getResults() == null) {
            return List.of();
        }

        List<CompletableFuture<MovieCardDTO>> futures = response.getResults().stream()
                .map(movie -> CompletableFuture.supplyAsync(() -> mapToMovieCard(movie)))
                .collect(Collectors.toList());

        return futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
    }

    public List<MovieCardDTO> getTopRatedMovies() {
        TmdbResponse response = movieClient.fetchTopRatedMovies();
        if (response == null || response.getResults() == null) {
            return List.of();
        }

        List<CompletableFuture<MovieCardDTO>> futures = response.getResults().stream()
                .map(movie -> CompletableFuture.supplyAsync(() -> mapToMovieCard(movie)))
                .collect(Collectors.toList());

        return futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
    }

    public List<MovieCardDTO> getUpcomingMovies() {
        TmdbResponse response = movieClient.fetchUpcomingMovies();

        if (response == null || response.getResults() == null) {
            return List.of();
        }

        List<CompletableFuture<MovieCardDTO>> futures = response.getResults().stream()
                .map(movie -> CompletableFuture.supplyAsync(() -> mapToMovieCard(movie)))
                .collect(Collectors.toList());

        return futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
    }

    public MovieDetailsDTO getMovieDetails(String id){
        Movie response = movieClient.fetchMovie(id);

        if(response == null){
            return null;
        }

        return mapToMovieDetails(response);
    }

    public List<MovieCardDTO> getMovieByQuery(String query){
        TmdbResponse response = movieClient.getMovieByQuery(query);

        if(response == null || response.getResults() == null){
            return List.of();
        }
        List<CompletableFuture<MovieCardDTO>> futures = response.getResults().stream()
                .map(movie -> CompletableFuture.supplyAsync(() -> mapToMovieCard(movie)))
                .collect(Collectors.toList());

        return futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
    }

    public List<String> getCast(String id){
        Credits credits = movieClient.fetchCast(id);
        if (credits == null || credits.getCast() == null) {
            return List.of();
        }
        return credits.getCast().stream()
                .limit(5)
                .map(Actor::getName)
                .collect(Collectors.toList());
    }

    private MovieCardDTO mapToMovieCard(Movie movie) {
        String id =  String.valueOf(movie.getId());
        String year = (movie.getRelease_date() != null && movie.getRelease_date().length() >= 4)
                ? movie.getRelease_date().substring(0, 4)
                : "N/A";

        String posterUrl = (movie.getPoster_path() != null)
                ? "https://image.tmdb.org/t/p/w500" + movie.getPoster_path() + "?api_key=" + apiKey
                : null;

        return new MovieCardDTO(
                id,
                movie.getOriginal_title(),
                year,
                posterUrl
        );
    }

    private MovieDetailsDTO mapToMovieDetails(Movie movie) {
        String id =  String.valueOf(movie.getId());
        String year = (movie.getRelease_date() != null && movie.getRelease_date().length() >= 4)
                ? movie.getRelease_date().substring(0, 4)
                : "N/A";

        String posterUrl = (movie.getPoster_path() != null)
                ? "https://image.tmdb.org/t/p/w500" + movie.getPoster_path() + "?api_key=" + apiKey
                : null;
        List<String> cast = getCast(id);
        return new MovieDetailsDTO(
                id,
                movie.getOriginal_title(),
                year,
                movie.getOverview(),
                posterUrl,
                Math.round(movie.getVote_average()),
                cast

        );
    }


}
