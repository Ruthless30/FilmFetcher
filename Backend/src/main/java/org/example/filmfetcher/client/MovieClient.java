package org.example.filmfetcher.client;


import org.example.filmfetcher.dto.Credits;
import org.example.filmfetcher.dto.TmdbResponse;
import org.example.filmfetcher.entities.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieClient {

    @Value("${api.key}")
    private String apiKey;
    @Value("${api.url}")
    private String url;
    private final String filter ="&include_adult=false" + "&certification_country=US" + "&certification.lte=R" ;
    private final RestTemplate restTemplate = new RestTemplate();

    public TmdbResponse fetchPopularMovies(){
            return restTemplate.getForObject(url+"movie/popular"+"?api_key="+apiKey+filter,TmdbResponse.class);
    }

    public TmdbResponse fetchTopRatedMovies(){
        return restTemplate.getForObject(url+"movie/top_rated"+"?api_key="+apiKey+filter,TmdbResponse.class);
    }

    public TmdbResponse fetchUpcomingMovies(){
        return restTemplate.getForObject(url+"movie/upcoming"+"?api_key="+apiKey+filter,TmdbResponse.class);
    }

    public Movie fetchMovie(String id){
        return restTemplate.getForObject(url+"movie/"+id+"?api_key="+apiKey+filter,Movie.class);
    }

    public TmdbResponse getMovieByQuery(String query){
        return restTemplate.getForObject(url+"search/movie"+"?query="+query+"&api_key="+apiKey+filter,TmdbResponse.class);
    }

    public Credits fetchCast(String id){
        return restTemplate.getForObject(url+"movie/"+id+"/credits"+"?api_key="+apiKey+filter,Credits.class);
    }

}
