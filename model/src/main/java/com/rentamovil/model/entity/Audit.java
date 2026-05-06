package  com.rentamovil.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "audit")
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auditId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String action;

    @Column(name = "affected_table")
    private String affectedTable;

    private LocalDateTime date;
    private String detail;
}
