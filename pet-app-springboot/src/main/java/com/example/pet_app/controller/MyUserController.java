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
    public String test() {
        return "Hello!";
    }

    @GetMapping("/all-users")
    public List<MyUser> returnAllUsers() {
        return myUserRepository.findAll();
    }

    @PostMapping("/register")
    public void register(@RequestBody MyUser user) {
        String username = user.getUsername();
        String password = passwordEncoder.encode(user.getPassword());
        MyUser newUser = new MyUser(username, password);
        myUserRepository.save(newUser);
        System.out.println("User " + newUser.getUsername() + " registered");
    }

    @PostMapping("/login")
    public String login(@RequestBody MyUser user) {
        Optional<MyUser> optUser = myUserRepository.findByUsername(user.getUsername());
        String message = "Invalid credentials";
        if (optUser.isPresent()) {
            MyUser myUser = optUser.get();
            message = "User " + optUser.get().getUsername().toUpperCase() + " found, but password was incorrect.";
            if (passwordEncoder.matches(user.getPassword(), myUser.getPassword())) {
                message = "User " + optUser.get().getUsername().toUpperCase() + " found. Authentication successful";
            }
        }
        System.out.println("MESSAGE:");
        System.out.println(message);
        return message;
    }

}
