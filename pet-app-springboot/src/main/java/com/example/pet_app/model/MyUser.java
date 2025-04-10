package com.example.pet_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Objects;
import java.util.Set;

@Entity
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private Set<Long> followedPets;

    public MyUser() {}

    public MyUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public long getId() {
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

    public Set<Long> getFollowedPets() {
        return followedPets;
    }

    public void setFollowedPets(Set<Long> followedPets) {
        this.followedPets = followedPets;
    }
}
