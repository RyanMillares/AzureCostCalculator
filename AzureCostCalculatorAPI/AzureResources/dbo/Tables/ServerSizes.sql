CREATE TABLE [dbo].[ServerSizes] (
    [ssid]    UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [size]    VARCHAR (6)      NULL,
    [servers] INT              NULL,
    PRIMARY KEY CLUSTERED ([ssid] ASC)
);

