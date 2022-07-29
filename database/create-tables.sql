-- Using Schema in the OneNote
-- Likely do not need to specify BEGIN TRANSACTION
-- Good practice to control for modified tables with DROP TABLE IF EXISTS
-- 7/28/2022: Write tests to check dropping behavior. 

-- Stores number of servers and the app size, rarely modified, mainly read from.
DROP TABLE IF EXISTS ServerSizes;
CREATE TABLE ServerSizes (
	ssid VARCHAR(3) PRIMARY KEY, -- Primary Key (implicit NOT NULL constraint)
	size VARCHAR(6),
	servers INT
);

DROP TABLE IF EXISTS IaaS_Web;
CREATE TABLE IaaS_Web (
	iwid VARCHAR(7) PRIMARY KEY, -- Use the D1_v2 notation as the primary key
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

DROP TABLE IF EXISTS IaaS_API;
CREATE TABLE IaaS_API (
	iwid VARCHAR(7) PRIMARY KEY, -- Use the D1_v2 notation as the primary key
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

DROP TABLE IF EXISTS IaaS_DB;
CREATE TABLE IaaS_DB (
	iwid VARCHAR(7) PRIMARY KEY, -- Use the D1_v2 notation as the primary key
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);