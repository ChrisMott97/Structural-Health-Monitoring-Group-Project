-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: database-db-1    Database: humber_bridge
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `humber_bridge`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `humber_bridge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `humber_bridge`;

--
-- Table structure for table `data_availability`
--

DROP TABLE IF EXISTS `data_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_availability` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `GPH000ED` double DEFAULT NULL,
  `GPH000WD` double DEFAULT NULL,
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `displacements`
--

DROP TABLE IF EXISTS `displacements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `displacements` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `EXH077ED` double DEFAULT NULL COMMENT 'm',
  `EXH077WD` double DEFAULT NULL COMMENT 'm',
  `EXH077dD` double DEFAULT NULL COMMENT 'm',
  `EXB077ED` double DEFAULT NULL COMMENT 'm',
  `EXB077WD` double DEFAULT NULL COMMENT 'm',
  `EXB077dD` double DEFAULT NULL COMMENT 'm',
  `GPH000EDE` double DEFAULT NULL COMMENT 'm',
  `GPH000EDN` double DEFAULT NULL COMMENT 'm',
  `GPH000EDH` double DEFAULT NULL COMMENT 'm',
  `GPH000WDE` double DEFAULT NULL COMMENT 'm',
  `GPH000WDN` double DEFAULT NULL COMMENT 'm',
  `GPH000WDH` double DEFAULT NULL COMMENT 'm',
  `GPH000dDE` double DEFAULT NULL COMMENT 'm',
  `GPH000dDN` double DEFAULT NULL COMMENT 'm',
  `GPH000dDH` double DEFAULT NULL COMMENT 'm',
  `TSH077ED` double DEFAULT NULL COMMENT 'ºC',
  `TSH077WD` double DEFAULT NULL COMMENT 'ºC',
  `TSB077ED` double DEFAULT NULL COMMENT 'ºC',
  `TSB077WD` double DEFAULT NULL COMMENT 'ºC',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `extension_exb077ed`
--

DROP TABLE IF EXISTS `extension_exb077ed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extension_exb077ed` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `EXB077ED` double DEFAULT NULL COMMENT 'm',
  `TSB077ED` double DEFAULT NULL COMMENT 'ºC',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `extension_exb077wd`
--

DROP TABLE IF EXISTS `extension_exb077wd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extension_exb077wd` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `EXB077WD` double DEFAULT NULL COMMENT 'm',
  `TSB077WD` double DEFAULT NULL COMMENT 'ºC',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `extension_exh077ed`
--

DROP TABLE IF EXISTS `extension_exh077ed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extension_exh077ed` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `EXH077ED` double DEFAULT NULL COMMENT 'm',
  `TSH077ED` double DEFAULT NULL COMMENT 'ºC',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `extension_exh077wd`
--

DROP TABLE IF EXISTS `extension_exh077wd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extension_exh077wd` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `EXH077WD` double DEFAULT NULL COMMENT 'm',
  `TSH077WD` double DEFAULT NULL COMMENT 'ºC',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gps`
--

DROP TABLE IF EXISTS `gps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gps` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `GPH000EDE` double DEFAULT NULL COMMENT 'm',
  `GPH000EDN` double DEFAULT NULL COMMENT 'm',
  `GPH000EDH` double DEFAULT NULL COMMENT 'm',
  `GPH000WDE` double DEFAULT NULL COMMENT 'm',
  `GPH000WDN` double DEFAULT NULL COMMENT 'm',
  `GPH000WDH` double DEFAULT NULL COMMENT 'm',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inclination`
--

DROP TABLE IF EXISTS `inclination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inclination` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `INH000CDN` double DEFAULT NULL COMMENT 'mm/m',
  `INH000CDW` double DEFAULT NULL COMMENT 'mm/m',
  `TSH000CDI` double DEFAULT NULL COMMENT 'mm/m',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `meteo_hbb`
--

