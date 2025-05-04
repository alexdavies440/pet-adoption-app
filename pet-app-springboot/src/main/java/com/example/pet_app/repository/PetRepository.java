package com.example.pet_app.repository;

import com.example.pet_app.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    Optional<Pet> findByPetIdAndFollowerId(Long petId, Long followerId);
}
