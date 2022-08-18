package com.obss.bookapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration{
    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    JwtRequestFilter jwtRequestFilter;
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception{
        //Path security
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/api/book/**")
                .hasAnyRole("ADMIN","USER")
                .antMatchers(HttpMethod.DELETE,"/api/user/**")
                .hasRole("ADMIN")
                .antMatchers("/api/user/all")
                .hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/user/**")
                .hasRole("ADMIN")
                .antMatchers("/authenticate/**")
                .permitAll()
                .antMatchers("/register/**")
                .permitAll()
                .antMatchers("/api/list/**")
                .hasAnyRole("ADMIN","USER")
                .antMatchers("/api/author/**")
                .hasAnyRole("ADMIN","USER")
                .antMatchers(HttpMethod.DELETE,"/api/author/**")
                .hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/author/**")
                .hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/api/author/**")
                .hasRole("ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring().antMatchers("/images/**", "/js/**", "/webjars/**");
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        final CorsConfiguration configuration=new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","PUT","POST","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization","Cache-Control","Content-Type"
        ,"Cookie","Referer","User-Agent","Set-Cookie"));
        configuration.setExposedHeaders(Arrays.asList("Authorization","Cache-Control","Content-Type"
                ,"Cookie","Referer","User-Agent","Set-Cookie"));
        final UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }


}
