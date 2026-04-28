
package com.rentamovil.repository;
import main.java.com.rentamovil.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
    List<Role> findByDescription(String description);

    boolean existsByName(String name);
    boolean existsByDescription(String description);

    List<Role> findByUsers_UserId(Long userId);
    List<Role> findByPermissions_PermissionId(Long permissionId);
}
    
