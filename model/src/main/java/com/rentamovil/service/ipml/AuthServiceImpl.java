package com.rentamovil.service.ipml;



import com.rentamovil.config.JwtUtil;
import com.rentamovil.model.dto.LoginResponseDTO;
import com.rentamovil.model.dto.RegisterRequestDTO;
import com.rentamovil.model.entity.Role;
import com.rentamovil.repository.RoleRepository;
import com.rentamovil.repository.UserRepository;
import com.rentamovil.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.UnknownNullability;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.rentamovil.model.entity.User;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RoleRepository roleRepository;

    @Override
    public LoginResponseDTO login(com.rentamovil.model.dto.LoginRequestDTO request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User no found"));
        if (!"ACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("User inactive");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())){
            throw new RuntimeException("Password is incorrect");
        }
        Set<String> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), roles);

        return new LoginResponseDTO(token, user.getUsername(), user.getEmail(), roles);
    }

    @Override
    public void register(@UnknownNullability RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("the email in use");
        }

        Role rolCliente = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Rol USER not found"));

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .status("ACTIVE")
                .lastLogin(LocalDateTime.now())
                .roles(Set.of(rolCliente))
                .build();

        userRepository.save(user);
    }

}

