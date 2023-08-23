package com.github.nemethpeter42.moviemanager.backend.repository;


import com.github.nemethpeter42.moviemanager.backend.model.Movie;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {

    List<Movie> findByOriginalTitle(String originalTitle);

    //List<Person> findByAgeBetween(Integer min, Integer max);

    @Query(value = "{ 'rating' : { $gt : ?0, $lt : ?1}}",
           fields = "{comments:  0}")
    List<Movie> findMovieBetwwenRatings(Integer min, Integer max);
}
