/*
Purpose: Importing the data for the first time into a table.
Author: Andrey Risukhin
Backlog:
> asap, have this run automatically when user loads the website
> Eventually update using API to website
> Soon, use .csv files to initialize, hardcoded imports is icky
Notes: 
> "default" is to generate the GUID for each row, can be overwritten
> v0 Hardcoded Values
*/

-- Insert default VM sizes + server counts
INSERT INTO ServerSizes VALUES ('E1338847-CE5B-4A3F-8128-98C558E6A251', 'Small', 3);
INSERT INTO ServerSizes VALUES ('B9134EED-FA11-4E9C-B2C6-FB082A5AEDEA', 'Small', 6);
INSERT INTO ServerSizes VALUES ('5D2C5C16-A644-44BE-A744-954348D372C0', 'Small', 9);

INSERT INTO ServerSizes VALUES ('1C60D129-E856-49BE-BBF1-759A348FA7B5', 'Medium', 12);
INSERT INTO ServerSizes VALUES ('258FA801-29EB-4691-9AED-3BA16BBC1728', 'Medium', 15);
INSERT INTO ServerSizes VALUES ('3C7E065A-6AA9-4541-9C7A-AF9367355A0A', 'Medium', 18);

INSERT INTO ServerSizes VALUES ('0E305DB0-6314-49F6-84E3-DB69DC56A9ED', 'Large', 21);
INSERT INTO ServerSizes VALUES ('781DA325-6C67-473F-93F5-AE547764968B', 'Large', 24);
INSERT INTO ServerSizes VALUES ('A0C5B901-0B7B-465F-B4B5-5385BE9C92C2', 'Large', 27);

INSERT INTO ServerSizes VALUES ('BE7B316C-6025-46D7-A06F-91FE38A71020', 'XL', 30);
INSERT INTO ServerSizes VALUES ('C8911D4A-F253-413F-9DA6-5F5878BAB998', 'XL', 33);
INSERT INTO ServerSizes VALUES ('27CC950C-E877-4E60-A32E-63930C0B6981', 'XL', 36);

-- Insert initial values for IaaS VM-specific tables
INSERT INTO IaaS_Web VALUES ('9A3C0B10-EE80-4B5A-B137-6DF552792339', 'D1_v2', 1, 3.5, 50, 15) 
--INSERT INTO IaaS_Web VALUES (default, 'D2s_v3', 2, 8, 16, 10) 
INSERT INTO IaaS_Web VALUES ('27B7F202-DC3A-415C-BB21-4C59631FAAA6', 'D2_v3', 2, 8, 50, 27) 
INSERT INTO IaaS_Web VALUES ('70661524-B51C-4F1F-92F5-0FD2B607D2F1', 'D4s_v3', 4, 16, 32, 54) 
INSERT INTO IaaS_Web VALUES ('925F78B9-BA75-4DB2-9FEE-6B8F92820447', 'D8s_v3', 8, 32, 64, 107) 
INSERT INTO IaaS_Web VALUES ('80EC30FD-3DD9-4AD0-888F-2FC63958E620', 'D16s_v3', 16, 64, 128, 215) 
INSERT INTO IaaS_Web VALUES ('8B97F0D1-47C1-4B32-9510-08D0EA12740A', 'D32s_v3', 32, 128, 256, 431) 
INSERT INTO IaaS_Web VALUES ('8572F118-9BAB-475C-B918-CB02602F9416', 'D64s_v3', 64, 256, 512, 861) 

INSERT INTO IaaS_DB VALUES ('242FB7AE-6826-4B77-9C6E-F320FF8F94C5', 'E2s_v3', 2, 16, 32, 37) 
--INSERT INTO IaaS_DB VALUES (default, 'E4s_v3', 4, 32, 64, 20) 
--INSERT INTO IaaS_DB VALUES (default, 'E4_v3', 4, 32, 100, 25) 
INSERT INTO IaaS_DB VALUES ('684AE7D4-69DB-42E1-BF80-57BC91982A3F', 'E4s_v5', 4, 32, 150, 79) 
INSERT INTO IaaS_DB VALUES ('EF28753A-45F7-415E-A991-56ED11C242D0', 'E8s_v3', 8, 64, 128, 146) 
--INSERT INTO IaaS_DB VALUES (default, 'E8_v3', 8, 64, 200, 35) 
INSERT INTO IaaS_DB VALUES ('91B66552-11A3-40A2-8F25-F8D50A6F4821', 'E16s_v3', 16, 128, 256, 292) 
--INSERT INTO IaaS_DB VALUES (default, 'E32s_v3', 32, 256, 512, 45) 
INSERT INTO IaaS_DB VALUES ('67FAAACA-A5FD-400C-AFAD-39B476DFBD84', 'E32_v3', 32, 256, 800, 584) 

