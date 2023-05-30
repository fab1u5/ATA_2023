USE [ATA]
GO

select * from [dbo].[Fuels] 

--SELECT [Id], [Name] FROM [ATA].[dbo].[Fuels]
UPDATE [dbo].[Fuels] SET Name = 'RON98' WHERE id = 1
GO

select * from [dbo].[Fuels] 


