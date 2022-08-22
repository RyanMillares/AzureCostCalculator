CREATE TABLE IaaS_Web (
	iwid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	vm VARCHAR(7), -- Store the vm name D1_v2 notation as the primary key
	cpu INT,
	ram NUMERIC,
	storage INT,
	cost INT
);

