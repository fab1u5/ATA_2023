--USE [ATA]
GO

DBCC CHECKIDENT (Teams, RESEED, 0)

-- INSERT INTO [dbo].[Teams] ([Name],[University],[Country])

/**** Sheet 1C ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('NED Racers','NED University','Pakistan'),
('UWE FS','University of the West of England','United Kingdom'),
('Cerber Motorsport','Bialystok University of Technology','Poland'),
('TU-Sofia Racing ','Technical University of Sofia','Bulgaria'),
('Aristotle Racing Team (ART)','Aristotle University of Thessaloniki','Greece'),
('FaSTDa Racing Combustion','University of Applied Sciences Darmstadt','Germany'),
('Poliba Corse','Politecnico di Bari','Italy'),
('Tulpar Racing','Ataturk University','Turkey'),
('Scuderia Tor Vergata','Univeristy of Rome Tor Vergata','Italy'),
('YTU Racing','Yildiz Technical University','Turkey'),
('MoRe Modena Racing Combustion','Universit� degli Studi di Modena e Reggio Emilia','Italy'),
('KOU FORMULA','Kocaeli University','Turkey'),
('FSIPLeiria','Polytechnic of Leiria','Portugal'),
('E-Team Squadra Corse','Universit� di Pisa','Italy'),
('DURacing','D�zce University','Turkey'),
('Polimarche Racing Team','Universit� Politecnica delle Marche','Italy'),
('Unical Reparto Corse','Universit� della Calabria','Italy'),
('Metz Racing team','Ecole Nationale d''ing�nireurs de Metz ENIM','France'),
('Athene Racing Team','UniBw M�nchen','Germany'),
('T.U. Iasi Racing','"Gheorghe Asachi" Technical University','Romania'),
('Centaurus Racing Team','University of Thessaly','Greece'),
('Ecurie Piston Sport Auto','Ecole Centrale de Lyon','France'),
('Race UP Combustion','Universit� degli Studi di Padova','Italy'),
('UniBo Motorsport','Universit� di Bologna','Italy'),
('CESI RACE','CESI Ecole d''Ing�nieurs','France'),
('Rennstall Esslingen','UAS Esslingen','Germany'),
('FS TUL Racing','Technick� univerzita v Liberci ','Czech Republic')

GO

/**** Sheet 1E ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Deefholt Dynamics e.V.','UAS Diepholz','Germany'),
('E-Agle Trento Racing Team','University of Trento','Italy'),
('OWL Racing-Team','Technische Hochschule Ostwestfalen-Lippe','Germany'),
('Vermilion racing','DTU (Technical University of Denmark)','Denmark'),
('E-Motion Rennteam Aalen e.V.','Hochschule Aalen','Germany'),
('AXLR8R Formula Racing','Indian Institute Of Technology Delhi','India'),
('eMotion Racing','Hochschule Ruhr West','Germany'),
('Aristotle University Racing Team Electric','Aristotle University of Thessaloniki','Greece'),
('FaSTDa Racing','University of Applied Sciences Darmstadt','Germany'),
('FAST CHARGE','SAPIENZA UNIVERSITY','Italy'),
('FS Team Tallinn','Tallinn UT/UAS','Estonia'),
('Ignition Racing Team electric','UAS Osnabr�ck','Germany'),
('Team Bath Racing Electric','University of Bath','United Kingdom'),
('HofSpannung Motorsport e. V.','University of Applied Sciences Hof','Germany'),
('UniTS Racing Team','Universit� degli Studi di Trieste','Italy'),
('ISC FS Racing Team','Comillas Pontifical University','Spain'),
('YTU Racing E','Yildiz Technical University','Turkey'),
('E-Team Duisburg-Essen','University of Duisburg-Essen','Germany'),
('Align Racing','University of Agder','Norway'),
('TU Darmstadt Racing Team e.V.','TU Darmstadt','Germany'),
('Fast Forest','Deggendorf Institute of Technology','Germany'),
('BRS Motorsport','Hochschule Bonn-Rhein-Sieg','Germany'),
('Squadra Corse PoliTO','Politecnico di Torino','Italy'),
('High-Octane Motorsports e.V.','Friedrich-Alexander-Universit�t Erlangen-N�rnberg','Germany'),
('ARUSe','University of Seville','Spain'),
('TU Graz Racing Team','TU Graz','Austria'),
('Tecnun eRacing','Tecnun - Universidad de Navarra','Spain'),
('Scuderia Unicas','Universit� di Cassino','Italy'),
('Superior engineering','University of Ljubljana','Slovenia'),
('Bremergy e.V.','Universit�t Bremen','Germany'),
('UH Racing','University of Hertfordshire','United Kingdom'),
('e-Tech Racing','UPC EEBE Barcelona','Spain'),
('Race UP Electric','Universit� degli Studi di Padova','Italy'),
('UniBo Motorsport Electric','Alma Mater Studiorum - Universit� di Bologna','Italy'),
('Dynamis PRC','Politecnico di Milano','Italy')

GO

/**** Sheet 3 ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Formula Student FEUP','University of Porto','Portugal'),
('Bauman Racing Team','Bauman Moscow State Technical University','Russia'),
('AAM Driverless Racing Team','Arab Academy for Science, Technology and Maritime Transport','Egypt'),
('Firenze Race Team','Universit� degli Studi di Firenze','Italy'),
('Team Ojas Racing','Vellore Institute of Technology','India')

GO


