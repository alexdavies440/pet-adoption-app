package com.example.pet_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String username;

    @NotBlank
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @NotBlank
    private String password;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Pet> followedPets = new HashSet<>();

    public MyUser() {}

    public MyUser(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "myUser{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public Set<Pet> getFollowedPets() {
        return followedPets;
    }

    public Set<Long> getFollowedPetIds() {
        Set<Long> petIds = new HashSet<>();
        for (Pet pet : followedPets) {
            petIds.add(pet.getPetId());
        }
        return petIds;
    }

    public void setFollowedPets(Set<Pet> followedPets) {
        this.followedPets = followedPets;
    }

    public void addFollowedPet(Pet newPet) {
        followedPets.add(newPet);
    }

//    public void removeFollowedPet(Pet pet) { followedPets.remove(pet); }
}
