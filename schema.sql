drop database if exists employee_tracker;

create database employee_tracker;

use employee_tracker;

create table department (
    id int auto_increment not null,
    name varchar(30) not null,
    primary key(id)
);

insert into deparment (id, name)
values
(1, "Information Technologies"),
(2, "Human Resources"),
(3, "Administration"),
(4, "Operations"),
(5, "Accounting");

create table role (
    id int auto_increment not null,
    title varchar(30) not null,
    salary decimal not null,
    department_id int foreign key not null,
    primary key(id)
);

insert into role (id, title, salary, deparment_id)
values
(1, "Software Developer", 100000.00, 1),
(2, "Recruiter", 65000.00, 2),
(3, "Business Analyst", 75000.00, 3),
(4, "Operations Manager", 125000.00, 4),
(5, "Executive Accountant", 90000.00,5),
(6, "Senior Software Developer", 130000.00, 1);

create table employee (
    id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int foreign key not null,
    manager_id int foreign key,
    primary key(id);
);

insert into employee (id, first_name, last_name, role_id, manager_id)
values
("Jerry", "Thomas", 6, 1),
("Barry", "Kelly", 1),
("Delian", "Maxoff", 2, 2),
("Lloyd", "Jefferson", 3),
("Clide", "Hill", 4, 4),
("Arthur", "Smith", 4),
("Elliot", "Stop", 5, 5),
("Alex", "Jackson", 5);