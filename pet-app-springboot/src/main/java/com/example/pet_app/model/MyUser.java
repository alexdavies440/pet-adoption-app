package com.example.pet_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

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
    private String password;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Pet> followedPets = new HashSet<>();

    public MyUser() {}

    public MyUser(String username, String password) {
        this.username = username;
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        MyUser myUser = (MyUser) o;
        return id == myUser.id && Objects.equals(username, myUser.username);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @OneToMany(mappedBy = "my_user", cascade = CascadeType.ALL, orphanRemoval = true)
    public Set<Pet> getFollowedPets() {
        return followedPets;
    }

    public void setFollowedPets(Set<Pet> followedPets) {
        this.followedPets = followedPets;
    }

    public void addFollowedPet(Pet newPet) {
        followedPets.add(newPet);
    }
}
