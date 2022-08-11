CREATE TABLE [dbo].[PaaS_DB] (
	pdid UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	type VARCHAR(32), 
	hardware VARCHAR(16),
	storage VARCHAR(16),
	instance VARCHAR(16),
	cost INT
);