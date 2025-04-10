package com.example.pet_app.controller;

import com.example.pet_app.dto.RegisterDto;
import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String registerNewUser(@RequestBody @Valid RegisterDto registerDto) {

        String username = registerDto.getUsername();

        Optional<MyUser> optUser = myUserRepository.findByUsername(registerDto.getUsername());

        if (optUser.isPresent()) {
            return "User already exists";
        }
        else if (registerDto.getPassword().equals(registerDto.getVerifyPassword())) {

            String password = passwordEncoder.encode(registerDto.getPassword());
            MyUser newUser = new MyUser(username, password);
            myUserRepository.save(newUser);
            System.out.println("User " + newUser.getUsername() + " registered");
            return "User " + newUser.getUsername() + " registered";
        }
        else {
            return "Passwords must match";
        }
    }

    @PostMapping("/login")
    public String login() {
        // Should only return something if login is successful
        return "login-success";
    }

    @GetMapping("/authenticated")
    public String isAuthenticated(Principal principal) {
        return principal.getName();
    }

}
