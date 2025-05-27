package com.example.pet_app.controller;

import com.example.pet_app.dto.RegisterDto;
import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import com.example.pet_app.security.service.EmailService;
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

    @Autowired
    private EmailService emailService;

    public String generateVerificationCode() {
        String alphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678911121314151617181920abcdefghijklmnopqrstuvxyz";
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 25; i++) {
            code.append(alphaNumericString.charAt((int) Math.floor(Math.random() * 81)));
        }
        return code.toString();
    }

    @PostMapping("/register")
    public String registerNewUser(@RequestBody @Valid RegisterDto registerDto) {

        String username = registerDto.getUsername();
        String email = registerDto.getEmail();
        String password = registerDto.getPassword();
        String verifyPassword = registerDto.getVerifyPassword();
        String verificationCode = generateVerificationCode();


        Optional<MyUser> optUser = myUserRepository.findByUsername(registerDto.getUsername());

        if (optUser.isPresent()) {
            return "User already exists";
        }
        else if (password.equals(verifyPassword)) {

            password = passwordEncoder.encode(password);
            MyUser newUser = new MyUser(username, email, password);
            myUserRepository.save(newUser);
            emailService.sendEmail(
                    "Thank You for Joining Wishbone!",
                    email,
                    "Welcome, " + username + ". Your security code is " + verificationCode
            );
            return "";
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
