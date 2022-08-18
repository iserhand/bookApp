package com.obss.bookapp.dto;

import com.obss.bookapp.model.Book;
import lombok.*;
import java.util.Set;
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private int id;
    private String username;
    private String email;
    private String password;
}
