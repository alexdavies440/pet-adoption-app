package com.example.pet_app.controller;

import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextHolderFilter;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MyUserController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public String login(@RequestBody MyUser user) {

        Optional<MyUser> optUser = myUserRepository.findByUsername(user.getUsername());

        if (optUser.isEmpty()) {
            return "User not found";
        }
        else {
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    );
            Authentication authentication = authenticationManager.authenticate(token);

            boolean authenticationStatus = authentication.isAuthenticated();
            if (authenticationStatus) {
                return "Welcome, " + user.getUsername();
            } else {
                return "Login failure";
            }
        }
    }

    @GetMapping("/test")
    public String test() {
        return "Hello!";
    }

    @PostMapping("test2")
    public String test(@RequestBody MyUser test) {

        Optional<MyUser> optionalMyUser = myUserRepository.findByUsername(test.getUsername());

        if (optionalMyUser.isPresent() && passwordEncoder.matches(
                test.getPassword(),
                optionalMyUser.get().getPassword())
        ) {
            return "User found, password correct";
        } else {
            return "User not found";
        }
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

    @GetMapping("/principal")
    public String test3() {
        // Should return current user logged in
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }
}
