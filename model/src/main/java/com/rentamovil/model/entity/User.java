package com.rentamovil.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column (unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @Column (name = "phone")
    private String phone;

    @Column (name = "password_hash")
    private String passwordHash;

    private String status; //macara si esta activo o inactivo

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToOne
    @JoinColumn(name = "person_id")
    private Person person;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),//acuerdese de investigar esto despues
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;
}
