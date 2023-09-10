package com.github.nemethpeter42.moviemanager.backend.config;


import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SpringDocConfig {
    
    @Bean
    public GroupedOpenApi api() {
        return GroupedOpenApi.builder()
            .group("moviemanagerbackend-public")
            .pathsToMatch("/**")
            .build();
    }

    @Bean
    public OpenAPI movieManagerBackendOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Movie Manager Backend API")
                .description("Spring Boot back-end for movie manager app")
                .version("v1.0.0")
                .license(new License().name("MIT").url("http://github.com/nemethpeter42")))
                .externalDocs(new ExternalDocumentation()
                .description("Github page")
                .url("http://github.com/nemethpeter42"));
    }


}
