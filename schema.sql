drop database if exists employee_tracker;

create database employee_tracker;

use employee_tracker;

create table department (
    id int auto_increment not null,
    name varchar(30) not null,
    primary key(id)
);

insert into department (id, name)
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
    department_id int not null,
    primary key(id),
    foreign key(department_id) references department(id)
);

insert into role (id, title, salary, department_id)
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
    role_id int not null,
    manager_id int,
    primary key(id),
	foreign key(role_id) references role(id)
);

insert into employee (id, first_name, last_name, role_id, manager_id)
values
(1, "Jerry", "Thomas", 6, 1),
(2, "Barry", "Kelly", 1, null),
(3, "Delian", "Maxoff", 2, 2),
(4, "Lloyd", "Jefferson", 3, null),
(5, "Clide", "Hill", 4, 4),
(6, "Arthur", "Smith", 4, null),
(7, "Elliot", "Stop", 5, 5),
(8,"Alex", "Jackson", 5, null);