CREATE DATABASE passwordGenerator;

USE passwordGenerator;

create table savePasswords ( 
    passwordID int auto_increment primary key,
    passwordHASH TEXT
);


DELIMITER $$

CREATE PROCEDURE `getAllPasswords`()
BEGIN
    SELECT * FROM savePasswords;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE `getOnePassword`(IN hash TEXT)
BEGIN
    SELECT * FROM savePasswords where passwordHASH = hash;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE `insertNewPassword`(IN hash TEXT)
BEGIN
    INSERT INTO savePasswords (passwordHASH) values(hash);
END$$

DELIMITER ;
