package com.example.pet_app.controller;

import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class MyUserController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/test")
    public List<MyUser> test() {
        MyUser test = new MyUser("test_user", "test_password");
        myUserRepository.save(test);

        return myUserRepository.findAll();
    }

    @PostMapping("/register")
    public void login(@RequestBody MyUser user) {
        String username = user.getUsername();
        String password = passwordEncoder.encode(user.getPassword());
        MyUser newUser = new MyUser(username, password);
        myUserRepository.save(newUser);
        System.out.println("User " + newUser.getUsername() + " registered");
    }

}
