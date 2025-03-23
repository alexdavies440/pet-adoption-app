package com.example.pet_app.controller;

import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MyUserController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/")
    public List<MyUser> returnAllUsers() {
        return myUserRepository.findAll();
    }

    @GetMapping("/principal")
    public String test3(Principal principal) {
        // Should return current user logged in

        return principal.getName();
    }

    @GetMapping("/test")
    public String test(Principal principal) {
        return "Hello! " + principal.getName();
    }

}
