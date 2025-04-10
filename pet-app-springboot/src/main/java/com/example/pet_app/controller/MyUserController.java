package com.example.pet_app.controller;

import com.example.pet_app.model.MyUser;
import com.example.pet_app.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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

    @PostMapping("/follow")
    public String followPet(@RequestBody long petId, Principal principal) {

        Optional<MyUser> optUser = myUserRepository.findByUsername(principal.getName());
        String response = "...";

        if (optUser.isPresent()) {
            MyUser myUser = optUser.get();
            Set<Long> pets = myUser.getFollowedPets();

            pets.add(petId);
            myUser.setFollowedPets(pets);

            response = "Pet " + petId +  " followed";
        }
        return response;
    }
}
