package com.obss.bookapp.service.impl;

import com.obss.bookapp.dto.BookDto;
import com.obss.bookapp.dto.UserDto;
import com.obss.bookapp.exception.UserNotFoundException;
import com.obss.bookapp.model.Book;
import com.obss.bookapp.model.User;
import com.obss.bookapp.repository.UserRepository;
import com.obss.bookapp.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    UserRepository userRepository;
    @Override
    public List<UserDto> getAll() {
        final Iterable<User> allUsers = userRepository.findAll();
        List<UserDto> retList = new ArrayList<>();
        allUsers.forEach(user -> retList.add(UserDto.builder().password(user.getPassword()).id(user.getId()).username(user.getUserName()).email(user.getEmail()).build()));
        return retList;
    }

    @Override
    public UserDto getById(int id) {
        final User user =userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return UserDto.builder().id(user.getId()).username(user.getUserName()).email(user.getEmail()).build();
    }

    @Override
    public void deleteUser(int id) {
        userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        userRepository.deleteById(id);
    }
    @Override
    public void addUser(UserDto userDto) {
        User newUser=new User();
        newUser.setUserName(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        newUser.setRoles("ROLE_USER");
        newUser.setActive(true);
        userRepository.save(newUser);
    }
    @Override
    public void editUser(UserDto userDto) {
        User newUser=new User();
        newUser.setId(userDto.getId());
        newUser.setUserName(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());
        userRepository.findById(newUser.getId()).map(user -> {
            user.setUserName(newUser.getUserName());
            user.setEmail(newUser.getEmail());
            return userRepository.save(user);
        }).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public void addAdmin(UserDto userDto) {
        User newUser=new User();
        newUser.setUserName(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        newUser.setRoles("ROLE_ADMIN");
        newUser.setActive(true);
        userRepository.save(newUser);
    }
}