DROP TABLE IF EXISTS `meteo_hbb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meteo_hbb` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `HBB_WIH000CDS` double DEFAULT NULL COMMENT 'm/s',
  `HBB_WIH000CDD` double DEFAULT NULL COMMENT 'º',
  `HBB_TSH000CDA` double DEFAULT NULL COMMENT 'ºC',
  `HBB_TSH000CDG` double DEFAULT NULL COMMENT 'ºC',
  `HBB_TSH000CDS` double DEFAULT NULL COMMENT 'ºC',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `meteo_noaa`
--

DROP TABLE IF EXISTS `meteo_noaa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meteo_noaa` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `NOAA_TS` double DEFAULT NULL COMMENT 'ºC',
  `NOAA_WIS` double DEFAULT NULL COMMENT 'm/s',
  `NOAA_WID` double DEFAULT NULL COMMENT 'º',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `meteo_scada`
--

DROP TABLE IF EXISTS `meteo_scada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meteo_scada` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `id` double DEFAULT NULL,
  `recordtime` double DEFAULT NULL COMMENT 'seconds after 1970-01-01',
  `servertime` double DEFAULT NULL COMMENT 'seconds after 1970-01-01',
  `air_temperature` double DEFAULT NULL COMMENT 'ºC',
  `air_pressure` double DEFAULT NULL,
  `rain_intensity` double DEFAULT NULL,
  `wind_speed` double DEFAULT NULL,
  `wind_direction` double DEFAULT NULL,
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rot_acc`
--

DROP TABLE IF EXISTS `rot_acc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rot_acc` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `sum` double DEFAULT NULL COMMENT 'g',
  `diff` double DEFAULT NULL COMMENT 'g',
  `tilt_h` double DEFAULT NULL COMMENT 'mm',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `summary`
--

DROP TABLE IF EXISTS `summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summary` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `TSH000ED` double DEFAULT NULL COMMENT 'ºC',
  `TSH000WD` double DEFAULT NULL COMMENT 'ºC',
  `TSH000CDT` double DEFAULT NULL COMMENT 'ºC',
  `TSH000CDB` double DEFAULT NULL COMMENT 'ºC',
  `HBB_WIH000CDS` double DEFAULT NULL COMMENT 'm/s',
  `HBB_WIH000CDD` double DEFAULT NULL COMMENT 'º',
  `HBB_TSH000CDA` double DEFAULT NULL COMMENT 'ºC',
  `HBB_TSH000CDG` double DEFAULT NULL COMMENT 'ºC',
  `HBB_TSH000CDS` double DEFAULT NULL COMMENT 'ºC',
  `NOAA_WIS` double DEFAULT NULL COMMENT 'm/s',
  `NOAA_WID` double DEFAULT NULL COMMENT 'º',
  `NOAA_TS` double DEFAULT NULL COMMENT 'ºC',
  `WIH000CDS` double DEFAULT NULL COMMENT 'm/s',
  `WIH000CDD` double DEFAULT NULL COMMENT 'º',
  `GPH000EDE` double DEFAULT NULL COMMENT 'm',
  `GPH000EDN` double DEFAULT NULL COMMENT 'm',
  `GPH000EDH` double DEFAULT NULL COMMENT 'm',
  `GPH000WDE` double DEFAULT NULL COMMENT 'm',
  `GPH000WDN` double DEFAULT NULL COMMENT 'm',
  `GPH000WDH` double DEFAULT NULL COMMENT 'm',
  `GPH000dDE` double DEFAULT NULL COMMENT 'm',
  `GPH000dDN` double DEFAULT NULL COMMENT 'm',
  `GPH000dDH` double DEFAULT NULL COMMENT 'm',
  `EXH077ED` double DEFAULT NULL COMMENT 'm',
  `EXH077WD` double DEFAULT NULL COMMENT 'm',
  `EXB077ED` double DEFAULT NULL COMMENT 'm',
  `EXB077WD` double DEFAULT NULL COMMENT 'm',
  `EXH077dD` double DEFAULT NULL COMMENT 'm',
  `EXB077dD` double DEFAULT NULL COMMENT 'm',
  `GPH000EDE_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000EDN_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000EDH_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000WDE_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000WDN_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000WDH_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000dDE_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000dDN_RMS` double DEFAULT NULL COMMENT 'm',
  `GPH000dDH_RMS` double DEFAULT NULL COMMENT 'm',
  `EXH077ED_RMS` double DEFAULT NULL COMMENT 'm',
  `EXH077WD_RMS` double DEFAULT NULL COMMENT 'm',
  `EXB077ED_RMS` double DEFAULT NULL COMMENT 'm',
  `EXB077WD_RMS` double DEFAULT NULL COMMENT 'm',
  `EXH077dD_RMS` double DEFAULT NULL COMMENT 'm',
  `EXB077dD_RMS` double DEFAULT NULL COMMENT 'm',
  `TSH077ED` double DEFAULT NULL COMMENT 'ºC',
  `TSH077WD` double DEFAULT NULL COMMENT 'ºC',
  `TSB077ED` double DEFAULT NULL COMMENT 'ºC',
  `TSB077WD` double DEFAULT NULL COMMENT 'ºC',
  `INH000CDN` double DEFAULT NULL COMMENT 'mm/m',
  `INH000CDW` double DEFAULT NULL COMMENT 'mm/m',
  `INH000CDN_RMS` double DEFAULT NULL COMMENT 'mm/m',
  `INH000CDW_RMS` double DEFAULT NULL COMMENT 'mm/m',
  `TSH000CDI` double DEFAULT NULL COMMENT 'ºC',
  `RMS_VE` double DEFAULT NULL COMMENT 'mg',
  `RMS_VW` double DEFAULT NULL COMMENT 'mg',
  `RMS_H` double DEFAULT NULL COMMENT 'mg',
  `RMS_VM` double DEFAULT NULL COMMENT 'mg',
  `RMS_VS1` double DEFAULT NULL COMMENT 'mg',
  `RMS_VA1` double DEFAULT NULL COMMENT 'mg',
  `RMS_VS2a` double DEFAULT NULL COMMENT 'mg',
  `RMS_VS2b` double DEFAULT NULL COMMENT 'mg',
  `RMS_VA2` double DEFAULT NULL COMMENT 'mg',
  `RMS_VS3` double DEFAULT NULL COMMENT 'mg',
  `RMS_TS1` double DEFAULT NULL COMMENT 'mg',
  `RMS_VA3` double DEFAULT NULL COMMENT 'mg',
  `RMS_VS4` double DEFAULT NULL COMMENT 'mg',
  `RMS_TA1` double DEFAULT NULL COMMENT 'mg',
  `RMS_VA4` double DEFAULT NULL COMMENT 'mg',
  `RMS_VS5` double DEFAULT NULL COMMENT 'mg',
  `RMS_TS2` double DEFAULT NULL COMMENT 'mg',
  `RMS_VA5` double DEFAULT NULL COMMENT 'mg',
  `RMS_LS1` double DEFAULT NULL COMMENT 'mg',
  `RMS_LA1` double DEFAULT NULL COMMENT 'mg',
  `RMS_LS2a` double DEFAULT NULL COMMENT 'mg',
  `RMS_LS2b` double DEFAULT NULL COMMENT 'mg',
  `RMS_LS2c` double DEFAULT NULL COMMENT 'mg',
  `RMS_LA2a` double DEFAULT NULL COMMENT 'mg',
  `RMS_LA2b` double DEFAULT NULL COMMENT 'mg',
  `RMS_LA2c` double DEFAULT NULL COMMENT 'mg',
  `RMS_LS2d` double DEFAULT NULL COMMENT 'mg',
  `RMS_LS3` double DEFAULT NULL COMMENT 'mg',
  `FREQ_VS1` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VA1` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VS2a` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VS2b` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VA2` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VS3` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_TS1` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VA3` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VS4` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_TA1` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VA4` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VS5` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_TS2` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_VA5` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LS1` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LA1` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LS2a` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LS2b` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LS2c` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LA2a` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LA2b` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LA2c` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LS2d` double DEFAULT NULL COMMENT 'Hz',
  `FREQ_LS3` double DEFAULT NULL COMMENT 'Hz',
  `DAMP_VS1` double DEFAULT NULL COMMENT '%',
  `DAMP_VA1` double DEFAULT NULL COMMENT '%',
  `DAMP_VS2a` double DEFAULT NULL COMMENT '%',
  `DAMP_VS2b` double DEFAULT NULL COMMENT '%',
  `DAMP_VA2` double DEFAULT NULL COMMENT '%',
  `DAMP_VS3` double DEFAULT NULL COMMENT '%',
  `DAMP_TS1` double DEFAULT NULL COMMENT '%',
  `DAMP_VA3` double DEFAULT NULL COMMENT '%',
  `DAMP_VS4` double DEFAULT NULL COMMENT '%',
  `DAMP_TA1` double DEFAULT NULL COMMENT '%',
  `DAMP_VA4` double DEFAULT NULL COMMENT '%',
  `DAMP_VS5` double DEFAULT NULL COMMENT '%',
  `DAMP_TS2` double DEFAULT NULL COMMENT '%',
  `DAMP_VA5` double DEFAULT NULL COMMENT '%',
  `DAMP_LS1` double DEFAULT NULL COMMENT '%',
  `DAMP_LA1` double DEFAULT NULL COMMENT '%',
  `DAMP_LS2a` double DEFAULT NULL COMMENT '%',
  `DAMP_LS2b` double DEFAULT NULL COMMENT '%',
  `DAMP_LS2c` double DEFAULT NULL COMMENT '%',
  `DAMP_LA2a` double DEFAULT NULL COMMENT '%',
  `DAMP_LA2b` double DEFAULT NULL COMMENT '%',
  `DAMP_LA2c` double DEFAULT NULL COMMENT '%',
  `DAMP_LS2d` double DEFAULT NULL COMMENT '%',
  `DAMP_LS3` double DEFAULT NULL COMMENT '%',
  `WIM_GROSS` double DEFAULT NULL COMMENT 'kg?',
  `SCADA_AIR_TEMPERATURE` double DEFAULT NULL COMMENT 'ºC',
  `SCADA_WIND_SPEED` double DEFAULT NULL COMMENT 'm/s',
  `SCADA_WIND_DIRECTION` double DEFAULT NULL COMMENT 'º',
  PRIMARY KEY (`timestamp`),
  KEY `HBB_WIH000CDS` (`HBB_WIH000CDS`),
  KEY `NOAA_WIS` (`NOAA_WIS`),
  KEY `WIH000CDS` (`WIH000CDS`),
  KEY `GPH000EDE` (`GPH000EDE`),
  KEY `EXH077ED` (`EXH077ED`),
  KEY `EXB077ED` (`EXB077ED`),
  KEY `EXH077dD` (`EXH077dD`),
  KEY `INH000CDN` (`INH000CDN`),
  KEY `TSH000ED` (`TSH000ED`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temperature`
