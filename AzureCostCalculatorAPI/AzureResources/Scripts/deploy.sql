/*
Author: Andrey Risukhin
Purpose: The script to run when publishing a database, to automatically set up AzureCostCalculator.
Description: create the tables (schema), and import the initial hardcoded values based on the Excel sheet.

*/

-- https://stackoverflow.com/questions/5237198/transactsql-to-run-another-transactsql-script
-- :r C:\Users\andrey.risukhin\source\repos\AzureCostCalculator\AzureCostCalculatorAPI\AzureResources\bin\Debug  ./create-tables.sql
-- :r ./import-tables.sql
