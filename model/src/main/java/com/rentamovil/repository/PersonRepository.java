package com.rentamovil.repository;

import com.rentamovil.model.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
/*

    Optional<Person> findByEmail(String email);
    Optional<Person> findByPhone(String phone);
    List<Person> findByFirstName(String firstName);
    List<Person> findByLastName(String lastName);

    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

    
    Optional<Person> findByBranch_BranchId(Long branchId);
*/

    
}