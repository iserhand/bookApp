package com.obss.bookapp.service;

import com.obss.bookapp.dto.AuthorDto;
import com.obss.bookapp.dto.BookAuthorDto;
import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.dto.ListBookDto;
import com.obss.bookapp.model.Book;

import java.util.List;

public interface BookService {
    List<ListBookDto> getAll();
    BookDto getBookById(int id);
    void deleteBook(int id);
    void addNewBook(BookDto book);
    void editBook(BookDto book);
    BookAuthorDto getAuthor(int id);
}
