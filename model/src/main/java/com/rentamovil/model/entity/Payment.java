package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.rentamovil.model.entity.Reservation;
import com.rentamovil.model.entity.PaymentMethod;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    private Double amount;

    @ManyToOne
    @JoinColumn(name = "method_id")
    private PaymentMethod paymentMethod;
}