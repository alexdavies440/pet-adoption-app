package com.example.pet_app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterDto extends LoginDto {

    @NotBlank
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @NotBlank
//    @Size(min = 5, max = 30, message = "Password must be between 5 and 30 characters")
    private String verifyPassword;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
