package com.example.pet_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.context.annotation.Primary;

import java.util.Objects;

@Entity
public class Pet {

    @Id
    private Long petId;

    @ManyToOne
//    @JoinColumn(name = "follower_id")
    private MyUser follower;

    public Pet() {}

    public Pet(Long petId, MyUser follower) {
        this.petId = petId;
        this.follower = follower;
    }


    public Long getPetId() {
        return petId;
    }

    public MyUser getFollower() {
        return follower;
    }

    public void setFollower(MyUser follower) {
        this.follower = follower;
    }

}
