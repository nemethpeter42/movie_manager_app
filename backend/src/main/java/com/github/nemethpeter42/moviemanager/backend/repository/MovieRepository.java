package com.github.nemethpeter42.moviemanager.backend.repository;


import com.github.nemethpeter42.moviemanager.backend.model.Movie;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {


    //List<Person> findByAgeBetween(Integer min, Integer max);


    //Query annotation fields param - :1 includes field :0 doesn't include field
    //more info: https://www.baeldung.com/mongodb-return-specific-fields
    @Query(value = "{ 'rating' : { $gt : ?0, $lt : ?1}}",
           fields = "{comments:  0}")
    List<Movie> findMovieBetweenRatings(Integer min, Integer max);
}
