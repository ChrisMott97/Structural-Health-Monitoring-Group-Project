-- Adminer 4.8.1 PostgreSQL 14.2 (Debian 14.2-1.pgdg110+1) dump
CREATE DATABASE `humber_bridge` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `humber_bridge`;

DROP TABLE IF EXISTS "anomalies";
DROP SEQUENCE IF EXISTS anomalies_id_seq;
CREATE SEQUENCE anomalies_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."anomalies" (
    "id" integer DEFAULT nextval('anomalies_id_seq') NOT NULL,
    "status" integer DEFAULT '1' NOT NULL,
    "confidence" real,
    "sensitivity" real NOT NULL,
    "user_id" character varying(255),
    "sensor_time" timestamptz(0) NOT NULL,
    "sensor_id" character varying(255),
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "anomalies_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "comments";
DROP SEQUENCE IF EXISTS comments_id_seq;
CREATE SEQUENCE comments_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."comments" (
    "id" integer DEFAULT nextval('comments_id_seq') NOT NULL,
    "user_id" character varying(255),
    "sensor_id" character varying(255) NOT NULL,
    "anomaly_id" integer,
    "body" text NOT NULL,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "related";
CREATE TABLE "public"."related" (
    "sensor_id" character varying(255) NOT NULL,
    "related_id" character varying(255) NOT NULL,
    CONSTRAINT "related_pkey" PRIMARY KEY ("sensor_id", "related_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "report_sensors";
CREATE TABLE "public"."report_sensors" (
    "sensor_id" character varying(255) NOT NULL,
    "report_id" integer NOT NULL,
    CONSTRAINT "report_sensors_pkey" PRIMARY KEY ("report_id", "sensor_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "reports";
DROP SEQUENCE IF EXISTS reports_id_seq;
CREATE SEQUENCE reports_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."reports" (
    "id" integer DEFAULT nextval('reports_id_seq') NOT NULL,
    "title" character varying(255),
    "user" character varying(255),
    "sensitivity" real NOT NULL,
    "start_date" timestamptz,
    "end_date" timestamptz,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "sensors";
CREATE TABLE "public"."sensors" (
    "id" character varying(255) NOT NULL,
    "type" character varying(255) NOT NULL,
    "subtype" character varying(255),
    "location" character varying(255),
    "unit" character varying(255),
    CONSTRAINT "sensors_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying(255) NOT NULL,
    "permission" integer NOT NULL,
    "password" character varying(255) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."anomalies" ADD CONSTRAINT "anomalies_sensor_id_foreign" FOREIGN KEY (sensor_id) REFERENCES sensors(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_anomaly_id_foreign" FOREIGN KEY (anomaly_id) REFERENCES anomalies(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_sensor_id_foreign" FOREIGN KEY (sensor_id) REFERENCES sensors(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."related" ADD CONSTRAINT "related_related_id_foreign" FOREIGN KEY (related_id) REFERENCES sensors(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."related" ADD CONSTRAINT "related_sensor_id_foreign" FOREIGN KEY (sensor_id) REFERENCES sensors(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."report_sensors" ADD CONSTRAINT "report_sensors_report_id_foreign" FOREIGN KEY (report_id) REFERENCES reports(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."report_sensors" ADD CONSTRAINT "report_sensors_sensor_id_foreign" FOREIGN KEY (sensor_id) REFERENCES sensors(id) NOT DEFERRABLE;

-- 2022-05-10 17:22:55.733256+00
