
package com.rentamovil.repository;

import com.rentamovil.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPerson_PersonId(Long personId);
    Optional<User> findByUsername(String username);


    List<User> findByStatus(String status);
    List<User> findByLastLogin(LocalDateTime lastLogin);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    boolean existsByPerson_PersonId(Long personId);


    List<User> findByRoles_RoleId(Long roleId);
}
