CREATE DATABASE passwordGenerator;

USE passwordGenerator;

create table savePasswords ( 
    passwordID int auto_increment primary key,
    passwordHASH TEXT
);
