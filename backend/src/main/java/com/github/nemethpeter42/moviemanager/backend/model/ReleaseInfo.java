//note: I only made this separate class, to demonstrate the unwind aggregation

package com.github.nemethpeter42.moviemanager.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReleaseInfo {
    /**
     * the year, when the movie of the first season of a series was released
     */
    private Integer year;    
}
