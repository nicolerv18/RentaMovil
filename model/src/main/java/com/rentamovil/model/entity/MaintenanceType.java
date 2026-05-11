package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "maintenance_type")
public class MaintenanceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long maintenanceTypeId;

    private String name;
    private String description;

    @OneToMany(mappedBy = "maintenanceType")
    private List<VehicleMaintenance> vehicleMaintenances = new ArrayList<>();
}