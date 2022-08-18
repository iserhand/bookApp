package com.obss.bookapp.service.impl;

import com.obss.bookapp.dto.BookAuthorDto;
import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.dto.ListBookDto;
import com.obss.bookapp.dto.UserDto;
import com.obss.bookapp.exception.BookNotFoundException;
import com.obss.bookapp.exception.UserNotFoundException;
import com.obss.bookapp.model.Book;
import com.obss.bookapp.model.User;
import com.obss.bookapp.repository.BookRepository;
import com.obss.bookapp.repository.UserRepository;
import com.obss.bookapp.service.ListService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
@AllArgsConstructor
@RequiredArgsConstructor
@Service
public class ListServiceImpl implements ListService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BookRepository bookRepository;
    @Override
    public List<ListBookDto> getAllFavorites(int id) {
        Optional<User> returnUser=userRepository.findById(id);
        returnUser.orElseThrow(UserNotFoundException::new);
        User user=returnUser.get();
        Set<Book> books=user.getFavoriteBooks();
        List<ListBookDto> retList=new ArrayList<>();
        books.forEach(book ->{
            retList.add(ListBookDto.builder()
                    .name(book.getName())
                    .id(book.getId())
                            .author(BookAuthorDto.builder().name(book.getAuthor().getName()).build())
                    .date(book.getDate())
                    .genre(book.getGenre())
                    .build());

        });
        return retList;
    }

    @Override
    public List<ListBookDto> getAllReadList(int id) {
        Optional<User> returnUser=userRepository.findById(id);
        returnUser.orElseThrow(UserNotFoundException::new);
        User user=returnUser.get();
        Set<Book> books=user.getReadList();
        List<ListBookDto> retList=new ArrayList<>();
        books.forEach(book ->{
            retList.add(ListBookDto.builder()
                    .name(book.getName())
                    .id(book.getId())
                    .date(book.getDate())
                    .genre(book.getGenre())
                    .build());

        });
        return retList;
    }

    @Override
    public void addToFavorites(int userId, int bookId) {
        Optional<User> returnUser=userRepository.findById(userId);
        returnUser.orElseThrow(UserNotFoundException::new);
        User user=returnUser.get();
        Optional<Book> returnBook=bookRepository.findById(bookId);
        returnBook.orElseThrow(BookNotFoundException::new);
        Book book=returnBook.get();
        user.addToFavorites(book);
        userRepository.save(user);
    }

    @Override
    public void addToReadList(int userId, int bookId) {
        Optional<User> returnUser=userRepository.findById(userId);
        returnUser.orElseThrow(UserNotFoundException::new);
        User user=returnUser.get();
        Optional<Book> returnBook=bookRepository.findById(bookId);
        returnBook.orElseThrow(BookNotFoundException::new);
        Book book=returnBook.get();
        user.addToReadList(book);
        userRepository.save(user);
    }

    @Override
    public void deleteFromFavorites(int userId, int bookId) {
        Optional<User> returnUser=userRepository.findById(userId);
        returnUser.orElseThrow(UserNotFoundException::new);
        User user=returnUser.get();
        Optional<Book> returnBook=bookRepository.findById(bookId);
        returnBook.orElseThrow(BookNotFoundException::new);
        Book book=returnBook.get();
        user.deleteFromFavorites(book);
        userRepository.save(user);
    }

    @Override
    public void deleteFromReadList(int userId, int bookId) {
        Optional<User> returnUser=userRepository.findById(userId);
        returnUser.orElseThrow(UserNotFoundException::new);
        User user=returnUser.get();
        Optional<Book> returnBook=bookRepository.findById(bookId);
        returnBook.orElseThrow(BookNotFoundException::new);
        Book book=returnBook.get();
        user.deleteFromReadList(book);
        userRepository.save(user);
    }
}
