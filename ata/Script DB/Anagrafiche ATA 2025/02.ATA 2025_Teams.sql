--USE [ATA]
GO

DBCC CHECKIDENT (Teams, RESEED, 0)

-- INSERT INTO [dbo].[Teams] ([Name],[University],[Country])

/**** Sheet classe 1C ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Polytech Racing Team','Polytech Lyon','ITA'),
('BlueStreamline','Transilvania University of Brasov','RO'),
('ESTU Racing','Eskisehir Technical University','TR'),
('MoRe Modena Racing Hybrid','Università degli Studi di Modena e Reggio Emilia','ITA'),
('KOU FORMULA','Kocaeli University','TR'),
('GTU Racing','Gebze Technical University','TR'),
('THE INTERCEPTORS ','DR .D.Y PATIL INSTITIUTE OF TECHNOLOGY ,PIMPRI ','IND'),
('Pravega Racing','Vellore Institute of Technology ','IND'),
('AAM Racing Team','Arab Academy for Science, Technology and Maritime','EGY'),
('Formul''UT','Université Technologique de Compiègne','FRA'),
('UniBo Motorsport Hybrid ','Alma Mater Studiorum - Università di Bologna','ITA'),
('UPB Drive','Politehnica Bucharest','RO')




GO

/**** Sheet classe 1E ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Ferrara Squadra Corse','Università degli Studi di Ferrara','ITA'),
('UWB eRacing Team Pilsen','University of West Bohemia in Pilsen','CZ'),
('Strohm und Söhne','UAS Nuernberg','DE'),
('Scuderia Unicas','Università degli studi di Cassino e del Lazio Meridionale','ITA'),
('Valais Wallis Racing Team','HES-SO Valais Wallis','SUI'),
('Unical Reparto Corse','Università della Calabria','ITA'),
('E-Team Squadra Corse','University of Pisa','ITA'),
('UniNa Corse - Squadra Corse Federico II','Università degli Studi di Napoli Federico II','ITA'),
('Sapienza Fast Charge','La Sapienza Università di Roma','ITA'),
('FS Team Tallinn','Tallinn TU UAS','EST'),
('E-Racing Bergamo','Università degli Studi di Bergamo','ITA'),
('Dynamics e.V.','OTH Regensburg ','DE'),
('UniTS Racing Team','Università degli studi di Trieste','ITA'),
('municHMotorsport e.V.','UAS Munich','DE'),
('TU Istanbul Racing','Istanbul Technical University','TR'),
('Schanzer Racing Electric e.V.','Technische Hochschule Ingolstadt','DE'),
('Road Arrow','University of Belgrade','SRB'),
('VUB Racing','Vrije Universiteit Brussel','BG'),
('UniUD E-Racing Team','Università degli Studi di Udine','ITA'),
('KOU FORMULA E','Kocaeli University','TR'),
('TU Wien Racing','TU Wien','AUT'),
('Squadra Corse PoliTO','Politecnico di Torino','ITA'),
('UPBracing Team e.V.','University of Paderborn','DE'),
('Superior Engineering','University of Ljubljana','SLO'),
('HAWKS Racing','HAW Hamburg','DE'),
('Aixtreme Racing ','Fachhochschule Aachen','DE'),
('Bremergy','Universität Brmeen','DE'),
('UoP Racing Team','University of Patras','GR'),
('UniPR Racing Team','Università di Parma','ITA'),
('WHZ Racing Team','UAS Zwickau','DE'),
('Mainfranken Racing e.V.','Technical University of Applied Sciences Würzburg-Schweinfurt','DE'),
('Salento Racing Team','Università del Salento','ITA')




GO

/**** Sheet classe 3 ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Bengawan Formula Student Team','Universitas Sebelas Maret','IDN'),
('E-Agle Trento Racing Team','University of Trento','ITA'),
('Bimasakti Racing Team','Universitas Gadjah Mada','IDN'),
('UniPG Racing Team','Università degli Studi di Perugia','ITA'),
('UniBo Motorsport Electric','Alma Mater Studiorum - Università di Bologna','ITA')


GO


