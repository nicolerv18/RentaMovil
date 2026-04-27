


-- Branch
INSERT INTO branch (name, address, city, phone, shedules) VALUES
('Sucursal Neiva', 'Calle 1 #10-20', 'Neiva', '3001111111', '8am-6pm'),
('Sucursal Bogota', 'Carrera 15 #80-30', 'Bogota', '3002222222', '8am-6pm'),
('Sucursal Cartagena', 'Av Siempre Viva 123', 'Cartagena', '3003333333', '8am-6pm');

-- Person
INSERT INTO person (first_name, last_name, email, phone, branch_id) VALUES
('David', 'Erez', 'david@gmail.com', '3101111111', 1),
('Thiago', 'Rojas', 'thiago@gmail.com', '3102222222', 2),
('Nicole', 'Ramirez', 'nicole@gmail.com', '3103333333', 3);

-- User
INSERT INTO users (person_id, username, password_hash, status, last_login) VALUES
(1, 'DavidErez', 'hash1', 'ACTIVE', NOW()),
(2, 'Thiago2008', '1234', 'ACTIVE', NOW()),
(3, 'NicoleR', 'hash3', 'INACTIVE', NOW());

-- Role
INSERT INTO role (name, description) VALUES
('ADMIN', 'Administrador del sistema'),
('CLIENT', 'Cliente del sistema'),
('EMPLOYEE', 'Empleado');

-- Permission
INSERT INTO permission (name, description) VALUES
('CREATE', 'Crear registros'),
('READ', 'Leer registros'),
('DELETE', 'Eliminar registros');

-- Role_Permission
INSERT INTO role_permission VALUES
(1,1),(1,2),(1,3);

-- User_Role
INSERT INTO user_role VALUES
(1,1),(2,2),(3,3);

-- Audit
INSERT INTO audit (user_id, action, affected_table, date, detail) VALUES
(1, 'INSERT', 'Vehicle', NOW(), 'Creación de vehículo'),
(2, 'UPDATE', 'Reservation', NOW(), 'Actualización reserva'),
(3, 'DELETE', 'User', NOW(), 'Eliminación usuario');


-- Vehicle
INSERT INTO vehicle (plate, brand, model, year, type, status, mileage, price, branch_id) VALUES
('TXL123', 'Toyota', 'TXL', 2022, 'SUV', 'AVAILABLE', 10000, 150000, 1),
('SAN456', 'Renault', 'Sandero', 2021, 'Hatchback', 'AVAILABLE', 20000, 90000, 2),
('MAZ789', 'Mazda', 'Mazda 3', 2023, 'Sedan', 'RENTED', 5000, 120000, 3);

-- Asignation
INSERT INTO asignation (vehicle_id, branch_id, checkIn_date, checkOut_date) VALUES
(1,1,'2026-01-01','2026-01-10'),
(2,2,'2026-02-01','2026-02-10'),
(3,3,'2026-03-01','2026-03-10');

-- Location
INSERT INTO location (latitude, longitude, timestamp, vehicle_id) VALUES
('4.60971','-74.08175',NOW(),1),
('2.9386','-75.2811',NOW(),2),
('10.3910','-75.4794',NOW(),3);

-- Route
INSERT INTO route (location_id, distance, estimated_time, origin, destination) VALUES
(1, 10.5, 20, 'Centro', 'Norte'),
(2, 5.2, 15, 'Sur', 'Centro'),
(3, 20.0, 40, 'Aeropuerto', 'Hotel');

-- Vehicle_Status_History
INSERT INTO vehicle_status_history (vehicle_id, status, start_date, end_date) VALUES
(1,'AVAILABLE','2026-01-01','2026-01-05'),
(2,'MAINTENANCE','2026-02-01','2026-02-05'),
(3,'RENTED','2026-03-01','2026-03-05');


-- Reservation
INSERT INTO reservation (client_id, reservation_date, status) VALUES
(1,'2026-04-01','ACTIVE'),
(2,'2026-04-02','ACTIVE'),
(3,'2026-04-03','CANCELLED');

-- Reservation_Detail
INSERT INTO reservation_detail (reservation_id, vehicle_id, ResponsibleName, start_date, end_date, pickupTime, returnTime, pickupLocation, returnLocation, amountToPay, totalValue) VALUES
(1,1,'David Erez','2026-04-05','2026-04-10','08:00','18:00','Neiva','Neiva',50000,250000),
(2,2,'Thiago Rojas','2026-04-06','2026-04-11','09:00','17:00','Bogota','Bogota',40000,200000),
(3,3,'Nicole Ramirez','2026-04-07','2026-04-12','10:00','16:00','Cartagena','Cartagena',60000,300000);

-- Gps
INSERT INTO gps (serial, model, available) VALUES
('GPS001','Garmin',TRUE),
('GPS002','TomTom',TRUE),
('GPS003','Xiaomi',FALSE);

-- Rental
INSERT INTO rental (reservation_id, route_id, location_id, gps_id, status, start_date, end_date) VALUES
(1,1,1,1,'ACTIVE','2026-04-05','2026-04-10'),
(2,2,2,2,'ACTIVE','2026-04-06','2026-04-11'),
(3,3,3,3,'FINISHED','2026-04-07','2026-04-12');

-- Contract
INSERT INTO contract (start_date, end_date, reservation_id, contract_date, terms, amount, description) VALUES
('2026-04-05','2026-04-10',1,'2026-04-01','Terminos basicos',250000,'Contrato 1'),
('2026-04-06','2026-04-11',2,'2026-04-02','Terminos basicos',200000,'Contrato 2'),
('2026-04-07','2026-04-12',3,'2026-04-03','Terminos basicos',300000,'Contrato 3');

-- Maintenance_Type
INSERT INTO maintenance_Type (name, description) VALUES
('Preventivo','Mantenimiento preventivo'),
('Correctivo','Mantenimiento correctivo'),
('General','Revision general');

-- Vehicle_Maintenance
INSERT INTO vehicle_Maintenance (vehicle_id, maintenance_type_id, start_date, end_date, status) VALUES
(1,1,'2026-01-01','2026-01-02','DONE'),
(2,2,'2026-02-01','2026-02-02','DONE'),
(3,3,'2026-03-01','2026-03-02','PENDING');

-- Insurance
INSERT INTO insurance (vehicle_id, policy, insurance, start_date, end_date, status) VALUES
(1,'POL123','Sura','2026-01-01','2027-01-01','ACTIVE'),
(2,'POL456','Mapfre','2026-01-01','2027-01-01','ACTIVE'),
(3,'POL789','Bolivar','2026-01-01','2027-01-01','EXPIRED');


-- Payment_Method
INSERT INTO payment_method (name) VALUES
('Efectivo'),
('Tarjeta'),
('Transferencia');

-- Payment
INSERT INTO payment (reservation_id, payment_date, amount, method_id) VALUES
(1,'2026-04-01',250000,1),
(2,'2026-04-02',200000,2),
(3,'2026-04-03',300000,3);


INSERT INTO notification (person_id, message, sent_date, is_read, reservation_id, maintenance_id, payment_id, contract_id, insurance_id) VALUES
(1,'Reserva confirmada',NOW(),FALSE,1,1,1,1,1),
(2,'Pago recibido',NOW(),TRUE,2,2,2,2,2),
(3,'Mantenimiento pendiente',NOW(),FALSE,3,3,3,3,3);

