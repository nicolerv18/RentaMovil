package com.rentamovil.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor

public class LoginResponseDTO {
    private String token;
    private String username;
    private String email;
    private Set<String> roles;
}
