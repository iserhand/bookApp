package com.obss.bookapp.controller;

import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.dto.ListBookDto;
import com.obss.bookapp.dto.UserDto;
import com.obss.bookapp.model.Book;
import com.obss.bookapp.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book")
public class BookController {
    //Link mappings
    @Autowired
    private BookService bookService;
    @GetMapping("/all")
    public List<ListBookDto> getAll(){
        return bookService.getAll();
    }
    @GetMapping("/search/{searchKey}")
    public List<ListBookDto> getSearch(@PathVariable("searchKey") String searchKey){
        List<ListBookDto> list= bookService.getAll();
        List<ListBookDto> retList=new ArrayList<>();
        for(ListBookDto item :list){
            if(item.getName().contains(searchKey)){
                retList.add(item);
            }
        }
        return retList;
    }
    @GetMapping("/{bookid}")
    public BookDto getBookById(@PathVariable("bookid") int id){
        return bookService.getBookById(id);
    }
    @PostMapping
    public void createBook(@RequestBody BookDto bookDto){
        bookService.addNewBook(bookDto);
    }
    @PutMapping
    public void editBook(@RequestBody BookDto bookDto){
        bookService.editBook(bookDto);
    }
    @DeleteMapping("/{bookid}")
    public void deleteBook(@PathVariable("bookid") int id){
        bookService.deleteBook(id);
    }

}
