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
INSERT INTO [dbo].[Cars] SELECT 1,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'NED Racers'
INSERT INTO [dbo].[Cars] SELECT 7,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'UWE FS'
INSERT INTO [dbo].[Cars] SELECT 8,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Cerber Motorsport'
INSERT INTO [dbo].[Cars] SELECT 11,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'TU-Sofia Racing '
INSERT INTO [dbo].[Cars] SELECT 12,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Aristotle Racing Team (ART)'
INSERT INTO [dbo].[Cars] SELECT 20,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FaSTDa Racing Combustion'
INSERT INTO [dbo].[Cars] SELECT 21,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Poliba Corse'
INSERT INTO [dbo].[Cars] SELECT 25,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Tulpar Racing'
INSERT INTO [dbo].[Cars] SELECT 27,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Scuderia Tor Vergata'
INSERT INTO [dbo].[Cars] SELECT 34,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'YTU Racing'
INSERT INTO [dbo].[Cars] SELECT 37,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'MoRe Modena Racing Combustion'
INSERT INTO [dbo].[Cars] SELECT 41,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'KOU FORMULA'
INSERT INTO [dbo].[Cars] SELECT 42,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FSIPLeiria'
INSERT INTO [dbo].[Cars] SELECT 43,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'E-Team Squadra Corse'
INSERT INTO [dbo].[Cars] SELECT 44,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'DURacing'
INSERT INTO [dbo].[Cars] SELECT 46,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Polimarche Racing Team'
INSERT INTO [dbo].[Cars] SELECT 50,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Unical Reparto Corse'
INSERT INTO [dbo].[Cars] SELECT 57,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Metz Racing team'
INSERT INTO [dbo].[Cars] SELECT 58,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Athene Racing Team'
INSERT INTO [dbo].[Cars] SELECT 75,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'T.U. Iasi Racing'
INSERT INTO [dbo].[Cars] SELECT 77,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Centaurus Racing Team'
INSERT INTO [dbo].[Cars] SELECT 81,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Ecurie Piston Sport Auto'
INSERT INTO [dbo].[Cars] SELECT 85,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Race UP Combustion'
INSERT INTO [dbo].[Cars] SELECT 88,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'UniBo Motorsport'
INSERT INTO [dbo].[Cars] SELECT 92,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'CESI RACE'
INSERT INTO [dbo].[Cars] SELECT 94,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Rennstall Esslingen'
INSERT INTO [dbo].[Cars] SELECT 96,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FS TUL Racing'



/**** Sheet 1E ****/
INSERT INTO [dbo].[Cars] SELECT 100,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Deefholt Dynamics e.V.'
INSERT INTO [dbo].[Cars] SELECT 111,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Agle Trento Racing Team'
INSERT INTO [dbo].[Cars] SELECT 112,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'OWL Racing-Team'
INSERT INTO [dbo].[Cars] SELECT 114,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Vermilion racing'
INSERT INTO [dbo].[Cars] SELECT 116,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Motion Rennteam Aalen e.V.'
INSERT INTO [dbo].[Cars] SELECT 117,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'AXLR8R Formula Racing'
INSERT INTO [dbo].[Cars] SELECT 119,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'eMotion Racing'
INSERT INTO [dbo].[Cars] SELECT 121,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Aristotle University Racing Team Electric'
INSERT INTO [dbo].[Cars] SELECT 122,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'FaSTDa Racing'
INSERT INTO [dbo].[Cars] SELECT 123,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'FAST CHARGE'
INSERT INTO [dbo].[Cars] SELECT 124,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'FS Team Tallinn'
INSERT INTO [dbo].[Cars] SELECT 125,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Ignition Racing Team electric'
INSERT INTO [dbo].[Cars] SELECT 127,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Team Bath Racing Electric'
INSERT INTO [dbo].[Cars] SELECT 128,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'HofSpannung Motorsport e. V.'
INSERT INTO [dbo].[Cars] SELECT 130,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniTS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 133,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'ISC FS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 134,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'YTU Racing E'
INSERT INTO [dbo].[Cars] SELECT 140,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Team Duisburg-Essen'
INSERT INTO [dbo].[Cars] SELECT 141,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Align Racing'
INSERT INTO [dbo].[Cars] SELECT 142,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Darmstadt Racing Team e.V.'
INSERT INTO [dbo].[Cars] SELECT 144,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Fast Forest'
INSERT INTO [dbo].[Cars] SELECT 145,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'BRS Motorsport'
INSERT INTO [dbo].[Cars] SELECT 146,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Squadra Corse PoliTO'
INSERT INTO [dbo].[Cars] SELECT 149,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'High-Octane Motorsports e.V.'
INSERT INTO [dbo].[Cars] SELECT 151,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'ARUSe'
INSERT INTO [dbo].[Cars] SELECT 153,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Graz Racing Team'
INSERT INTO [dbo].[Cars] SELECT 156,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Tecnun eRacing'
INSERT INTO [dbo].[Cars] SELECT 158,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Scuderia Unicas'
INSERT INTO [dbo].[Cars] SELECT 159,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Superior engineering'
INSERT INTO [dbo].[Cars] SELECT 172,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Bremergy e.V.'
INSERT INTO [dbo].[Cars] SELECT 175,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UH Racing'
INSERT INTO [dbo].[Cars] SELECT 179,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'e-Tech Racing'
INSERT INTO [dbo].[Cars] SELECT 185,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Race UP Electric'
INSERT INTO [dbo].[Cars] SELECT 188,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniBo Motorsport Electric'
INSERT INTO [dbo].[Cars] SELECT 190,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Dynamis PRC'

/**** Sheet 3 ****/
INSERT INTO [dbo].[Cars] SELECT 320,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Formula Student FEUP'
INSERT INTO [dbo].[Cars] SELECT 321,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Bauman Racing Team'
INSERT INTO [dbo].[Cars] SELECT 333,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'AAM Driverless Racing Team'
INSERT INTO [dbo].[Cars] SELECT 342,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Firenze Race Team'
INSERT INTO [dbo].[Cars] SELECT 399,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Team Ojas Racing'

GO


