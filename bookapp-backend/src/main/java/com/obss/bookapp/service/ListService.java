package com.obss.bookapp.service;

import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.dto.ListBookDto;

import java.util.List;

public interface ListService {
    List<ListBookDto> getAllFavorites(int id);

    public List<ListBookDto> getAllReadList(int id);
    public void addToFavorites(int userId,int bookId);
    public void addToReadList(int userId,int bookId);
    public void deleteFromFavorites(int userId,int bookId);
    public void deleteFromReadList(int userId,int bookId);
}
