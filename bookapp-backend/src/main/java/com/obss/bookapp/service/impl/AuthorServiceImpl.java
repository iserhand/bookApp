package com.obss.bookapp.service.impl;

import com.obss.bookapp.dto.AuthorDto;
import com.obss.bookapp.exception.AuthorNotFoundException;
import com.obss.bookapp.model.Author;
import com.obss.bookapp.repository.AuthorRepository;
import com.obss.bookapp.service.AuthorService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@RequiredArgsConstructor
@Service
public class AuthorServiceImpl implements AuthorService {
    @Autowired
    AuthorRepository authorRepository;
    @Override
    public List<AuthorDto> getAll() {
        final Iterable<Author> allAuthors = authorRepository.findAll();
        List<AuthorDto> retList = new ArrayList<>();
        allAuthors.forEach(author ->{
            retList.add(AuthorDto.builder().name(author.getName())
                    .date_of_birth(author.getDate_of_birth())
                    .books(author.getBooks())
                    .id(author.getId())
                    .build());

        });
        return retList;
    }
    @Override
    public AuthorDto getById(int id) {
        final Author author=authorRepository.findById(id).orElseThrow(AuthorNotFoundException::new);
        return AuthorDto.builder().name(author.getName())
                .date_of_birth(author.getDate_of_birth())
                .books(author.getBooks())
                .build();
    }

    @Override
    public void deleteAuthor(int id) {
        authorRepository.findById(id).orElseThrow(AuthorNotFoundException::new);
        authorRepository.deleteById(id);
    }

    @Override
    public void addAuthor(AuthorDto authorDto) {
        Author newAuthor=new Author();
        newAuthor.setName(authorDto.getName());
        newAuthor.setDate_of_birth(authorDto.getDate_of_birth());
        newAuthor.setBooks(authorDto.getBooks());
    }

    @Override
    public void editAuthor(AuthorDto authorDto) {
        Author newAuthor=new Author();
        newAuthor.setId(authorDto.getId());
        newAuthor.setName(authorDto.getName());
        newAuthor.setDate_of_birth(authorDto.getDate_of_birth());
        authorRepository.findById(newAuthor.getId()).map(authorInf -> {
            authorInf.setName(newAuthor.getName());
            authorInf.setDate_of_birth(newAuthor.getDate_of_birth());
            return authorRepository.save(authorInf);
        }).orElseThrow(AuthorNotFoundException::new);
    }
}
