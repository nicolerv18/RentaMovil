package  com.rentamovil.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import com.rentamovil.model.entity.Person;
import com.rentamovil.model.entity.Reservation;
import com.rentamovil.model.entity.Payment;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    private String message;

    @Column(name = "sent_date")
    private LocalDateTime sentDate;

    @Column(name = "is_read")
    private Boolean isRead;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "maintenance_id")
    private VehicleMaintenance vehicleMaintenance;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;
}