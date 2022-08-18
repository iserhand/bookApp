package com.obss.bookapp.dto;

import com.obss.bookapp.model.Book;
import lombok.*;

import java.sql.Date;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class AuthorDto {
    private int id;
    private String name;
    private Date date_of_birth;
    Set<Book> books;
}
