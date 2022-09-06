CREATE TABLE IaaS_DB (
	idid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	vm VARCHAR(7), 
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

