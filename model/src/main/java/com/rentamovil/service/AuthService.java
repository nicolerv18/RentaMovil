package com.rentamovil.service;


import com.rentamovil.model.dto.LoginRequestDTO;
import com.rentamovil.model.dto.LoginResponseDTO;
import com.rentamovil.model.dto.RegisterRequestDTO;

public interface AuthService  {
    LoginResponseDTO login(LoginRequestDTO request);
    void register(RegisterRequestDTO request);
}
