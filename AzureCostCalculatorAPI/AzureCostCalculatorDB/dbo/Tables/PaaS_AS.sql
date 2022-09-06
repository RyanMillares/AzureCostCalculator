CREATE TABLE [dbo].[PaaS_AS] (
    [paid]    UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [name]    VARCHAR (32)     NULL,
    [cpu]     INT              NULL,
    [ram]     NUMERIC (18)     NULL,
    [storage] INT              NULL,
    [cost]    INT              NULL,
    PRIMARY KEY CLUSTERED ([paid] ASC)
);

