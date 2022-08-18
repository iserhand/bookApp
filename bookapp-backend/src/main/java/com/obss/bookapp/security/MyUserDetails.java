package com.obss.bookapp.security;

import com.obss.bookapp.model.User;
import io.micrometer.core.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails implements UserDetails {
    private int id;
    private User user;
    private String userName;
    private String password;
    @Nullable
    private boolean active;
    @Nullable
    private List<GrantedAuthority> authorities;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public MyUserDetails(User user){
        this.userName=user.getUserName();
        this.password=user.getPassword();
        this.active=user.isActive();
        this.id=user.getId();
        this.authorities=Arrays.stream(user.getRoles().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
