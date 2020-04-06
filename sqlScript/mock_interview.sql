-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: mock
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `interview`
--

DROP TABLE IF EXISTS `interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `intervieweeId` int(11) DEFAULT NULL,
  `interviewerId` int(11) DEFAULT NULL,
  `title1Id` int(11) DEFAULT NULL,
  `title2Id` int(11) DEFAULT NULL,
  `feedback1Id` int(11) DEFAULT NULL,
  `feedback2Id` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `intervieweeEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview`
--

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES (40,'Data Structures and Algorithms','2020-02-12 19:40:00',7,8,NULL,NULL,NULL,NULL,1,NULL,'12@qq.com'),(41,'Data Structures and Algorithms','2020-02-12 19:40:00',8,7,NULL,NULL,NULL,NULL,1,NULL,'1233333@qq.com'),(42,'Data Structures and Algorithms','2020-02-12 20:02:00',8,NULL,NULL,NULL,NULL,NULL,0,NULL,'1233333@qq.com'),(43,'Back end','2020-02-18 22:05:00',8,NULL,NULL,NULL,NULL,NULL,0,NULL,'1233333@qq.com'),(44,'Testing','2020-04-05 20:30:00',10,11,NULL,NULL,NULL,NULL,1,NULL,'987@qq.com'),(45,'Testing','2020-04-05 20:30:00',11,10,NULL,NULL,NULL,NULL,1,NULL,'1243419017@qq.com');
/*!40000 ALTER TABLE `interview` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-06 23:19:23
