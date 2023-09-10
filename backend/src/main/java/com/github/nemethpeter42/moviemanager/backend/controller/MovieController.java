package com.github.nemethpeter42.moviemanager.backend.controller;


import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.github.nemethpeter42.moviemanager.backend.model.Movie;
import com.github.nemethpeter42.moviemanager.backend.service.MovieService;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public String save(@RequestBody Movie movie) {
        return movieService.save(movie);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        movieService.delete(id);
    }

    @GetMapping("/findAllById")
    public List<Movie> findAllById(@RequestParam List<String> ids) {
        return movieService.findAllById(ids);
    }

    @GetMapping("/getByRating")
    public List<Movie> getByPersonAge(@RequestParam Integer minRating,
                                       @RequestParam Integer maxRating) {
        return movieService.getMoviesByRating(minRating,maxRating);
    }

    @GetMapping("/search")
    public Page<Movie> searchPerson(
            @RequestParam(required = false) String originalTitle,
            @RequestParam(required = false) String localTitle,
            @RequestParam(required = false) Integer minRating,
            @RequestParam(required = false) Integer maxRating,
            @RequestParam(required = false) String prec,
            @RequestParam(required = false) Integer year,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size
    ) {
        Pageable pageable
                = PageRequest.of(page,size);
        return movieService.search(originalTitle, localTitle, minRating, maxRating, prec, year,pageable);
    }

    @GetMapping("/getNextMovieToWatchByYear")
    public List<Document> getNextMovieToWatchByYear() {
        return movieService.getNextMovieToWatchByYear();
    }

    @GetMapping("/getNumOfMoviesByYear")
    public List<Document> getNumOfMoviesByYear() {
        return movieService.getNumOfMoviesByYear();
    }
}