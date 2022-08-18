package com.obss.bookapp.controller;

import com.obss.bookapp.dto.ListBookDto;
import com.obss.bookapp.service.ListService;
import com.obss.bookapp.security.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/list")
public class ListController {
    @Autowired
    ListService listService;
    @GetMapping("/favorites")
    public List<ListBookDto> getFavorites(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails myUserDetails=(MyUserDetails) authentication.getPrincipal();
        return listService.getAllFavorites(myUserDetails.getId());
    }
    @GetMapping("/read-list")
    public List<ListBookDto> getReadList(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails myUserDetails=(MyUserDetails) authentication.getPrincipal();
        return listService.getAllFavorites(myUserDetails.getId());
    }
    @PutMapping("/read-list/{bookid}")
    public void addToReadList(@PathVariable("bookid") int bookid ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails myUserDetails=(MyUserDetails) authentication.getPrincipal();
        listService.addToReadList(myUserDetails.getId(),bookid);
    }
    @PutMapping("/favorites/{bookid}")
    public void addToFavorites(@PathVariable("bookid") int bookid ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails myUserDetails=(MyUserDetails) authentication.getPrincipal();
        listService.addToFavorites(myUserDetails.getId(),bookid);
    }
    @DeleteMapping("/read-list/{bookid}")
    public void deleteFromReadList(@PathVariable("bookid") int bookid ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails myUserDetails=(MyUserDetails) authentication.getPrincipal();
        listService.deleteFromReadList(myUserDetails.getId(),bookid);
    }
    @DeleteMapping("/favorites/{bookid}")
    public void deleteFromFavorites(@PathVariable("bookid") int bookid ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails myUserDetails=(MyUserDetails) authentication.getPrincipal();
        listService.deleteFromFavorites(myUserDetails.getId(),bookid);
    }
    @GetMapping("/test")
    public String testController(){
        return "YEAH";
    }
}
