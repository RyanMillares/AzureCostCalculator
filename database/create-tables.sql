-- Using Schema in the OneNote
-- Likely do not need to specify BEGIN TRANSACTION
-- TODO: Write tests to check dropping behavior. 
-- TODO: before production, optimize sizes of fields; DECIMAL(10,2) vs INT for servers, that kind of thing


-- Stores number of servers and the app size, rarely modified, mainly read from.
DROP TABLE IF EXISTS ServerSizes;
CREATE TABLE ServerSizes (
	ssid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(), -- Using GUIDs as primary keys for security (implicit nonnull)
	--ssid VARCHAR(3) PRIMARY KEY, 
	size VARCHAR(6),
	servers INT -- TODO check this is not a protected keyword
);

-- These tables are often read from, sometimes writted to (updated costs via web API)
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