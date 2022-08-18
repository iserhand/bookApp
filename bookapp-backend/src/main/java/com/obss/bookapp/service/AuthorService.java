package com.obss.bookapp.service;

import com.obss.bookapp.dto.AuthorDto;
import java.util.List;

public interface AuthorService {
    List<AuthorDto> getAll();
    AuthorDto getById(int id);
    void deleteAuthor(int id);
    void addAuthor(AuthorDto authorDto);
    void editAuthor(AuthorDto authorDto);

}
