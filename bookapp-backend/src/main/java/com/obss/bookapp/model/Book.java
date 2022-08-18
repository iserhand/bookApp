package com.obss.bookapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private Date date;
    private String genre;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "author_id",nullable = false)
    @JsonBackReference
    private Author author;
}
