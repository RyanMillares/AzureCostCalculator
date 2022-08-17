CREATE TABLE [dbo].[PaaS_DB] (
    [pdid]     UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [type]     VARCHAR (32)     NULL,
    [hardware] VARCHAR (16)     NULL,
    [storage]  VARCHAR (16)     NULL,
    [instance] VARCHAR (16)     NULL,
    [cost]     INT              NULL,
    PRIMARY KEY CLUSTERED ([pdid] ASC)
);

