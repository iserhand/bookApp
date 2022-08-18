package com.obss.bookapp.service.impl;
import com.obss.bookapp.dto.AuthorDto;
import com.obss.bookapp.dto.BookAuthorDto;
import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.dto.ListBookDto;
import com.obss.bookapp.exception.BookNotFoundException;
import com.obss.bookapp.exception.UserNotFoundException;
import com.obss.bookapp.model.Author;
import com.obss.bookapp.model.Book;
import com.obss.bookapp.model.User;
import com.obss.bookapp.repository.AuthorRepository;
import com.obss.bookapp.repository.BookRepository;
import com.obss.bookapp.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {
@Autowired
BookRepository bookRepository;
@Autowired
AuthorRepository authorRepository;
    @Override
    public List<ListBookDto> getAll() {
        final Iterable<Book> allBooks = bookRepository.findAll();
        List<ListBookDto> retList = new ArrayList<>();
        allBooks.forEach(book ->{
            retList.add(ListBookDto.builder().name(book.getName())
                    .id(book.getId()).author(BookAuthorDto.builder().id(book.getAuthor().getId()).name(book.getAuthor().getName()).build())
                    .date(book.getDate()).genre(book.getGenre()).build());

        });
        return retList;
    }

    @Override
    public BookDto getBookById(int id) {
        final Book book=bookRepository.findById(id).orElseThrow(BookNotFoundException::new);
        return BookDto.builder().name(book.getName()).genre(book.getGenre()).build();
    }

    @Override
    public void deleteBook(int id) {
        bookRepository.findById(id).orElseThrow(BookNotFoundException::new);
    }

    @Override
    public void addNewBook(BookDto book) {
        Book newBook=new Book();
        newBook.setName(book.getName());
        newBook.setAuthor(book.getAuthor());
        newBook.setDate(book.getDate());
        newBook.setGenre(book.getGenre());
        bookRepository.save(newBook);
    }

    @Override
    public void editBook(BookDto book) {
        Book newBook=new Book();
        newBook.setName(book.getName());
        newBook.setAuthor(book.getAuthor());
        newBook.setDate(book.getDate());
        newBook.setGenre(book.getGenre());
        bookRepository.findById(newBook.getId()).map(bookInf -> {
            bookInf.setName(newBook.getName());
            bookInf.setAuthor(newBook.getAuthor());
            bookInf.setDate(newBook.getDate());
            bookInf.setGenre(newBook.getGenre());
            return bookRepository.save(bookInf);
        }).orElseThrow(BookNotFoundException::new);
    }
    @Override
    public BookAuthorDto getAuthor(int id) {
        final Book book=bookRepository.findById(id).orElseThrow(BookNotFoundException::new);
        Author author=book.getAuthor();
        return BookAuthorDto.builder().name(author.getName()).build();
    }
}
