package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    private String plate;
    private String brand;
    private String model;
    private Integer year;
    private String type;
    private String status;
    private Double mileage;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @OneToMany(mappedBy = "vehicle")
    private List<Asignation> asignations = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle")
    private List<Location> locations = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle")
    private List<VehicleStatusHistory> statusHistories = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle")
    private List<ReservationDetail> reservationDetails = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle")
    private List<VehicleMaintenance> maintenances = new ArrayList<>();

    @OneToOne(mappedBy = "vehicle")
    private Insurance insurance;
}