package com.example.pet_app.controller;

import com.example.pet_app.model.MyUser;
import com.example.pet_app.model.Pet;
import com.example.pet_app.repository.MyUserRepository;
import com.example.pet_app.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MyUserController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PetRepository petRepository;

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
    public String followPet(@RequestBody Long petId, Principal principal) {

//        return "" + petId;
        String response = "";
        Optional<MyUser> optUser = myUserRepository.findByUsername(principal.getName());

        if (optUser.isPresent()) {
            MyUser myUser = optUser.get();
            Pet newPet = new Pet(petId, myUser);
            myUser.addFollowedPet(newPet);
            myUserRepository.save(myUser);
            petRepository.save(newPet);

            response = myUser.getFollowedPets().toString();
        }
        return response;
    }

    @GetMapping("/following")
    public Set<Long> getFollowedPets(Principal principal) {
        Set<Long> followingSet = new HashSet<>();
        Optional<MyUser> optUser = myUserRepository.findByUsername(principal.getName());

        if (optUser.isPresent()) {
            MyUser myUser = optUser.get();
            List<Pet> following = petRepository.findAll();
            for (Pet pet : following) {
                if (pet.getFollower().equals(myUser)) {
                    followingSet.add(pet.getPetId());
                }
            }
        }
        System.out.println(followingSet);
        return followingSet;
    }
}
