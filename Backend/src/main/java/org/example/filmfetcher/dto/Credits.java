package org.example.filmfetcher.dto;

import lombok.Data;
import org.example.filmfetcher.entities.Actor;
import java.util.List;

@Data
public class Credits {
    private List<Actor> cast;
}
