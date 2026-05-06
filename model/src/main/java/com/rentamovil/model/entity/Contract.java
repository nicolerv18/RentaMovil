package  com.rentamovil.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contract")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contractId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToOne
    @JoinColumn(name = "reservation_id", unique = true)
    private Reservation reservation;

    @Column(name = "contract_date")
    private LocalDate contractDate;

    private String terms;
    private Double amount;
    private String description;
}