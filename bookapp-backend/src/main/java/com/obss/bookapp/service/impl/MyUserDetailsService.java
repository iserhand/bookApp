package com.obss.bookapp.service.impl;

import com.obss.bookapp.exception.UserNotFoundException;
import com.obss.bookapp.model.User;
import com.obss.bookapp.repository.UserRepository;
import com.obss.bookapp.security.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    public MyUserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user=userRepository.findByUserName(userName);
        user.orElseThrow(UserNotFoundException::new);
        return user.map(MyUserDetails::new).get();
    }
}
