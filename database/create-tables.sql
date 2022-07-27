-- Using Schema in the OneNote

-- Stores number of servers and the app size, rarely modified, mainly read from.
CREATE TABLE ServerSizes (
	ssid VARCHAR(3) PRIMARY KEY, -- Primary Key (implicit NOT NULL constraint)
	size VARCHAR(2),
	servers INT
);

CREATE TABLE IaaS_Web (
	iwid VARCHAR(5) PRIMARY KEY, -- Use the D1_v2 notation as the primary key
	cpu INT,
	ram DECMINAL,
	storage INT,
	cost INT
);

CREATE TABLE IaaS_API (
	iwid VARCHAR(5) PRIMARY KEY, -- Use the D1_v2 notation as the primary key
	cpu INT,
	ram DECMINAL,
	storage INT,
	cost INT
);

CREATE TABLE IaaS_DB (
	iwid VARCHAR(5) PRIMARY KEY, -- Use the D1_v2 notation as the primary key
	cpu INT,
	ram DECMINAL,
	storage INT,
	cost INT
);