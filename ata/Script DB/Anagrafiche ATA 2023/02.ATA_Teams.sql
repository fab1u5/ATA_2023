--USE [ATA]
GO

DBCC CHECKIDENT (Teams, RESEED, 0)

-- INSERT INTO [dbo].[Teams] ([Name],[University],[Country])

/**** Sheet 1C ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('UPB Drive','Politehnica University of Bucharest','Romania'),
('FUM Racing','Ferdowsi University of Mashhad','Iran'),
('PGRacing Team','Gdańsk University of Technology','Poland'),
('Salento Racing C-Team','Università del Salento','Italy'),
('Formula Students Technical University of Crete','Technical University of Crete','Greece'),
('Poliba Corse','Politecnico di Bari','Italy'),
('FESB Racing','University of Split','Croatia'),
('FS RTU ','Riga Technical University ','Latvia'),
('Scuderia Tor Vergata','University of Rome Tor Vergata','Italy'),
('Formula Racing Team of University of Cyprus (FRTUCY)','University of Cyprus','Cyprus'),
('FUF Racing Team','Frederick University','Cyprus'),
('MoRe Modena Racing Combustion','Università degli Studi di Modena e Reggio Emilia','Italy'),
('KOU FORMULA ','Kocaeli University','Turkey'),
('Bimasakti Racing Team','Universitas Gadjah Mada','Indonesia'),
('INSA Racing Team','INSA Lyon','France'),
('CULS Prague formula racing','Czech university of Life Sciences in Prague','Czech Republic'),
('DU Racing','Düzce Üniverstiy','Turkey'),
('FUEM','Universidad Europea de Madrid','Spain'),
('Race UP Combustion','Università degli Studi di Padova','Italy'),
('Swansea Racing','swansea university','United Kingdom'),
('UniBo Motorsport','Università di Bologna','Italy'),
('CESI RACE ','CESI Ecole d''ingénieurs ','France'),
('Nova Racing Team','EPSEVG - Universitat Politècnica de Catalunya ','Spain')



GO

/**** Sheet 1E ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Bern Racing Team  ','University of Applied Sciences Bern ','Switzerland'),
('E-Agle Trento Racing Team','University of Trento','Italy'),
('Tecnun eRacing','Tecnun - Universidad de Navarra','Spain'),
('eMotion Racing HRW','UAS Ruhr West','Germany'),
('E-Team Squadra Corse ','Università di Pisa','Italy'),
('Sapienza Fast Charge','Sapienza Università di Roma','Italy'),
('FS Team Tallinn','Tallinn TU UAS','Estonia'),
('Brunel Racing','Brunel University London','United Kingdom'),
('Herkules Racing Team','Universität Kassel','Germany'),
('HofSpannung Motorsport e. V.','University of Applied Sciences Hof','Germany'),
('UniTS Racing Team','Università degli studi di Trieste','Italy'),
('PWR Racing Team','Wrocław University of Science and Technology','Poland'),
('Democritus Racing Team','Democritus University of Thrace','Greece'),
('ISC FS Racing Team','ICAI | Comillas Pontifical University','Spain'),
('UniUd E-Racing Team','Università degli Studi di Udine','Italy'),
('KOU FORMULA E','Kocaeli University','Turkey'),
('Align Racing','University of Agder','Norway'),
('TU Darmstadt Racing Team e.V.','TU DarmstadtTU Darmstadt','Germany'),
('BRS Motorsport','UAS Bonn Rhein Sieg','Germany'),
('Kaiserslautern Racing Team - KaRaT e.V.','RPTU Kaiserslautern-Landau','Germany'),
('FST Lisboa','University of Lisbon','Portugal'),
('Speeding Scientists Siegen e.V.','Universität Siegen','Germany'),
('TU Graz Racing Team','Graz University of Technology','Austria'),
('BCN eMotorsport','ETSEIB-ETSETB - UPC Barcelona','Spain'),
('UniNa Corse E-Team','Università degli Studi di Napoli Federico II','Italy'),
('E-Traxx Düsseldorf','Hochschule Düsseldorf','Germany'),
('Team Bath Racing Electric','University of Bath','United Kingdom'),
('Race UP Electric','Università degli Studi di Padova','Italy'),
('UniPR Racing Team','Università di Parma','Italy'),
('Dynamis PRC','Politecnico di Milano','Italy'),
('WHZ Racing Team','UAS Zwickau','Germany'),
('La eRacing','UAS Landshut','Germany'),
('Metropolia Motorsport','Metropolia University of Applied Sciences','Finland'),
('UniBo Motorsport Electric','Università di Bologna','Italy')


GO

/**** Sheet 3 ****/
INSERT INTO [dbo].[Teams] ([Name],[University],[Country])
VALUES
('Polimarche Racing Team','Università Politecnica delle Marche','Italy'),
('Ferrara Squadra Corse','Università degli Studi di Ferrara','Italy'),
('Sapienza Corse','Sapienza Università di Roma','Italy'),
('Salento Racing E-Team','Università del Salento','Italy'),
('AAM Driverless Racing Team','Arab Academy for Science, Technology and Maritime Transport','Egypt')


GO


