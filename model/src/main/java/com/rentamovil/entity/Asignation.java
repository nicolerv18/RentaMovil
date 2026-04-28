package  com.rentamovil.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "asignation")
public class Asignation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long asignationId;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Column(name = "checkIn_date")
    private LocalDate checkInDate;

    @Column(name = "checkOut_date")
    private LocalDate checkOutDate;
}