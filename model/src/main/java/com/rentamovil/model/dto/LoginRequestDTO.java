package com.rentamovil.model.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Data
public class LoginRequestDTO {
    private String username;
    private  String password;

}
