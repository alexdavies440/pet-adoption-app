//package com.example.pet_app.model;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotBlank;
//import org.springframework.context.annotation.Primary;
//
//import java.util.Objects;
//
//@Entity
//public class Pet {
//
//    @Id
//    @ManyToOne
//    private long id;
//
//    public Pet() {}
//
//    public Pet(long id) {
//        this.id = id;
//    }
//
//    public long getId() {
//        return id;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (o == null || getClass() != o.getClass()) return false;
//        Pet pet = (Pet) o;
//        return id == pet.id;
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hashCode(id);
//    }
//}
