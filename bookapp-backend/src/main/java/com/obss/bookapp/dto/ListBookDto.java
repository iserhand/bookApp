package com.obss.bookapp.dto;

import com.obss.bookapp.model.Author;
import lombok.*;

import java.sql.Date;
@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class ListBookDto {
    private int id;
    private String name;
    private Date date;
    private String genre;
    private BookAuthorDto author;
}