--

DROP TABLE IF EXISTS `temperature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temperature` (
  `timestamp` bigint NOT NULL DEFAULT '0',
  `TSH000CDT` double DEFAULT NULL COMMENT 'ºC',
  `TSH000ED` double DEFAULT NULL COMMENT 'ºC',
  `TSH000CDB` double DEFAULT NULL COMMENT 'ºC',
  `TSH000WD` double DEFAULT NULL COMMENT 'ºC',
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wim`
--

DROP TABLE IF EXISTS `wim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wim` (
  `TIMESTAMP` bigint unsigned DEFAULT NULL,
  `SERIAL_NUMBER` bigint unsigned NOT NULL DEFAULT '0',
  `LANE` double DEFAULT NULL,
  `DIRECTION_NUMBER` double DEFAULT NULL COMMENT 'S=1,N=0',
  `SPEED` double DEFAULT NULL COMMENT 'km/h',
  `SPEED_MPH` double DEFAULT NULL COMMENT 'mph',
  `CLASS_INDEX` double DEFAULT NULL,
  `CLASS` double DEFAULT NULL,
  `GROSS` double DEFAULT NULL,
  PRIMARY KEY (`SERIAL_NUMBER`),
  KEY `TIMESTAMP` (`TIMESTAMP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-24 21:49:55
