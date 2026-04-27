package  com.rentamovil.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long personId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @OneToOne(mappedBy = "person")
    private User user;

    @OneToMany(mappedBy = "client")
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<Notification> notifications = new ArrayList<>();
}