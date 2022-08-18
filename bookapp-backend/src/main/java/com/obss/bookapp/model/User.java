package com.obss.bookapp.model;

import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.exception.BookAlreadyInListException;
import com.obss.bookapp.exception.BookNotFoundException;
import lombok.*;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userName;
    private String email;
    private String password;
    private int userType;
    private String roles;
    private boolean active;
    @ManyToMany(cascade =  CascadeType.DETACH)
    @JoinTable(
            name = "favorites",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "book_id") }
    )
    Set<Book> favoriteBooks = new HashSet<>();

    @ManyToMany(cascade =  CascadeType.DETACH)
    @JoinTable(
            name = "readlist",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "book_id") }
    )
    Set<Book> readList = new HashSet<>();
    public void addToReadList(Book book){
        if(!readList.add(book)){
            throw new BookAlreadyInListException();
        }
    }
    public void addToFavorites(Book book){
        if(!favoriteBooks.add(book)){
            throw new BookAlreadyInListException();
        }
    }
    public void deleteFromReadList(Book book){
        if(!readList.remove(book)){
            throw new BookNotFoundException();
        }
    }
    public void deleteFromFavorites(Book book){
        if(!favoriteBooks.remove(book)){
            throw new BookNotFoundException();
        }
    }
}
