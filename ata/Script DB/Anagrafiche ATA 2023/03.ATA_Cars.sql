--USE [ATA]
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
INSERT INTO [dbo].[Cars] SELECT 1,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'UPB Drive'
INSERT INTO [dbo].[Cars] SELECT 3,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FUM Racing'
INSERT INTO [dbo].[Cars] SELECT 7,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'PGRacing Team'
INSERT INTO [dbo].[Cars] SELECT 8,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Salento Racing C-Team'
INSERT INTO [dbo].[Cars] SELECT 20,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Formula Students Technical University of Crete'
INSERT INTO [dbo].[Cars] SELECT 21,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Poliba Corse'
INSERT INTO [dbo].[Cars] SELECT 22,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FESB Racing'
INSERT INTO [dbo].[Cars] SELECT 23,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FS RTU '
INSERT INTO [dbo].[Cars] SELECT 27,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Scuderia Tor Vergata'
INSERT INTO [dbo].[Cars] SELECT 28,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Formula Racing Team of University of Cyprus (FRTUCY)'
INSERT INTO [dbo].[Cars] SELECT 32,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FUF Racing Team'
INSERT INTO [dbo].[Cars] SELECT 37,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'MoRe Modena Racing Combustion'
INSERT INTO [dbo].[Cars] SELECT 41,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'KOU FORMULA '
INSERT INTO [dbo].[Cars] SELECT 45,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Bimasakti Racing Team'
INSERT INTO [dbo].[Cars] SELECT 76,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'INSA Racing Team'
INSERT INTO [dbo].[Cars] SELECT 78,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'CULS Prague formula racing'
INSERT INTO [dbo].[Cars] SELECT 81,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'DU Racing'
INSERT INTO [dbo].[Cars] SELECT 83,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FUEM'
INSERT INTO [dbo].[Cars] SELECT 85,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Race UP Combustion'
INSERT INTO [dbo].[Cars] SELECT 87,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Swansea Racing'
INSERT INTO [dbo].[Cars] SELECT 88,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'UniBo Motorsport'
INSERT INTO [dbo].[Cars] SELECT 92,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'CESI RACE '
INSERT INTO [dbo].[Cars] SELECT 99,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Nova Racing Team'




/**** Sheet 1E ****/
INSERT INTO [dbo].[Cars] SELECT 107,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Bern Racing Team  '
INSERT INTO [dbo].[Cars] SELECT 111,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Agle Trento Racing Team'
INSERT INTO [dbo].[Cars] SELECT 114,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Tecnun eRacing'
INSERT INTO [dbo].[Cars] SELECT 119,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'eMotion Racing HRW'
INSERT INTO [dbo].[Cars] SELECT 120,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Team Squadra Corse '
INSERT INTO [dbo].[Cars] SELECT 123,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Sapienza Fast Charge'
INSERT INTO [dbo].[Cars] SELECT 124,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'FS Team Tallinn'
INSERT INTO [dbo].[Cars] SELECT 125,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Brunel Racing'
INSERT INTO [dbo].[Cars] SELECT 127,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Herkules Racing Team'
INSERT INTO [dbo].[Cars] SELECT 128,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'HofSpannung Motorsport e. V.'
INSERT INTO [dbo].[Cars] SELECT 130,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniTS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 131,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'PWR Racing Team'
INSERT INTO [dbo].[Cars] SELECT 132,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Democritus Racing Team'
INSERT INTO [dbo].[Cars] SELECT 133,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'ISC FS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 140,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniUd E-Racing Team'
INSERT INTO [dbo].[Cars] SELECT 141,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'KOU FORMULA E'
INSERT INTO [dbo].[Cars] SELECT 142,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Align Racing'
INSERT INTO [dbo].[Cars] SELECT 143,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Darmstadt Racing Team e.V.'
INSERT INTO [dbo].[Cars] SELECT 145,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'BRS Motorsport'
INSERT INTO [dbo].[Cars] SELECT 146,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Kaiserslautern Racing Team - KaRaT e.V.'
INSERT INTO [dbo].[Cars] SELECT 150,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'FST Lisboa'
INSERT INTO [dbo].[Cars] SELECT 151,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Speeding Scientists Siegen e.V.'
INSERT INTO [dbo].[Cars] SELECT 153,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Graz Racing Team'
INSERT INTO [dbo].[Cars] SELECT 154,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'BCN eMotorsport'
INSERT INTO [dbo].[Cars] SELECT 171,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniNa Corse E-Team'
INSERT INTO [dbo].[Cars] SELECT 173,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Traxx Düsseldorf'
INSERT INTO [dbo].[Cars] SELECT 176,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Team Bath Racing Electric'
INSERT INTO [dbo].[Cars] SELECT 185,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Race UP Electric'
INSERT INTO [dbo].[Cars] SELECT 188,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniPR Racing Team'
INSERT INTO [dbo].[Cars] SELECT 190,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Dynamis PRC'
INSERT INTO [dbo].[Cars] SELECT 196,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'WHZ Racing Team'
INSERT INTO [dbo].[Cars] SELECT 197,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'La eRacing'
INSERT INTO [dbo].[Cars] SELECT 198,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Metropolia Motorsport'
INSERT INTO [dbo].[Cars] SELECT 199,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniBo Motorsport Electric'


/**** Sheet 3 ****/
INSERT INTO [dbo].[Cars] SELECT 301,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Polimarche Racing Team'
INSERT INTO [dbo].[Cars] SELECT 313,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Ferrara Squadra Corse'
INSERT INTO [dbo].[Cars] SELECT 319,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Sapienza Corse'
INSERT INTO [dbo].[Cars] SELECT 324,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Salento Racing E-Team'
INSERT INTO [dbo].[Cars] SELECT 333,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'AAM Driverless Racing Team'

GO


