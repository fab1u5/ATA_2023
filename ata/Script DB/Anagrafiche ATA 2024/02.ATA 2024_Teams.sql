--USE [ATA]
GO

DBCC CHECKIDENT (Teams, RESEED, 0)

-- INSERT INTO [dbo].[Teams] ([Name],[University],[Country])

/**** Sheet classe 1C ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Bengawan Formula Student Team UNS','Universitas Sebelas Maret','Indonesia'),
('Team Fateh','Thapar Institute of Engineering and trchnology','India'),
('DU RACING','Düzce University','TR'),
('Sapienza Corse','Sapienza Università di Roma','IT'),
('FSTUC','Technical University of Crete','GRE'),
('Ilbirs Racing Team','Ala-Too International University','Kyrgyzstan'),
('Tulpar Racing','Ataturk University','TR'),
('Formula Racing Team of University of Cyprus','University of Cyprus','Cyprus'),
('UniPG Racing Team','Università degli Studi di Perugia','IT'),
('FUF Racing Team','Frederick University','Cyprus'),
('IKC - Racing','Izmir Katip Celebi University','TR'),
('MoRe Modena Racing Hybrid','Università degli Studi di Modena e Reggio Emilia','IT'),
('KOU FORMULA','Kocaeli University','TR'),
('GTU Racing','Gebze Technical University','TR'),
('N1racing','SDU','Kazakhstan'),
('Aixtreme Racing','UAS Aachen','DE'),
('Formul UT','Université de Technologie de Compiègne (UTC)','FR'),
('Nova Racing Team','Universitat Politècnica de Catalunya - EPSEVG','ESP'),
('Pelops Racing Team','University of Peloponnese','GRE')




GO

/**** Sheet classe 1E ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('E-Team Squadra Corse','Università di Pisa','IT'),
('Bern Racing Team','Bern University of Applied Sciences','SUI'),
('Campus Tirol Motorsport','Leopold Franzens Universität Innsbruck','AT'),
('PolSl Racing','Silesian University of Technology','PL'),
('E-Agle Trento Racing Team','University of Trento','IT'),
('Valais Wallis Racing Team','HES-So Valais Wallis','SUI'),
('PWR Racing Team','Wrocław University of Science and Technology','PL'),
('E-Racing Bergamo','Università degli studi di Bergamo','IT'),
('Running Snail Racing Team','OTH Amberg-Weiden','DE'),
('Sapienza Fast Charge','Sapienza University of Rome','IT'),
('FS Team Tallinn','Tallinn TU/UAS','EST'),
('Dynamics e.V.','OTH Regensburg','DE'),
('HofSpannung Motorsport e. V.','UAS Hof','DE'),
('UniTS Racing Team','Università degli studi di Trieste','IT'),
('ISC FS Racing Team','ICAI | Comillas Pontifical University','ESP'),
('TU Istanbul Racing','Istanbul Technical University','TR'),
('UniUD E-Racing Team','Università degli Studi di Udine','IT'),
('KOU FORMULA E','Kocaeli University','TR'),
('Joanneum Racing Graz','UAS Graz','AT'),
('Squadra Corse PoliTO','Politecnico di Torino','IT'),
('METU Formula Racing','Middle East Technical University','TR'),
('TU Graz Racing Team','Graz University of Technology','AT'),
('Scuderia Unicas','Università degli studi di Cassino e del Lazio Meridionale','IT'),
('Scuderia Mensa HS Rhein Main Racing','UAS RheinMain','DE'),
('Eni Metz Racing Team','Ecole Nationale d Ingénieurs de Metz','FR'),
('UPBracing Team e.V.','University of PaderbornUniversity of Paderborn','DE'),
('Superior Engineering','University of Ljubljana','SLO'),
('Aixtreme E-Racing','UAS Aachen','DE'),
('Bremergy','Universität Bremen','DE'),
('E-Traxx Düsseldorf','Hochschule Düsseldorf','DE'),
('eForce Prague Formula','Czech Technical University in Prague','CZ'),
('e-Tech Racing','EEBE UPC Barcelona','ESP'),
('Unical Reparto Corse','Università della Calabria','IT'),
('Race UP Electric Padova','Università degli Studi di Padova','IT'),
('UniBo Motorsport Electric','Alma Mater Studiorum - Università di Bologna','IT'),
('HAWKS Racing e.V.','HAW Hamburg','DE'),
('WHZ Racing Team','Westsächsische Hochschule Zwickau','DE'),
('Metropolia Motorsport','Helsinki Metropolia UAS','FIN')



GO

/**** Sheet classe 3 ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Scuderia Vanvitelli','University of Campania "Luigi Vanvitelli"','IT'),
('Salento Racing Team','Università del Salento','IT'),
('AAM Racing Team','Arab Academy for Science, Technology and Maritime Transport','EGY'),
('FSAE Driverless Padova','Università degli Studi di Padova','IT'),
('UniBo Motorsport Hybrid','Università di Bologna','IT')


GO


