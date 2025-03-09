package com.example.pet_app.controller;

import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class MyUserController {

    @Autowired
    private MyUserRepository myUserRepository;

    @GetMapping("/test")
    public List<MyUser> test() {
        MyUser test = new MyUser("test_user", "test_password");
        myUserRepository.save(test);

        return myUserRepository.findAll();
    }
}
