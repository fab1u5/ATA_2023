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
INSERT INTO [dbo].[Cars] SELECT 10,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Polytech Racing Team'
INSERT INTO [dbo].[Cars] SELECT 11,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'BlueStreamline'
INSERT INTO [dbo].[Cars] SELECT 26,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'ESTU Racing'
INSERT INTO [dbo].[Cars] SELECT 37,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'MoRe Modena Racing Hybrid'
INSERT INTO [dbo].[Cars] SELECT 41,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'KOU FORMULA'
INSERT INTO [dbo].[Cars] SELECT 46,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'GTU Racing'
INSERT INTO [dbo].[Cars] SELECT 52,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'THE INTERCEPTORS '
INSERT INTO [dbo].[Cars] SELECT 54,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Pravega Racing'
INSERT INTO [dbo].[Cars] SELECT 77,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'AAM Racing Team'
INSERT INTO [dbo].[Cars] SELECT 86,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'Formul''UT'
INSERT INTO [dbo].[Cars] SELECT 88,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'UniBo Motorsport Hybrid '
INSERT INTO [dbo].[Cars] SELECT 96,0,GETDATE(),0,@1C,@98RON,Id From Teams WhERE Name LIKE 'UPB Drive'





/**** Sheet 1E ****/
INSERT INTO [dbo].[Cars] SELECT 100,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Ferrara Squadra Corse'
INSERT INTO [dbo].[Cars] SELECT 102,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UWB eRacing Team Pilsen'
INSERT INTO [dbo].[Cars] SELECT 106,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Strohm und Söhne'
INSERT INTO [dbo].[Cars] SELECT 111,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Scuderia Unicas'
INSERT INTO [dbo].[Cars] SELECT 113,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Valais Wallis Racing Team'
INSERT INTO [dbo].[Cars] SELECT 120,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Unical Reparto Corse'
INSERT INTO [dbo].[Cars] SELECT 121,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Team Squadra Corse'
INSERT INTO [dbo].[Cars] SELECT 122,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniNa Corse - Squadra Corse Federico II'
INSERT INTO [dbo].[Cars] SELECT 123,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Sapienza Fast Charge'
INSERT INTO [dbo].[Cars] SELECT 124,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'FS Team Tallinn'
INSERT INTO [dbo].[Cars] SELECT 125,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'E-Racing Bergamo'
INSERT INTO [dbo].[Cars] SELECT 126,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Dynamics e.V.'
INSERT INTO [dbo].[Cars] SELECT 130,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniTS Racing Team'
INSERT INTO [dbo].[Cars] SELECT 131,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'municHMotorsport e.V.'
INSERT INTO [dbo].[Cars] SELECT 133,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Istanbul Racing'
INSERT INTO [dbo].[Cars] SELECT 134,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Schanzer Racing Electric e.V.'
INSERT INTO [dbo].[Cars] SELECT 135,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Road Arrow'
INSERT INTO [dbo].[Cars] SELECT 139,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'VUB Racing'
INSERT INTO [dbo].[Cars] SELECT 140,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniUD E-Racing Team'
INSERT INTO [dbo].[Cars] SELECT 141,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'KOU FORMULA E'
INSERT INTO [dbo].[Cars] SELECT 142,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'TU Wien Racing'
INSERT INTO [dbo].[Cars] SELECT 146,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Squadra Corse PoliTO'
INSERT INTO [dbo].[Cars] SELECT 158,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UPBracing Team e.V.'
INSERT INTO [dbo].[Cars] SELECT 159,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Superior Engineering'
INSERT INTO [dbo].[Cars] SELECT 170,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'HAWKS Racing'
INSERT INTO [dbo].[Cars] SELECT 171,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Aixtreme Racing '
INSERT INTO [dbo].[Cars] SELECT 172,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Bremergy'
INSERT INTO [dbo].[Cars] SELECT 186,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UoP Racing Team'
INSERT INTO [dbo].[Cars] SELECT 188,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'UniPR Racing Team'
INSERT INTO [dbo].[Cars] SELECT 196,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'WHZ Racing Team'
INSERT INTO [dbo].[Cars] SELECT 197,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Mainfranken Racing e.V.'
INSERT INTO [dbo].[Cars] SELECT 199,0,GETDATE(),0,@1E,@ELEC,Id From Teams WhERE Name LIKE 'Salento Racing Team'




/**** Sheet 3 ****/
INSERT INTO [dbo].[Cars] SELECT 311,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Bengawan Formula Student Team'
INSERT INTO [dbo].[Cars] SELECT 333,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'E-Agle Trento Racing Team'
INSERT INTO [dbo].[Cars] SELECT 345,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'Bimasakti Racing Team'
INSERT INTO [dbo].[Cars] SELECT 370,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'UniPG Racing Team'
INSERT INTO [dbo].[Cars] SELECT 388,0,GETDATE(),0,@3,@98RON,Id From Teams WhERE Name LIKE 'UniBo Motorsport Electric'




GO


