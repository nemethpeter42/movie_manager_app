package com.github.nemethpeter42.moviemanager.backend.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@Document(collection = "movie")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Movie {
    @Id
    private String movieId;
    private List<Comment> comments;
}
