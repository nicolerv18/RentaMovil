

CREATE TABLE branch (
  branch_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(150),
  city VARCHAR(50),
  phone VARCHAR(20),
  shedules VARCHAR(100)
);

CREATE TABLE person (
  person_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  branch_id INT,
  FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  person_id INT UNIQUE,
  username VARCHAR(50),
  password VARCHAR(255),
  status VARCHAR(20),
  last_login DATETIME,
  FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

CREATE TABLE role (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(150)
);

CREATE TABLE permission (
  permission_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(150)
);

CREATE TABLE role_permission (
  role_id INT,
  permission_id INT,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
);

CREATE TABLE user_role (
  user_id INT,
  role_id INT,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE audit (
  audit_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100),
  affected_table VARCHAR(100),
  date DATETIME,
  detail VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);




CREATE TABLE vehicle (
  vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
  plate VARCHAR(20),
  brand VARCHAR(50),
  model VARCHAR(50),
  year INT,
  type VARCHAR(50),
  status VARCHAR(20),
  mileage DOUBLE,
  price DOUBLE,
  branch_id INT,
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

CREATE TABLE asignation (
  asignation_id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT,
  branch_id INT,
  checkIn_date DATE,
  checkOut_date DATE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id),
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

CREATE TABLE Location (
  location_id INT AUTO_INCREMENT PRIMARY KEY,
  latitude VARCHAR(50),
  longitude VARCHAR(50),
  timestamp DATETIME,
  vehicle_id INT,
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE route (
  route_id INT AUTO_INCREMENT PRIMARY KEY,
  location_id INT,
  distance DOUBLE,
  estimated_time DOUBLE,
  origin VARCHAR(100),
  destination VARCHAR(100),
  FOREIGN KEY (location_id) REFERENCES location(location_id)
);

CREATE TABLE vehicle_status_history (
  history_id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT,
  status VARCHAR(20),
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
);
CREATE TABLE reservation (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  reservation_date DATE,
  status VARCHAR(20),
  FOREIGN KEY (client_id) REFERENCES person(person_id)
);

CREATE TABLE reservation_detail (
  detail_id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT,
  vehicle_id INT,
  ResponsibleName VARCHAR(100),
  start_date DATE,
  end_date DATE,
  pickupTime TIME,
  returnTime TIME,
  pickupLocation VARCHAR(100),
  returnLocation VARCHAR(100),
  amountToPay DOUBLE,
  totalValue DOUBLE,
  FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
);
CREATE TABLE gps (
  gps_id INT AUTO_INCREMENT PRIMARY KEY,
  serial VARCHAR(50),
  model VARCHAR(50),
  available BOOLEAN
);

CREATE TABLE rental (
  rental_id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT UNIQUE,
  route_id INT,
  location_id INT,
  gps_id INT,
  status VARCHAR(20),
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id),
  FOREIGN KEY (route_id) REFERENCES route(route_id),
  FOREIGN KEY (location_id) REFERENCES location(location_id),
  FOREIGN KEY (gps_id) REFERENCES gps(gps_id)
);

CREATE TABLE contract (
  contract_id INT AUTO_INCREMENT PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  reservation_id INT UNIQUE,
  contract_date DATE,
  terms VARCHAR(255),
  amount DOUBLE,
  description VARCHAR(255),
  FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id)
);

CREATE TABLE maintenance_type (
  maintenance_type_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(150)
);

CREATE TABLE vehicle_maintenance (
  maintenance_id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT,
  maintenance_type_id INT,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20),
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id),
  FOREIGN KEY (maintenance_type_id) REFERENCES maintenance_type(maintenance_type_id)
);

CREATE TABLE insurance (
  insurance_id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT UNIQUE,
  policy VARCHAR(100),
  insurance VARCHAR(100),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20),
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
);


CREATE TABLE payment_method (
  method_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE payment (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT,
  payment_date DATE,
  amount DOUBLE,
  method_id INT,
  FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id),
  FOREIGN KEY (method_id) REFERENCES payment_method(method_id)
);


CREATE TABLE notification (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  person_id INT,
  message VARCHAR(255),
  sent_date DATETIME,
  is_read BOOLEAN,
  reservation_id INT,
  maintenance_id INT,
  payment_id INT,
  contract_id INT,
  insurance_id INT,
  FOREIGN KEY (person_id) REFERENCES person(person_id),
  FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id),
  FOREIGN KEY (maintenance_id) REFERENCES vehicle_maintenance(maintenance_id),
  FOREIGN KEY (payment_id) REFERENCES payment(payment_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id),
  FOREIGN KEY (insurance_id) REFERENCES insurance(insurance_id)
);


