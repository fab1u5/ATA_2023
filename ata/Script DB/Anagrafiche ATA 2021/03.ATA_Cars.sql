USE [ATA]
GO

DECLARE @98RON INT
DECLARE @E85 INT
DECLARE @ELEC INT

SELECT @98RON = Id FROM Fuels WHERE Name LIKE '%RON98%'
SELECT @E85 = Id FROM Fuels WHERE Name LIKE '%E85%'
SELECT @ELEC = Id FROM Fuels WHERE Name LIKE '%ELEC%'

DECLARE @1C INT
DECLARE @1E INT
DECLARE @3 INT

SELECT @1C = Id FROM Classes WHERE Name LIKE '%1C%'
SELECT @1E = Id FROM Classes WHERE Name LIKE '%1E%'
SELECT @3 = Id FROM Classes WHERE Name LIKE '%3%'

DELETE FROM [dbo].[Cars]

DBCC CHECKIDENT (Cars, RESEED, 0)

-- INSERT INTO [dbo].[Cars] ([Carno],[Regno],[DeliveryDocDate],[BoxNo],[Class_Id],[Fuel_Id],[Team_Id])

/**** Sheet 1C ****/
INSERT INTO [dbo].[Cars] SELECT 	 1,	51	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'AGH Racing'
INSERT INTO [dbo].[Cars] SELECT 	 4,	74	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Poliba Corse'
INSERT INTO [dbo].[Cars] SELECT 	10,	56	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'PERSEUS Racing'
INSERT INTO [dbo].[Cars] SELECT 	14,	14	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Polimarche Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	15,	6	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Dynamics UPC Manresa'
INSERT INTO [dbo].[Cars] SELECT 	19,	1	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'CULS Prague Formula Racing'
INSERT INTO [dbo].[Cars] SELECT 	23,	72	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Unical Reparto Corse'
INSERT INTO [dbo].[Cars] SELECT 	25,	57	,GETDATE(),0,@1C,	@E85	,	Id From Teams WhERE Name LIKE 'PGRacing Team'
INSERT INTO [dbo].[Cars] SELECT 	26,	73	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Joanneum Racing Graz'
INSERT INTO [dbo].[Cars] SELECT 	27,	5	,GETDATE(),0,@1C,	@E85	,	Id From Teams WhERE Name LIKE 'STV - Scuderia Tor Vergata'
INSERT INTO [dbo].[Cars] SELECT 	30,	36	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'CTU CarTech'
INSERT INTO [dbo].[Cars] SELECT 	33,	47	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Engenius'
INSERT INTO [dbo].[Cars] SELECT 	36,	15	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'UPT Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	37,	42	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'MoRe Modena Racing'
INSERT INTO [dbo].[Cars] SELECT 	39,	28	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'E-Team Squadra Corse'
INSERT INTO [dbo].[Cars] SELECT 	41,	10	,GETDATE(),0,@1C,	@E85	,	Id From Teams WhERE Name LIKE 'KOU Formula Student'
INSERT INTO [dbo].[Cars] SELECT 	55,	27	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Infinity Racing '
INSERT INTO [dbo].[Cars] SELECT 	77,	40	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Cerber Motorsport'
INSERT INTO [dbo].[Cars] SELECT 	85,	24	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Race UP Combustion'
INSERT INTO [dbo].[Cars] SELECT 	88,	52	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'UniBo Motorsport'
INSERT INTO [dbo].[Cars] SELECT 	93,	32	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'Togliatti Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	96,	13	,GETDATE(),0,@1C,	@98RON	,	Id From Teams WhERE Name LIKE 'PWR Racing Team'


/**** Sheet 1E ****/
INSERT INTO [dbo].[Cars] SELECT 	101,	32, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'Global Formula Racing'
INSERT INTO [dbo].[Cars] SELECT 	106,	 9, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'Scuderia Mensa Racing'
INSERT INTO [dbo].[Cars] SELECT 	108,	 5, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'UniBo Motorsport Electric'
INSERT INTO [dbo].[Cars] SELECT 	110,	38, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'StarkStrom Augsburg Electric'
INSERT INTO [dbo].[Cars] SELECT 	113,	20, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'municHMotorsport '
INSERT INTO [dbo].[Cars] SELECT 	116,	15, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'UniNa Corse E-Team'
INSERT INTO [dbo].[Cars] SELECT 	119,	 2, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'eMotion Racing HRW'
INSERT INTO [dbo].[Cars] SELECT 	120,	27, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'KA-RaceIng E'
INSERT INTO [dbo].[Cars] SELECT 	124,	18, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'Formula Student Team Tallinn'
INSERT INTO [dbo].[Cars] SELECT 	130,	 7, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'Evolution Racing Team Saar '
INSERT INTO [dbo].[Cars] SELECT 	131,	24, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'TUfast e-technology'
INSERT INTO [dbo].[Cars] SELECT 	133,	11, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'E-Agle Trento Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	140,	 1, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'E-Team Duisburg-Essen'
INSERT INTO [dbo].[Cars] SELECT 	146,	40, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'Squadra Corse PoliTo'
INSERT INTO [dbo].[Cars] SELECT 	153,	28, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'TU Graz Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	159,	13, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'Superior engineering'
INSERT INTO [dbo].[Cars] SELECT 	173,	22, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'e-Traxx Düsseldorf'
INSERT INTO [dbo].[Cars] SELECT 	179,	 8, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'e-Tech Racing'
INSERT INTO [dbo].[Cars] SELECT 	180,	25, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'FAST CHARGE'
INSERT INTO [dbo].[Cars] SELECT 	188,	30, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'UniPR Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	190,	17, GETDATE(),0,@1E,	@ELEC	,	Id From Teams WhERE Name LIKE 'Dynamis PRC'

/**** Sheet 3 ****/
INSERT INTO [dbo].[Cars] SELECT 	323	,	5	,GETDATE(),0,@3,	@98RON	,	Id From Teams WhERE Name LIKE 'UniTS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	333	,	3	,GETDATE(),0,@3,	@98RON	,	Id From Teams WhERE Name LIKE 'AAM Driverless Racing Team'
INSERT INTO [dbo].[Cars] SELECT 	382	,	4	,GETDATE(),0,@3,	@98RON	,	Id From Teams WhERE Name LIKE 'OMR UniBS Motorsport'
INSERT INTO [dbo].[Cars] SELECT 	384	,	1	,GETDATE(),0,@3,	@ELEC	,	Id From Teams WhERE Name LIKE 'Alexandria University Motorsports (AUM)'

GO


