package com.github.nemethpeter42.moviemanager.backend.service;

import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.github.nemethpeter42.moviemanager.backend.model.Movie;

import java.util.List;

public interface MovieService {
    String save(Movie movie);

    void delete(String id);

    List<Movie> findAllById(List<String> ids);

    List<Movie> getMoviesByRating(Integer minRating, Integer maxRating);

    Page<Movie> search(String originalTitle, String localTitle, Integer minRating, Integer maxRating, String prec, Integer year, Pageable pageable);

    List<Document> getNextMovieToWatchByYear();

    List<Document> getNumOfMoviesByYear();
}