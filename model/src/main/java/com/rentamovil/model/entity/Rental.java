package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.rentamovil.model.entity.Reservation;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rental")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    @OneToOne
    @JoinColumn(name = "reservation_id", unique = true)
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "gps_id")
    private Gps gps;

    private String status;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
}