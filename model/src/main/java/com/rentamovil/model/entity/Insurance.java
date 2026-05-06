package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "insurance")
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long insuranceId;

    @OneToOne
    @JoinColumn(name = "vehicle_id", unique = true)
    private Vehicle vehicle;

    private String policy;

    @Column(name = "insurance")
    private String insuranceCompany;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    private String status;
}