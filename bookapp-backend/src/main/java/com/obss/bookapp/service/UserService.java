package com.obss.bookapp.service;

import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.dto.UserDto;
import com.obss.bookapp.model.User;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();
    UserDto getById(int id);
    void deleteUser(int id);
    void addUser(UserDto userDto);
    void editUser(UserDto userDto);
    void addAdmin(UserDto userDto);


}
