package com.tcc.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Permitir o domínio do frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permitir os métodos HTTP
                .allowedHeaders("*") // Permitir todos os cabeçalhos
                .exposedHeaders("Authorization") // Caso precise expor cabeçalhos específicos
                .allowCredentials(true); // Permitir envio de cookies/sessões, se necessário
    }
}
