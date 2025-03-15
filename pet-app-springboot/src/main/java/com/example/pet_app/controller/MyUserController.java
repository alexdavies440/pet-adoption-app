package com.example.pet_app.controller;

import com.example.pet_app.dto.LoginDto;
import com.example.pet_app.dto.RegisterDto;
import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
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

import java.security.Principal;
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

    @GetMapping("/test")
    public String test(Principal principal) {
        return "Hello! " + principal.getName();
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

    @GetMapping("/principal")
    public String test3(Principal principal) {
        // Should return current user logged in

        return principal.getName();
    }

}
