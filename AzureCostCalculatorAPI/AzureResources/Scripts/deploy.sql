/*
 Pre-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be executed before the build script.	
 Use SQLCMD syntax to include a file in the pre-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the pre-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
/*
Author: Andrey Risukhin
Purpose: The script to run when publishing a database, to automatically set up AzureCostCalculator.
Description: create the tables (schema), and import the initial hardcoded values based on the Excel sheet.
Log:
> Name changed to 'deploy.sql'
> To allow SQLCMD, right click on these words -> execution settings -> SQLCMD mode
> Removed USE keyword across scripts

-- TODO
-- > Create new file, commit; test few times, no USE, commit
-- > Test by creating new DB, change USE statement location
Resources:
-- https://stackoverflow.com/questions/5237198/transactsql-to-run-another-transactsql-script
-- https://docs.microsoft.com/en-us/sql/ssdt/how-to-specify-predeployment-or-postdeployment-scripts?view=sql-server-ver16
*/

-- CREATE DATABASE command, needed? Is deploy script run before anything else exists?
PRINT 'Creating Tables.'
:r .\create-tables.sql
:r .\import-tables.sql



