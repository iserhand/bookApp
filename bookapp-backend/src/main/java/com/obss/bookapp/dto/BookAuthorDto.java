package com.obss.bookapp.dto;

import lombok.*;

import java.sql.Date;
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class BookAuthorDto {
    private int id;
    private String name;
}
