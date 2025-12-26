package org.example.filmfetcher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class MovieDetailsDTO {
        private String id;
        private String originalTitle;
        private String releaseYear;
        private String overview;
        private String poster_path;
        private int vote_average;
        private List<String> cast;
}
