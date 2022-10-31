CREATE TABLE [dbo].[IaaS_API] (
    [iaid]    UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [vm]      VARCHAR (7)      NOT NULL,
    [cpu]     INT              NOT NULL,
    [ram]     NUMERIC (4)      NOT NULL,
    [storage] INT              NOT NULL,
    [cost]    INT              NOT NULL,
    PRIMARY KEY CLUSTERED ([iaid] ASC)
);

