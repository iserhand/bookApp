package com.obss.bookapp.controller;

import com.obss.bookapp.dto.UserDto;
import com.obss.bookapp.service.UserService;
import com.obss.bookapp.security.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/all")
    public List<UserDto> getAll(){
        return userService.getAll();
    }
    @GetMapping("/{userid}")
    public UserDto getUserById(@PathVariable("userid") int id){
        return userService.getById(id);
    }
    @PostMapping
    public void createUser(@RequestBody UserDto user){
        userService.addUser(user);
    }
    @PostMapping("/admin")
    public void createAdmin(@RequestBody UserDto user){
        userService.addAdmin(user);
    }
    @PutMapping
    public void editUser(@RequestBody UserDto user){
        userService.editUser(user);
    }
    @DeleteMapping("/{userid}")
    public void deleteUser(@PathVariable("userid") int id){
        userService.deleteUser(id);
    }
    @GetMapping("/me")
    public UserDto getMyInfo( ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails myUserDetails=(MyUserDetails) authentication.getPrincipal();
        return userService.getById(myUserDetails.getId());
    }
}
