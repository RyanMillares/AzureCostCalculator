﻿
--DROP TABLE IF EXISTS PaaS_AS;
CREATE TABLE PaaS_AS (
	paid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	name VARCHAR(32), 
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);
