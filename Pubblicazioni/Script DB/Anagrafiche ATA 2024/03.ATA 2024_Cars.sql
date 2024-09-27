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
INSERT INTO [dbo].[Cars] SELECT 3,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Bengawan Formula Student Team UNS'
INSERT INTO [dbo].[Cars] SELECT 7,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Team Fateh'
INSERT INTO [dbo].[Cars] SELECT 10,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'DU RACING'
INSERT INTO [dbo].[Cars] SELECT 19,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Sapienza Corse'
INSERT INTO [dbo].[Cars] SELECT 20,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FSTUC'
INSERT INTO [dbo].[Cars] SELECT 23,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Ilbirs Racing Team'
INSERT INTO [dbo].[Cars] SELECT 25,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Tulpar Racing'
INSERT INTO [dbo].[Cars] SELECT 28,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Formula Racing Team of University of Cyprus'
INSERT INTO [dbo].[Cars] SELECT 29,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'UniPG Racing Team'
INSERT INTO [dbo].[Cars] SELECT 33,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'FUF Racing Team'
INSERT INTO [dbo].[Cars] SELECT 35,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'IKC - Racing'
INSERT INTO [dbo].[Cars] SELECT 37,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'MoRe Modena Racing Hybrid'
INSERT INTO [dbo].[Cars] SELECT 41,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'KOU FORMULA'
INSERT INTO [dbo].[Cars] SELECT 46,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'GTU Racing'
INSERT INTO [dbo].[Cars] SELECT 49,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'N1racing'
INSERT INTO [dbo].[Cars] SELECT 71,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Aixtreme Racing'
INSERT INTO [dbo].[Cars] SELECT 86,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Formul UT'
INSERT INTO [dbo].[Cars] SELECT 88,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Nova Racing Team'
INSERT INTO [dbo].[Cars] SELECT 97,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Pelops Racing Team'




/**** Sheet 1E ****/
INSERT INTO [dbo].[Cars] SELECT 100,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Team Squadra Corse'
INSERT INTO [dbo].[Cars] SELECT 106,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Bern Racing Team'
INSERT INTO [dbo].[Cars] SELECT 107,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Campus Tirol Motorsport'
INSERT INTO [dbo].[Cars] SELECT 110,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'PolSl Racing'
INSERT INTO [dbo].[Cars] SELECT 111,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Agle Trento Racing Team'
INSERT INTO [dbo].[Cars] SELECT 113,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Valais Wallis Racing Team'
INSERT INTO [dbo].[Cars] SELECT 114,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'PWR Racing Team'
INSERT INTO [dbo].[Cars] SELECT 120,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Racing Bergamo'
INSERT INTO [dbo].[Cars] SELECT 121,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Running Snail Racing Team'
INSERT INTO [dbo].[Cars] SELECT 123,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Sapienza Fast Charge'
INSERT INTO [dbo].[Cars] SELECT 124,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'FS Team Tallinn'
INSERT INTO [dbo].[Cars] SELECT 126,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Dynamics e.V.'
INSERT INTO [dbo].[Cars] SELECT 128,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'HofSpannung Motorsport e. V.'
INSERT INTO [dbo].[Cars] SELECT 130,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniTS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 133,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'ISC FS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 134,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Istanbul Racing'
INSERT INTO [dbo].[Cars] SELECT 140,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniUD E-Racing Team'
INSERT INTO [dbo].[Cars] SELECT 141,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'KOU FORMULA E'
INSERT INTO [dbo].[Cars] SELECT 142,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Joanneum Racing Graz'
INSERT INTO [dbo].[Cars] SELECT 146,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Squadra Corse PoliTO'
INSERT INTO [dbo].[Cars] SELECT 147,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'METU Formula Racing'
INSERT INTO [dbo].[Cars] SELECT 153,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Graz Racing Team'
INSERT INTO [dbo].[Cars] SELECT 155,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Scuderia Unicas'
INSERT INTO [dbo].[Cars] SELECT 156,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Scuderia Mensa HS Rhein Main Racing'
INSERT INTO [dbo].[Cars] SELECT 157,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Eni Metz Racing Team'
INSERT INTO [dbo].[Cars] SELECT 158,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UPBracing Team e.V.'
INSERT INTO [dbo].[Cars] SELECT 159,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Superior Engineering'
INSERT INTO [dbo].[Cars] SELECT 171,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Aixtreme E-Racing'
INSERT INTO [dbo].[Cars] SELECT 172,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Bremergy'
INSERT INTO [dbo].[Cars] SELECT 173,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Traxx Düsseldorf'
INSERT INTO [dbo].[Cars] SELECT 174,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'eForce Prague Formula'
INSERT INTO [dbo].[Cars] SELECT 179,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'e-Tech Racing'
INSERT INTO [dbo].[Cars] SELECT 181,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Unical Reparto Corse'
INSERT INTO [dbo].[Cars] SELECT 185,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Race UP Electric Padova'
INSERT INTO [dbo].[Cars] SELECT 188,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniBo Motorsport Electric'
INSERT INTO [dbo].[Cars] SELECT 195,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'HAWKS Racing e.V.'
INSERT INTO [dbo].[Cars] SELECT 196,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'WHZ Racing Team'
INSERT INTO [dbo].[Cars] SELECT 198,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Metropolia Motorsport'




/**** Sheet 3 ****/
INSERT INTO [dbo].[Cars] SELECT 302,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Scuderia Vanvitelli'
INSERT INTO [dbo].[Cars] SELECT 319,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Salento Racing Team'
INSERT INTO [dbo].[Cars] SELECT 333,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'AAM Racing Team'
INSERT INTO [dbo].[Cars] SELECT 385,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'FSAE Driverless Padova'
INSERT INTO [dbo].[Cars] SELECT 388,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'UniBo Motorsport Hybrid'



GO


