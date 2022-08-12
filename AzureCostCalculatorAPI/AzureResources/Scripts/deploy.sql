/*
Author: Andrey Risukhin
Purpose: The script to run when publishing a database, to automatically set up AzureCostCalculator.
Description: create the tables (schema), and import the initial hardcoded values based on the Excel sheet.

*/

-- https://stackoverflow.com/questions/5237198/transactsql-to-run-another-transactsql-script
-- :r ./create-tables.sql
-- :r ./import-tables.sql