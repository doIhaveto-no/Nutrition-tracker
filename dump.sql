/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.1.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: nutrition_tracker
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Current Database: `nutrition_tracker`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `nutrition_tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

USE `nutrition_tracker`;

--
-- Table structure for table `food_ingredients`
--

DROP TABLE IF EXISTS `food_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_ingredients` (
  `food_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `grams` float unsigned DEFAULT NULL,
  KEY `fk_food_id` (`food_id`),
  KEY `fk_ingredient_id` (`ingredient_id`),
  CONSTRAINT `fk_food_id` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_ingredients`
--

LOCK TABLES `food_ingredients` WRITE;
/*!40000 ALTER TABLE `food_ingredients` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `food_ingredients` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `foods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_sr` varchar(48) DEFAULT NULL,
  `name_en` varchar(48) DEFAULT NULL,
  `kcal` float unsigned DEFAULT NULL,
  `protein` float unsigned DEFAULT NULL,
  `carbohydrates` float unsigned DEFAULT NULL,
  `fats` float unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(24) DEFAULT NULL,
  `name_sr` varchar(24) DEFAULT NULL,
  `kcal` float unsigned DEFAULT NULL,
  `protein` float unsigned DEFAULT NULL,
  `carbohydrates` float unsigned DEFAULT NULL,
  `fats` float unsigned DEFAULT NULL,
  `type` enum('fruit','vegetable','animal product') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `ingredients` VALUES
(1,'Banana','Banana',89,1.1,23,0.3,'fruit'),
(2,'Apple','Jabuka',52,1.1,14,0.2,'fruit'),
(3,'Pear','Kruška',58,0.4,13.8,0,'fruit'),
(4,'Cherry','Trešnja',63,1.1,14,0.3,'fruit'),
(5,'Peach','Breskva',37,0.6,9.1,0,'fruit'),
(6,'Strawberry','Jagoda',32,0.7,7.7,0.3,'fruit'),
(7,'Raspberry','Malina',52,1.2,11.9,0.7,'fruit'),
(9,'Plum','Sljiva',50,0.8,11.2,0.2,'fruit'),
(10,'Quince','Dunja',57,0.4,13.8,0,'fruit'),
(11,'Nectarine','Nektarina',44.2,1.1,10.6,0.3,'fruit'),
(12,'Apricot','Kajsija',48,1.4,11.1,0.4,'fruit'),
(13,'Blackberry','Kupina',43,1.4,10,0.5,'fruit'),
(14,'Blueberry','Borovnica',57,0.7,14,0.3,'fruit'),
(15,'Orange','Pomorandža',47,0.9,12,0.1,'fruit'),
(16,'Tangerine','Mandarina',48,1,11,0,'fruit'),
(17,'Lemon','Limun',43,0.7,9,0.5,'fruit'),
(18,'Grapefruit','Grejpfrut',42,1,11,0,'fruit'),
(19,'Pineapple','Ananas',62,0.4,15,0,'fruit'),
(20,'Mango','Mango',60,0.8,15,0.4,'fruit'),
(21,'Papaya','Papaja',44,0.4,10.8,0.1,'fruit'),
(22,'Kiwi','Kivi',50,1,11,0.2,'fruit'),
(23,'Watermelon','Lubenica',30,0.6,7.5,0,'fruit'),
(24,'Grapes black','Grožđe belo',60,0.6,15.3,0,'fruit'),
(25,'Grapes white','Grožđe crno',54,0.5,13.5,0.1,'fruit'),
(26,'Coconut','Kokos',354,3.3,15,33,'fruit'),
(27,'Melon','Dinja',34,0.8,7.9,0.1,'vegetable'),
(28,'Carrots','Šargarepa',41,0.9,9.6,0.2,'vegetable'),
(29,'Beetroot','Cvekla',37,2,8,0,'vegetable'),
(30,'Swiss chard','Blitva',27,1.2,5.1,0.2,'vegetable'),
(31,'Green beans','Boranija',80.5,7.9,7.2,2.1,'vegetable'),
(32,'Broccoli','Brokoli',33,3,4,0.4,'vegetable'),
(33,'Pumpkin','Bundeva',26,0.8,6.2,0.1,'vegetable'),
(34,'Red pepper','Paprika crvena',28,1,5,0,'vegetable'),
(35,'Yellow bell pepper','Paprika zuta',23,0.5,3.1,0.3,'vegetable'),
(36,'Peas','Grašak',93,7,14,1,'vegetable'),
(37,'Cucumber','Krastavac',14,0.7,1.8,0.5,'vegetable'),
(38,'Potatoes','Krompir',77,2,17,0.1,'vegetable'),
(39,'Corn','Kukuruz',73,2.7,11,1.4,'vegetable'),
(40,'Onion','Luk crni',40,1.1,9,0.1,'vegetable'),
(41,'Garlic','Luk beli',136,6,28,0.5,'vegetable'),
(42,'Parsley','Peršun',36,3,6.3,0.8,'vegetable'),
(43,'Leeks','Praziluk',60,1.5,14.2,0.3,'vegetable'),
(44,'Green lettuce','Salata zelena',14,1,2,0,'vegetable'),
(45,'Spinach','Spanać',26,3.1,0.5,0.8,'vegetable'),
(46,'Zucchini','Tikvica',17,1.2,3.1,0.3,'vegetable'),
(47,'Egg','Jaja',151,13,0,11,'animal product'),
(48,'Cow milk','Kravlje mleko',55,3,4.5,2.8,'animal product'),
(49,'Parmesan','Parmezan',367,34,0,34,'animal product'),
(50,'Cheddar','Čedar',416,25.4,0.1,34.9,'animal product'),
(51,'Gouda','Gauda',344,23,0.1,28,'animal product'),
(52,'Feta','Feta',264,14.2,4.1,21.3,'animal product'),
(53,'Beef','Govedina',467,9,62,21,'animal product'),
(54,'Veal','Teletina',115,21.3,0,3.1,'animal product'),
(55,'Pork','Svinjetina',245,18,0,18.8,'animal product'),
(56,'Mutton','Ovčetina',293,17,0,25,'animal product'),
(57,'Chicken','Piletina',66.1,13.3,1,1.1,'animal product'),
(58,'Turkey','Ćuretina',104,17.1,4.2,1.7,'animal product'),
(59,'Goose','Meso guske',198,22,0,12.3,'animal product'),
(60,'Sausages','Kobasice',89,16,0,2,'animal product'),
(61,'Ham','Šunka',84,16.5,0.3,1.9,'animal product'),
(62,'Bacon','Slanina',540,40,1,42,'animal product'),
(63,'Prosciutto','Pršuta',203,30,0.4,8.7,'animal product'),
(64,'Yogurt','Jogurt',41,3.3,4,1,'animal product'),
(65,'Sour milk','Kiselo mleko',60,3.2,4.6,3.2,'animal product'),
(66,'Sour cream','Pavlaka',198,2.6,2.5,20,'animal product'),
(67,'Butter','Puter',717,0.8,0.1,81.1,'animal product'),
(68,'Salmon','Losos',217,22.5,0,13.4,'animal product'),
(69,'Mackerel','Skuša',184,19,0,12,'animal product'),
(70,'Shells','Školjke',82,12,2,2.9,'animal product'),
(71,'Crabs','Rakovi',78,14,2.7,1.1,'animal product'),
(72,'Squid','Lignje',77,16,1,1,'animal product');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-01-16 18:37:38
