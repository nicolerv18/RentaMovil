package  com.rentamovil.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gps")
public class Gps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gpsId;

    private String serial;
    private String model;
    private Boolean available;

    @OneToOne(mappedBy = "gps")
    private Rental rental;
}