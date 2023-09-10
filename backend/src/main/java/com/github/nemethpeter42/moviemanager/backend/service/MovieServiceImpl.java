package com.github.nemethpeter42.moviemanager.backend.service;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import com.github.nemethpeter42.moviemanager.backend.model.Movie;
import com.github.nemethpeter42.moviemanager.backend.repository.MovieRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {
    
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public String save(Movie movie) {
        //omit modification of comments
        if (movie.getMovieId() != null && !movieRepository.findById(movie.getMovieId()).equals(Optional.empty())) {
            Movie existingMovie = movieRepository.findById(movie.getMovieId()).get();
            movie.setComments(existingMovie.getComments());
        }
        return movieRepository.save(movie).getMovieId();
    }

    @Override
    public void delete(String id) {
        movieRepository.deleteById(id);
    }

    @Override
    public List<Movie> findAllById(List<String> ids) {
        return movieRepository.findAllById(ids);
    }

    @Override
    public List<Movie> getMoviesByRating(Integer minRating, Integer maxRating) {
        return movieRepository.findMovieBetweenRatings(minRating,maxRating);
    }

    @Override
    public Page<Movie> search(String originalTitle, String localTitle, Integer minRating, Integer maxRating, String prec, Integer year, Pageable pageable) {
        
        Query query = new Query().with(pageable);
        List<Criteria> criteria = new ArrayList<>();

        if(originalTitle !=null && !originalTitle.isEmpty()) {
            criteria.add(Criteria.where("firstName").regex(originalTitle,"i"));
        }

        if(minRating !=null && maxRating !=null) {
            criteria.add(Criteria.where("age").gte(minRating).lte(maxRating));
        }

        if(prec !=null && !prec.isEmpty()) {
            criteria.add(Criteria.where("prec").is(prec));
        }

        if(year !=null) {
            criteria.add(Criteria.where("releaseInfo.year").is(year));
        }

        if(!criteria.isEmpty()) {
            query.addCriteria(new Criteria()
                .andOperator(criteria.toArray(new Criteria[0])));
        }

        Page<Movie> movies = PageableExecutionUtils.getPage(
                mongoTemplate.find(query, Movie.class
                ), pageable, () -> mongoTemplate.count(query.skip(0).limit(0),Movie.class));
        return movies;
    }

    //TODO prec erteke legyen 1 v 2
    @Override
    public List<Document> getNextMovieToWatchByYear() {
        UnwindOperation unwindOperation
                = Aggregation.unwind("releaseInfo");
        SortOperation sortOperation
                = Aggregation.sort(Sort.Direction.ASC,"prec");
        GroupOperation groupOperation
                = Aggregation.group("releaseInfo.year")
                .first(Aggregation.ROOT)
                .as("nextMovieToWatch");

        Aggregation aggregation
                = Aggregation.newAggregation(unwindOperation,sortOperation,groupOperation);

        List<Document> person
                = mongoTemplate.aggregate(aggregation, Movie.class,Document.class).getMappedResults();
        return person;
    }

    @Override
    public List<Document> getNumOfMoviesByYear() {

        UnwindOperation unwindOperation
            = Aggregation.unwind("releaseInfo");
        GroupOperation groupOperation
            = Aggregation.group("releaseInfo.year")
            .count().as("yearCount");
        SortOperation sortOperation
                = Aggregation.sort(Sort.Direction.DESC, "yearCount");

        ProjectionOperation projectionOperation
            = Aggregation.project()
            .andExpression("_id").as("year")
            .andExpression("yearCount").as("count")
            .andExclude("_id");

        Aggregation aggregation
                = Aggregation.newAggregation(unwindOperation,groupOperation,sortOperation,projectionOperation);

        List<Document> documents
            = mongoTemplate.aggregate(aggregation,
            Movie.class,
            Document.class).getMappedResults();
        return  documents;
    }
}
