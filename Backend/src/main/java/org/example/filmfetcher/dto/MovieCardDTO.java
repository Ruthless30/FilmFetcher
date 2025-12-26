package org.example.filmfetcher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieCardDTO {
    private String id;
    private String originalTitle;
    private String releaseYear;
    private String poster_path;


}
