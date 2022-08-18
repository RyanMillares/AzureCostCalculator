﻿CREATE TABLE [dbo].[IaaS_DB] (
    [idid]    UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [vm]      VARCHAR (7)      NULL,
    [cpu]     INT              NULL,
    [ram]     NUMERIC (18)     NULL,
    [storage] INT              NULL,
    [cost]    INT              NULL,
    PRIMARY KEY CLUSTERED ([idid] ASC)
);

