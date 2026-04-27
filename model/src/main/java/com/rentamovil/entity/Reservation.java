package  com.rentamovil.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Person client;

    @Column(name = "reservation_date")
    private LocalDate reservationDate;

    private String status;

    @OneToOne(mappedBy = "reservation")
    private Rental rental;

    @OneToOne(mappedBy = "reservation")
    private Contract contract;

    @OneToMany(mappedBy = "reservation")
    private List<ReservationDetail> details = new ArrayList<>();

    @OneToMany(mappedBy = "reservation")
    private List<Payment> payments = new ArrayList<>();

    @OneToMany(mappedBy = "reservation")
    private List<Notification> notifications = new ArrayList<>();
}