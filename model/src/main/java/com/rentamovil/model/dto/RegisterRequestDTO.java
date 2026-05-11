package com.rentamovil.model.dto;

import jdk.jfr.DataAmount;
import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String username;
    private String email;
    private String phone;
    private String password;
}
