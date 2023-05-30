USE [ATA]
GO

DBCC CHECKIDENT (Teams, RESEED, 0)

-- INSERT INTO [dbo].[Teams] ([Name],[University],[Country])

/**** Sheet 1C ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Poliba Corse','Politecnico di Bari','Italy'),
('AGH Racing','AGH University of science and technology','Poland'),
('PERSEUS Racing','UNI Western Macedonia','Greece'),
('Polimarche Racing Team','Universit� Politecnica delle Marche','Italy'),
('Dynamics UPC Manresa','UPC Manresa (EPSEM)','Spain'),
('CULS Prague Formula Racing','Czech University of Life Sciences','Czech Republic'),
('Unical Reparto Corse','Universit� della Calabria','Italy'),
('PGRacing Team','Gdansk University of Technology','Poland'),
('Joanneum Racing Graz','U.A.S. Graz','Austria'),
('STV - Scuderia Tor Vergata','Universit� di Roma Tor Vergata','Italy'),
('CTU CarTech','CTU in Prague','Czech Republic'),
('Engenius','Universidade de Aveiro','Portugal'),
('UPT Racing Team','Politehnica University Timisoara','Romania'),
('MoRe Modena Racing','Universit� di Modena e Reggio Emilia','Italy'),
('E-Team Squadra Corse','Universit� di Pisa','Italy'),
('KOU Formula Student','Kocaeli University','Turkey'),
('Infinity Racing ','Hochschule f�r angewandte Wissenschaften Kempten','Germany'),
('Cerber Motorsport','Bialystok University of Technology','Poland'),
('Race UP Combustion','Universit� di Padova','Italy'),
('UniBo Motorsport','Universit� di Bologna','Italy'),
('Togliatti Racing Team','Togliatti State University','Russia'),
('PWR Racing Team','Wroclaw University of Science and Technology','Poland')
GO

/**** Sheet 1E ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Global Formula Racing','Oregon State University','United States'),
('Scuderia Mensa Racing','Hochschule RheinMain','Germany'),
('UniBo Motorsport Electric','Universit� di Bologna','Italy'),
('StarkStrom Augsburg Electric','UAS Augsburg','Germany'),
('municHMotorsport ','University of Applied Sciences Munich','Germany'),
('UniNa Corse E-Team','Universit� di Napoli Federico II','Italy'),
('eMotion Racing HRW','UAS Ruhr West','Germany'),
('KA-RaceIng E','Karlsruhe Institute of Technology','Germany'),
('Formula Student Team Tallinn','Tallinn University of Applied Sciences/Tallinn University of TechnologyI','Estonia'),
('Evolution Racing Team Saar ','Saarland Universities','Germany'),
('TUfast e-technology','TU M�nchen','Germany'),
('E-Agle Trento Racing Team','Universit� di Trento','Italy'),
('E-Team Duisburg-Essen','University of Duisburg-Essen','Germany'),
('Squadra Corse PoliTo','Politecnico di Torino','Italy'),
('TU Graz Racing Team','TU Graz','Austria'),
('Superior engineering','University of Ljubljana','Slovenia'),
('e-Traxx D�sseldorf','UAS D�sseldorf','Germany'),
('e-Tech Racing','UPC EEBE Barcelona','Spain'),
('FAST CHARGE','Universit� di Roma La Sapienza','Italy'),
('UniPR Racing Team','Universit� di Parma','Italy'),
('Dynamis PRC','Politecnico di Milano','Italy')
GO

/**** Sheet 3 ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('UniTS Racing Team','Universit� di Trieste','Italy'),
('AAM Driverless Racing Team','Arab Academy for Science, Technology & Maritime Transport','Arabia'),
('OMR UniBS Motorsport','Universit� di Brescia','Italy'),
('Alexandria University Motorsports (AUM)','Alexandria University','Egypt')
GO


