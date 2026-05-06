package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "branch")
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long branchId;

    private String name;
    private String address;
    private String city;
    private String phone;
    private String shedules;

    @OneToMany(mappedBy = "branch")
    private List<Person> persons = new ArrayList<>();

    @OneToMany(mappedBy = "branch")
    private List<Vehicle> vehicles = new ArrayList<>();

    @OneToMany(mappedBy = "branch")
    private List<Asignation> asignations = new ArrayList<>();
}