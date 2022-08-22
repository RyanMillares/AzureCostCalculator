CREATE TABLE PaaS_Web (
	pwid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	name VARCHAR(32), 
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);