package com.obss.bookapp.repository;

import com.obss.bookapp.dto.ListBookDto;
import com.obss.bookapp.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {
    List<Book> findByNameLike(String name);
}