INSERT INTO IaaS_API VALUES ('E5D970CB-07E6-4EEE-8584-8C7E18B37AF2', 'F2s_v2', 2, 4, 16, 23) 
INSERT INTO IaaS_API VALUES ('ED3B90B7-5CE3-46AE-8761-B9C5DD6BA388', 'F4s_v2', 4, 8, 32, 45) 
INSERT INTO IaaS_API VALUES ('2A95B389-84BC-4944-B052-C6C69E93A35E', 'F8s_v2', 8, 16, 64, 91) 
INSERT INTO IaaS_API VALUES ('1B0EC741-995F-4C1A-A2AD-91BDDE3ECE59', 'F16s_v2', 16, 32, 128, 181) 
INSERT INTO IaaS_API VALUES ('1185070C-C7F7-4EBF-BBB2-CD72EB650693', 'F32s_v2', 32, 64, 256, 362) 
INSERT INTO IaaS_API VALUES ('3D72A7F1-E709-4394-A5BE-3A9C3751AB9D', 'F48s_v2', 48, 96, 384, 534) 
INSERT INTO IaaS_API VALUES ('B1689D40-0F0F-4096-8458-99F6CDA1E78B', 'F64s_v2', 64, 128, 512, 724) 
--INSERT INTO IaaS_API VALUES (default, 'F72s_v2', 72, 144, 576, 45) 

-- Insert initial values for PaaS tables
INSERT INTO PaaS_Web VALUES ('594F6C53-931B-4086-8F0D-DA6C8CAD87A7', 'Standard - S1', 1, 1.75, 50, 44)
INSERT INTO PaaS_Web VALUES ('606D3670-8AB5-44B8-BDC8-F07C46E846D2', 'Standard - S2', 2, 3.5, 50, 88)
INSERT INTO PaaS_Web VALUES ('435C9903-1FE2-4E12-A3AD-962F61509CFD', 'Standard - S3', 4, 7, 50, 175)

INSERT INTO PaaS_AS VALUES ('061533D7-53C9-46FE-BFDF-0100E57F4A17', 'Standard - S1', 1, 1.75, 50, 44)
INSERT INTO PaaS_AS VALUES ('C1D0091E-889E-4495-8BD0-74835B63B28A', 'Standard - S2', 2, 3.5, 50, 88)
INSERT INTO PaaS_AS VALUES ('0DC9CF7F-E720-4EEE-8F01-54414CAED1B9', 'Standard - S3', 4, 7, 50, 175)

INSERT INTO PaaS_DB VALUES ('CBA92520-9A87-4869-802C-82856C375332', 'Single Database', 'vCore', 'RA-GRS', '2 vCores', 104)
INSERT INTO PaaS_DB VALUES ('1590CB97-66A7-4C5F-9573-4A65F4B1B3D5', 'Single Database', 'vCore', 'RA-GRS', '2 vCores', 204)
INSERT INTO PaaS_DB VALUES ('AD8534CD-D337-48BB-9364-B025ABA4DB13', 'Single Database', 'vCore', 'RA-GRS', '6 vCores', 304)
INSERT INTO PaaS_DB VALUES ('9B11D557-4796-4F68-BC22-25BC0FED983C', 'Single Database', 'vCore', 'RA-GRS', '8 vCores', 404)


/*
BELOW: Old version of data, from Excel Sheet data tabs
*/
/*
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

INSERT INTO IaaS_DB VALUES (default, 'E2s_v3', 2, 16, 32, 15) 
INSERT INTO IaaS_DB VALUES (default, 'E4s_v3', 4, 32, 64, 20) 
INSERT INTO IaaS_DB VALUES (default, 'E4_v3', 4, 32, 100, 25) 
INSERT INTO IaaS_DB VALUES (default, 'E8s_v3', 8, 64, 128, 30) 
INSERT INTO IaaS_DB VALUES (default, 'E8_v3', 8, 64, 200, 35) 
INSERT INTO IaaS_DB VALUES (default, 'E16s_v3', 16, 128, 256, 40) 
INSERT INTO IaaS_DB VALUES (default, 'E32s_v3', 32, 256, 512, 45) 
INSERT INTO IaaS_DB VALUES (default, 'E32_v3', 32, 256, 800, 45) 

INSERT INTO IaaS_API VALUES (default, 'F2s_v2', 2, 4, 16, 10) 
INSERT INTO IaaS_API VALUES (default, 'F4s_v2', 4, 8, 32, 15) 
INSERT INTO IaaS_API VALUES (default, 'F8s_v2', 8, 16, 64, 20) 
INSERT INTO IaaS_API VALUES (default, 'F16s_v2', 16, 32, 128, 25) 
INSERT INTO IaaS_API VALUES (default, 'F32s_v2', 32, 64, 256, 30) 
INSERT INTO IaaS_API VALUES (default, 'F48s_v2', 48, 96, 384, 35) 
INSERT INTO IaaS_API VALUES (default, 'F64s_v2', 64, 128, 512, 40) 
INSERT INTO IaaS_API VALUES (default, 'F72s_v2', 72, 144, 576, 45) 

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
*/


-- OLD ATTEMPT, for reference on .csv work
--.mode csv
--.import "serversizes.csv" ServerSizes
--.import "iaasweb.csv" IaaS_Web
--.import "iaasapi.csv" IaaS_API
--.import "iaasdb.csv" IaaS_DB;

-- PRAGMA foreign_keys = ON; -- Needed if pragma used in create tables
