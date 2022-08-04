-- Purpose: Creating the table schemas used.
-- Author: Andrey Risukhin
-- Backlog:
-- > asap, have this run automatically when user loads the website
-- > before production, optimize fields and their sizes (storing as INT vs DECIMAL(10,2), that kind of thing)
-- Notes: 
-- > Using schema in the OneNote
-- > Likely do not need to specify BEGIN TRANSACTION


-- ===
-- Stores number of servers and the app size, rarely modified, mainly read from.
-- ===
DROP TABLE IF EXISTS ServerSizes;
CREATE TABLE ServerSizes (
	ssid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(), -- Using GUIDs as primary keys for security (implicit nonnull)
	--ssid VARCHAR(3) PRIMARY KEY, 
	size VARCHAR(6),
	servers INT -- TODO check this is not a protected keyword
);

-- ===
-- The following tables are often read from, sometimes writted to (updated costs via web API)
-- ===
DROP TABLE IF EXISTS IaaS_Web;
CREATE TABLE IaaS_Web (
	iwid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	vm VARCHAR(7), -- Store the vm name D1_v2 notation as the primary key
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

DROP TABLE IF EXISTS IaaS_API;
CREATE TABLE IaaS_API (
	iaid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	vm VARCHAR(7), 
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

DROP TABLE IF EXISTS IaaS_DB;
CREATE TABLE IaaS_DB (
	idid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	vm VARCHAR(7), 
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

-- IaaS Tables above
-- PaaS Tables below

DROP TABLE IF EXISTS PaaS_Web;
CREATE TABLE PaaS_Web (
	pwid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	name VARCHAR(32), 
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

DROP TABLE IF EXISTS PaaS_AS;
CREATE TABLE PaaS_AS (
	paid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	name VARCHAR(32), 
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

DROP TABLE IF EXISTS PaaS_DB;
CREATE TABLE PaaS_DB (
	pdid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	type VARCHAR(32), 
	hardware VARCHAR(16),
	storage VARCHAR(16),
	instance VARCHAR(16),
	cost INT
);


