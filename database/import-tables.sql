-- Importing the data
-- Will eventually do this automatically, somehow
-- Uses .csv files

.mode csv

.import "serversizes.csv" ServerSizes
.import "iaasweb.csv" IaaS_Web
.import "iaasapi.csv" IaaS_API
.import "iaasdb.csv" IaaS_DB;

-- PRAGMA foreign_keys = ON; -- Needed if pragma used in create tables