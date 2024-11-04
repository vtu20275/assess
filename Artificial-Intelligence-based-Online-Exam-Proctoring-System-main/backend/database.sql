CREATE DATABASE quizo; /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */
CONNECT TO quizo;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quizo
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sign_up`
--
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE sign_up (
  email varchar(105) NOT NULL UNIQUE,
  username varchar(100) NOT NULL,
  password varchar(150) NOT NULL,
  PRIMARY KEY (email)
);
  /*UNIQUE KEY username_UNIQUE (username)*/
/*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;*/
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sign_up`
--

UPDATE sign_up WRITE;
/*!40000 ALTER TABLE `sign_up` DISABLE KEYS */;
/*INSERT INTO sign_up VALUES (('divyansh01@gmail.com','Divya23','DivyaTiwari'),('hemant56@gmail.com','Hemant329','Hemant123'),('kumar1166@gmail.com','kris6','Krishna1'),('parth529@gmail.com','Parth2839','Parth@456'),('quizo_admin@gmail.com','ExamPortal','Admin'));*/
INSERT INTO sign_up (email, username, password) VALUES 
('divyansh01@gmail.com', 'DivyaTiwari', 'Divya23');

INSERT INTO sign_up (email, username, password) VALUES 
('hemant56@gmail.com', 'Hemant123', 'Hemant329');

INSERT INTO sign_up (email, username, password) VALUES 
('kumar1166@gmail.com', 'Krishna1', 'kris6');

INSERT INTO sign_up (email, username, password) VALUES 
('parth529@gmail.com', 'Parth@456', 'Parth2839');

INSERT INTO sign_up (email, username, password) VALUES 
('quizo_admin@gmail.com', 'Admin', 'ExamPortal');

UPDATE sign_up



/*!40000 ALTER TABLE `sign_up` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-04 21:49:56
