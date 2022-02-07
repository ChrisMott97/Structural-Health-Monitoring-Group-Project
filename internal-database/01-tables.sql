CREATE DATABASE /*!32312 IF NOT EXISTS*/ `humber_bridge`;

USE `humber_bridge`;

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `locations`

CREATE TABLE `locations`
(
 `id`   int NOT NULL AUTO_INCREMENT ,
 `name` text NOT NULL ,

PRIMARY KEY (`id`)
);

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `sensors`

CREATE TABLE `sensors`
(
 `id`          varchar(45) NOT NULL ,
 `type`        text NOT NULL ,
 `location_id` int NOT NULL ,
 `unit`        text NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_60` (`location_id`),
CONSTRAINT `FK_58` FOREIGN KEY `FK_60` (`location_id`) REFERENCES `locations` (`id`)
);

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `related`

CREATE TABLE `related`
(
 `sensor_id`  varchar(45) NOT NULL ,
 `related_id` varchar(45) NOT NULL ,

KEY `FK_16` (`sensor_id`),
CONSTRAINT `FK_14` FOREIGN KEY `FK_16` (`sensor_id`) REFERENCES `sensors` (`id`),
KEY `FK_19` (`related_id`),
CONSTRAINT `FK_17` FOREIGN KEY `FK_19` (`related_id`) REFERENCES `sensors` (`id`)
);

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `users`

CREATE TABLE `users`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `name`       text NOT NULL ,
 `permission` tinyint NOT NULL ,
 `password`   varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `anomolies`

CREATE TABLE `anomolies`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `status`      tinyint NOT NULL ,
 `user_id`     int NOT NULL ,
 `modified_at` datetime NOT NULL ,
 `confidence`  tinyint NOT NULL ,
 `notes`       text NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_49` (`user_id`),
CONSTRAINT `FK_47` FOREIGN KEY `FK_49` (`user_id`) REFERENCES `users` (`id`)
);

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `data`

CREATE TABLE `data`
(
 `time`       datetime NOT NULL ,
 `sensor_id`  varchar(45) NOT NULL ,
 `anomoly_id` int NOT NULL ,
 `value`      double NOT NULL ,

PRIMARY KEY (`time`),
KEY `FK_25` (`sensor_id`),
CONSTRAINT `FK_23` FOREIGN KEY `FK_25` (`sensor_id`) REFERENCES `sensors` (`id`),
KEY `FK_39` (`anomoly_id`),
CONSTRAINT `FK_37` FOREIGN KEY `FK_39` (`anomoly_id`) REFERENCES `anomolies` (`id`)
);





















