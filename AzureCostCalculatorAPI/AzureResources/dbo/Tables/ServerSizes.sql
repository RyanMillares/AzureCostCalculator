CREATE TABLE ServerSizes (
	ssid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(), -- Using GUIDs as primary keys for security (implicit nonnull)
	--ssid VARCHAR(3) PRIMARY KEY, 
	size VARCHAR(6),
	servers INT -- TODO check this is not a protected keyword
);

