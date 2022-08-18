package com.obss.bookapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.obss.bookapp.model.Author;
import lombok.*;

import java.sql.Date;
@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BookDto {
    private int id;
    private String name;
    @JsonProperty("author")
    private Author author;
    private Date date;
    private String genre;
}
