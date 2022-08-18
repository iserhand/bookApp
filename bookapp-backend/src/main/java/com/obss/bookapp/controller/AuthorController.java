package com.obss.bookapp.controller;

import com.obss.bookapp.dto.AuthorDto;
import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("api/author/")
public class AuthorController {
    @Autowired
    AuthorService authorService;
    @GetMapping()
    public List<AuthorDto> getAll(){
        return authorService.getAll();
    }
    @GetMapping("/{authorid}")
    public AuthorDto getAuthorById(@PathVariable("authorid") int id){
        return authorService.getById(id);
    }
    @PostMapping
    public void createAuthor(@RequestBody AuthorDto authorDto){
        authorService.addAuthor(authorDto);
    }
    @PutMapping
    public void editAuthor(@RequestBody AuthorDto authorDto){
        authorService.editAuthor(authorDto);
    }
    @DeleteMapping("/{authorid}")
    public void editAuthor(@PathVariable("authorid") int id){
        authorService.deleteAuthor(id);
    }

}
