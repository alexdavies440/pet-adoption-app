package com.example.pet_app.controller;

import com.example.pet_app.dto.LoginDto;
import com.example.pet_app.dto.RegisterDto;
import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

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
    public String login(@RequestBody @Valid LoginDto loginDto, HttpServletRequest request) {

        Optional<MyUser> optUser = myUserRepository.findByUsername(loginDto.getUsername());

        if (optUser.isEmpty()) {
            return "User not found";
        }
        else {
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(),
                            loginDto.getPassword()
                    );

            Authentication authentication = authenticationManager.authenticate(token);

            boolean authenticationStatus = authentication.isAuthenticated();
            if (authenticationStatus) {

                return token.getName();
            } else {
                return "Login failure";
            }
        }
    }

}
