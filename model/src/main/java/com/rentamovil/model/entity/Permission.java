package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;
import com.rentamovil.model.entity.Role;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permission")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long permissionId;

    private String name;
    private String description;

    @ManyToMany(mappedBy = "permissions")
    private List<Role> roles = new ArrayList<>();
}