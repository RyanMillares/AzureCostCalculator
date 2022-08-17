/*
Purpose: Importing the data for the first time into a table.
Author: Andrey Risukhin
Backlog:
> asap, have this run automatically when user loads the website
> Eventually update using API to website
> Soon, use .csv files to initialize, hardcoded imports is icky
Notes: 
> "default" is to generate the GUID for each row, can be overwritten.
> IaaS and PaaS have hardcoded values copied from Excel.

v0 Hardcoded Values
*/

-- Insert default VM sizes + server counts
INSERT INTO ServerSizes VALUES (default, 'Small', 3);
INSERT INTO ServerSizes VALUES (default, 'Small', 6);
INSERT INTO ServerSizes VALUES (default, 'Small', 9);

INSERT INTO ServerSizes VALUES (default, 'Medium', 12);
INSERT INTO ServerSizes VALUES (default, 'Medium', 15);
INSERT INTO ServerSizes VALUES (default, 'Medium', 18);

INSERT INTO ServerSizes VALUES (default, 'Large', 21);
INSERT INTO ServerSizes VALUES (default, 'Large', 24);
INSERT INTO ServerSizes VALUES (default, 'Large', 27);

INSERT INTO ServerSizes VALUES (default, 'XL', 30);
INSERT INTO ServerSizes VALUES (default, 'XL', 33);
INSERT INTO ServerSizes VALUES (default, 'XL', 36);

-- Insert initial values for IaaS VM-specific tables
INSERT INTO IaaS_Web VALUES (default, 'D1_v2', 1, 3.5, 50, 5) 
INSERT INTO IaaS_Web VALUES (default, 'D2s_v3', 2, 8, 16, 10) 
INSERT INTO IaaS_Web VALUES (default, 'D2_v3', 2, 8, 50, 15) 
INSERT INTO IaaS_Web VALUES (default, 'D4s_v3', 4, 16, 32, 20) 
INSERT INTO IaaS_Web VALUES (default, 'D8s_v3', 8, 32, 64, 25) 
INSERT INTO IaaS_Web VALUES (default, 'D16s_v3', 16, 64, 128, 30) 
INSERT INTO IaaS_Web VALUES (default, 'D32s_v3', 32, 128, 256, 35) 
INSERT INTO IaaS_Web VALUES (default, 'D64s_v3', 64, 256, 512, 40) 

INSERT INTO IaaS_API VALUES (default, 'E2s_v3', 2, 16, 32, 15) 
INSERT INTO IaaS_API VALUES (default, 'E4s_v3', 4, 32, 64, 20) 
INSERT INTO IaaS_API VALUES (default, 'E4_v3', 4, 32, 100, 25) 
INSERT INTO IaaS_API VALUES (default, 'E8s_v3', 8, 64, 128, 30) 
INSERT INTO IaaS_API VALUES (default, 'E8_v3', 8, 64, 200, 35) 
INSERT INTO IaaS_API VALUES (default, 'E16s_v3', 16, 128, 256, 40) 
INSERT INTO IaaS_API VALUES (default, 'E32s_v3', 32, 256, 512, 45) 
INSERT INTO IaaS_API VALUES (default, 'E32_v3', 32, 256, 800, 45) 

INSERT INTO IaaS_DB VALUES (default, 'F2s_v2', 2, 4, 16, 10) 
INSERT INTO IaaS_DB VALUES (default, 'F4s_v2', 4, 8, 32, 15) 
INSERT INTO IaaS_DB VALUES (default, 'F8s_v2', 8, 16, 64, 20) 
INSERT INTO IaaS_DB VALUES (default, 'F16s_v2', 16, 32, 128, 25) 
INSERT INTO IaaS_DB VALUES (default, 'F32s_v2', 32, 64, 256, 30) 
INSERT INTO IaaS_DB VALUES (default, 'F48s_v2', 48, 96, 384, 35) 
INSERT INTO IaaS_DB VALUES (default, 'F64s_v2', 64, 128, 512, 40) 
INSERT INTO IaaS_DB VALUES (default, 'F72s_v2', 72, 144, 576, 45) 

-- Insert initial values for PaaS tables
INSERT INTO PaaS_Web VALUES (default, 'Standard - S1', 1, 1.75, 50, 44)
INSERT INTO PaaS_Web VALUES (default, 'Standard - S2', 2, 3.5, 50, 88)
INSERT INTO PaaS_Web VALUES (default, 'Standard - S3', 4, 7, 50, 175)

INSERT INTO PaaS_AS VALUES (default, 'Standard - S1', 1, 1.75, 50, 44)
INSERT INTO PaaS_AS VALUES (default, 'Standard - S2', 2, 3.5, 50, 88)
INSERT INTO PaaS_AS VALUES (default, 'Standard - S3', 4, 7, 50, 175)

INSERT INTO PaaS_DB VALUES (default, 'Single Database', 'vCore', 'RA-GRS', '2 vCores', 104)
INSERT INTO PaaS_DB VALUES (default, 'Single Database', 'vCore', 'RA-GRS', '2 vCores', 204)
INSERT INTO PaaS_DB VALUES (default, 'Single Database', 'vCore', 'RA-GRS', '6 vCores', 304)
INSERT INTO PaaS_DB VALUES (default, 'Single Database', 'vCore', 'RA-GRS', '8 vCores', 404)



-- OLD ATTEMPT, for reference on .csv work
--.mode csv
--.import "serversizes.csv" ServerSizes
--.import "iaasweb.csv" IaaS_Web
--.import "iaasapi.csv" IaaS_API
--.import "iaasdb.csv" IaaS_DB;

-- PRAGMA foreign_keys = ON; -- Needed if pragma used in create tables
