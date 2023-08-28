package com.github.nemethpeter42.moviemanager.backend.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "movie")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Movie {
    @Id
    private String movieId;

    private String originalTitle;

    private String localTitle;

    /** 
     * prec = precedence: 
     * 0 - already watched, 
     * 1 - watch it next time, 
     * 2 - watch it later, 
     * 3 - don't watch it 
     * */
    private String prec;

    private Integer rating;

    private List<Comment> comments;

    private ReleaseInfo releaseInfo;
}
