USE [ATA]
GO
/****** Object:  View [dbo].[VW_Cars]    Script Date: 23/05/2024 09:37:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[VW_Cars]
AS
						 SELECT        dbo.Cars.Id AS id, dbo.Cars.Carno AS carno, dbo.Cars.Regno AS regno, dbo.Cars.DeliveryDocDate AS deliverydocdate, dbo.Cars.BoxNo AS boxno, 
                         dbo.Cars.Class_Id AS classid, dbo.Cars.Fuel_Id AS fuelid, dbo.Cars.Team_Id AS teamid, dbo.Classes.Name AS classname, dbo.Fuels.Name AS fuelname, 
                         dbo.Teams.Name AS teamname, dbo.Teams.University AS university, dbo.Teams.Country AS country
FROM            dbo.Cars INNER JOIN
                         dbo.Classes ON dbo.Cars.Class_Id = dbo.Classes.Id INNER JOIN
                         dbo.Fuels ON dbo.Cars.Fuel_Id = dbo.Fuels.Id INNER JOIN
                         dbo.Teams ON dbo.Cars.Team_Id = dbo.Teams.Id



GO
/****** Object:  View [dbo].[VW_Events]    Script Date: 23/05/2024 09:37:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[VW_Events]
AS
SELECT        dbo.Events.Id AS id, dbo.Events.Description AS description, dbo.Events.IsScoreNumeric AS isscorenumeric, dbo.Events.MaximumScore AS maximumscore, 
                         dbo.Events.EventName_Id AS eventnameid, dbo.Events.EventType_Id AS eventtypeid, dbo.EventNames.Name AS eventname, 
                         dbo.EventTypes.Name AS eventtypename
FROM            dbo.Events INNER JOIN
                         dbo.EventTypes ON dbo.Events.EventType_Id = dbo.EventTypes.Id INNER JOIN
                         dbo.EventNames ON dbo.Events.EventName_Id = dbo.EventNames.Id AND dbo.EventTypes.Id = dbo.EventNames.EventType_Id



GO
/****** Object:  View [dbo].[VW_Scores]    Script Date: 23/05/2024 09:37:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[VW_Scores]
AS
SELECT        TOP (100) PERCENT dbo.VW_Events.id AS EventId, dbo.VW_Events.description, dbo.VW_Events.isscorenumeric, dbo.VW_Events.maximumscore, dbo.VW_Events.eventnameid, dbo.VW_Events.eventtypeid, 
                         dbo.VW_Events.eventname, dbo.VW_Events.eventtypename, dbo.VW_Cars.id AS CarId, dbo.VW_Cars.carno, dbo.VW_Cars.regno, dbo.VW_Cars.deliverydocdate, dbo.VW_Cars.boxno, dbo.VW_Cars.classid, 
                         dbo.VW_Cars.fuelid, dbo.VW_Cars.teamid, dbo.VW_Cars.classname, dbo.VW_Cars.fuelname, dbo.VW_Cars.teamname, dbo.VW_Cars.university, dbo.VW_Cars.country, 
						 ISNULL(dbo.ScoreEndurances.EfficienctyScore, 0) AS EfficiencyScore, ISNULL(dbo.ScoreEndurances.EnduranceScore, 0) AS EnduranceScore, ISNULL(dbo.Scores.GivenScore, 0) AS GivenScore, 
						 ISNULL(dbo.Scores.PenalityScore, 0) AS PenalityScore, ISNULL(dbo.Scores.PenalityNotes, '') AS PenalityNotes, ISNULL(dbo.Scores.CorrectedScore, 0) AS CorrectedScore, ISNULL(dbo.Scores.Id, 
                         - 1) AS ScoreId, ISNULL(dbo.Scores.FinalsScore, 0) AS FinalsScore, CASE WHEN dbo.VW_Events.EventName LIKE '%DESIGN%' AND dbo.VW_Cars.ClassName IN ('1C', '3') 
                         THEN 'ScoresByCarDesign1C3.html' WHEN dbo.VW_Events.EventName LIKE '%DESIGN%' AND dbo.VW_Cars.ClassName IN ('1E') 
                         THEN 'ScoresByCarDesign1E.html' WHEN dbo.VW_Events.EventName LIKE '%PRESENTATION%' AND dbo.VW_Cars.ClassName IN ('1C', '3', '1E') 
                         THEN 'ScoresByCarPresentation.html' WHEN dbo.VW_Events.EventName LIKE '%COST%' AND dbo.VW_Cars.ClassName IN ('1C', '3', '1E') 
                         THEN 'ScoresByCarCost.html' WHEN dbo.VW_Events.EventName LIKE '%ACCELERATION%' AND dbo.VW_Cars.ClassName IN ('1C', '3', '1E') 
                         THEN 'ScoresByCarAcceleration.html' WHEN dbo.VW_Events.EventName LIKE '%SKID%' AND dbo.VW_Cars.ClassName IN ('1C', '3', '1E') 
                         THEN 'ScoresByCarSkidPad.html' WHEN dbo.VW_Events.EventName LIKE '%AUTO%' AND dbo.VW_Cars.ClassName IN ('1C', '3', '1E') 
                         THEN 'ScoresByCarAutoCross.html' WHEN dbo.VW_Events.EventName LIKE '%ENDURANCE%' AND dbo.VW_Cars.ClassName IN ('1C', '3', '1E') THEN 'ScoresByCarEndurance.html' ELSE '' END AS PageToJump, 
                         ISNULL(dbo.Scores.UploadingExamboard, 0) AS UploadingExamboard
FROM            dbo.VW_Cars CROSS JOIN
                         dbo.VW_Events LEFT OUTER JOIN
                         dbo.Scores ON dbo.Scores.Car_Id = dbo.VW_Cars.id AND dbo.Scores.Event_Id = dbo.VW_Events.id Left outer JOIN
						 dbo.ScoreEndurances on dbo.ScoreEndurances.Score_Id = dbo.Scores.Id
GO
/****** Object:  View [dbo].[VW_Scores_Cars_Classes]    Script Date: 23/05/2024 09:37:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[VW_Scores_Cars_Classes]
AS
SELECT DISTINCT 
                         TOP (100) PERCENT dbo.VW_Cars.ClassId, dbo.VW_Cars.ClassName, dbo.VW_Events.id AS EventId, dbo.VW_Events.Description, dbo.VW_Events.EventNameId, 
                         dbo.VW_Events.EventName, dbo.VW_Events.EventTypeId, dbo.VW_Events.EventTypeName, MAX(ISNULL(dbo.Scores.GivenScore, 0)) AS GivenScore
FROM            dbo.VW_Cars CROSS JOIN
                         dbo.VW_Events LEFT OUTER JOIN
                         dbo.Scores ON dbo.Scores.Car_Id = dbo.VW_Cars.id AND dbo.Scores.Event_Id = dbo.VW_Events.id
GROUP BY dbo.VW_Cars.classid, dbo.VW_Cars.classname, dbo.VW_Events.id, dbo.VW_Events.description, dbo.VW_Events.eventnameid, dbo.VW_Events.eventname, 
                         dbo.VW_Events.eventtypeid, dbo.VW_Events.eventtypename
ORDER BY dbo.VW_Cars.classname, dbo.VW_Events.eventtypename




GO
/****** Object:  View [dbo].[VW_Scores_Partial_Design1C3]    Script Date: 23/05/2024 09:37:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[VW_Scores_Partial_Design1C3]
AS


	SELECT	Scores.Id AS ScoreId, 
			ISNULL(Powertrain,0) AS Powertrain, ISNULL(Suspension,0) AS Suspension, 
			ISNULL(FrameBodyAero,0) AS FrameBodyAero, ISNULL(CockpitControlsBrakesSafety,0) AS CockpitControlsBrakesSafety, 
			ISNULL(SystemManagementIntegration,0) AS SystemManagementIntegration, ISNULL(ManufacturabilityServiceability,0) AS ManufacturabilityServiceability, 
			ISNULL(AestheticsStyle,0) AS AestheticsStyle, ISNULL(Creativity,0) AS Creativity, ISNULL(Miscellaneous,0) AS Miscellaneous
	FROM Scores 
	LEFT JOIN ScoreDesign1C3
	ON Scores.Id = ScoreDesign1C3.Score_Id





GO
/****** Object:  View [dbo].[VW_Scores_Partial_Design1E]    Script Date: 23/05/2024 09:37:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[VW_Scores_Partial_Design1E]
AS
	SELECT	Scores.Id AS ScoreId, 
			ISNULL(TractiveDriveRecoverySystem,0) AS TractiveDriveRecoverySystem, ISNULL(Suspension,0) AS Suspension, 
			ISNULL(FrameBodyAero,0) AS FrameBodyAero, ISNULL(CockpitControlsBrakesSafety,0) AS CockpitControlsBrakesSafety, 
			ISNULL(SystemManagementIntegration,0) AS SystemManagementIntegration, ISNULL(ManufacturabilityServiceability,0) AS ManufacturabilityServiceability, 
			ISNULL(AestheticsStyle,0) AS AestheticsStyle, ISNULL(Creativity,0) AS Creativity, ISNULL(Miscellaneous,0) AS Miscellaneous
	FROM Scores 
	LEFT JOIN ScoreDesign1E
	ON Scores.Id = ScoreDesign1E.Score_Id





GO
/****** Object:  View [dbo].[VW_Scores_Partial_Presentation]    Script Date: 23/05/2024 09:37:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[VW_Scores_Partial_Presentation]
AS
SELECT        dbo.Scores.Id AS ScoreId, 
						--ISNULL(dbo.ScorePresentations.Novelty0 + dbo.ScorePresentations.Novelty1 + dbo.ScorePresentations.Novelty2, 0) AS Novelty, 
                         ISNULL(dbo.ScorePresentations.Content0 + dbo.ScorePresentations.Content1 + dbo.ScorePresentations.Content2 + dbo.ScorePresentations.Content3 + dbo.ScorePresentations.Content4 + dbo.ScorePresentations.Content5
                          + dbo.ScorePresentations.Content6 
                          --//FDT - ATA2024
                          --+ dbo.ScorePresentations.Content7 
						  --+ dbo.ScorePresentations.Content8 
						  --+ dbo.ScorePresentations.Content9
						  , 0) AS [Content], 
						  --FDT - ATA 2024
                         ISNULL(dbo.ScorePresentations.Finances0 + dbo.ScorePresentations.Finances1 + dbo.ScorePresentations.Finances2 + dbo.ScorePresentations.Finances3 + dbo.ScorePresentations.Finances4
						  + dbo.ScorePresentations.Finances5 + dbo.ScorePresentations.Finances6 + dbo.ScorePresentations.Finances7 + dbo.ScorePresentations.Finances8 + dbo.ScorePresentations.Finances9
						   + dbo.ScorePresentations.Finances10 + dbo.ScorePresentations.Finances11, 0) AS Finances, 
                         ISNULL(dbo.ScorePresentations.DeepDiveTopic0 + dbo.ScorePresentations.DeepDiveTopic1 + dbo.ScorePresentations.DeepDiveTopic2 
						 + dbo.ScorePresentations.DeepDiveTopic3 
						 --+ dbo.ScorePresentations.DeepDiveTopic4
						 , 0) AS DeepDiveTopic, 
                         ISNULL(dbo.ScorePresentations.Demonstration0 + dbo.ScorePresentations.Demonstration1 + dbo.ScorePresentations.Demonstration2 
						 + dbo.ScorePresentations.Demonstration3
                         --//FDT - ATA2024
                         + dbo.ScorePresentations.Demonstration4 
						 + dbo.ScorePresentations.Demonstration5
						  , 0) AS Demonstration, 
                         ISNULL(dbo.ScorePresentations.Delivery0 + dbo.ScorePresentations.Delivery1 + dbo.ScorePresentations.Delivery2 + dbo.ScorePresentations.Delivery3 + dbo.ScorePresentations.Delivery4 + dbo.ScorePresentations.Delivery5
                          + dbo.ScorePresentations.Delivery6 + dbo.ScorePresentations.Delivery7 
                          --//FDT - ATA2024
                          --+ dbo.ScorePresentations.Delivery8 + dbo.ScorePresentations.Delivery9
                          , 0) AS Delivery, 
                         ISNULL(dbo.ScorePresentations.Questions0 + dbo.ScorePresentations.Questions1 + dbo.ScorePresentations.Questions2 + dbo.ScorePresentations.Questions3 + dbo.ScorePresentations.Questions4 + dbo.ScorePresentations.Questions5
                          + dbo.ScorePresentations.Questions6 + dbo.ScorePresentations.Questions7 
						  --+ dbo.ScorePresentations.Questions8 + dbo.ScorePresentations.Questions9
						  , 0) AS Questions, 
						 ISNULL(dbo.ScorePresentations.Structure0 + dbo.ScorePresentations.Structure1 + dbo.ScorePresentations.Structure2 + dbo.ScorePresentations.Structure3
						 + dbo.ScorePresentations.Structure4 
                         --//FDT - ATA2024
                         --+ dbo.ScorePresentations.Structure5
						 , 0) AS Structure, 
                          
                         ISNULL(dbo.ScorePresentations.GeneralImpression0 + dbo.ScorePresentations.GeneralImpression1 + dbo.ScorePresentations.GeneralImpression2, 0) AS GeneralImpression, 
                         ISNULL(dbo.ScorePresentations.Miscellaneous, 0) AS Miscellaneous, ISNULL(dbo.ScorePresentations.Stage1, 0) AS Stage1, 
                         ISNULL(
						 --FDT - ATA 2023 - eliminato Business Figures - INIZIO
						 --dbo.ScorePresentations.St2BusinnesFigures0 + dbo.ScorePresentations.St2BusinnesFigures1 + dbo.ScorePresentations.St2BusinnesFigures2 + dbo.ScorePresentations.St2BusinnesFigures3 
						 --+ dbo.ScorePresentations.St2BusinnesFigures4
						 --FDT - ATA 2023 - eliminato Business Figures - FINE
						 --//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
						 dbo.ScorePresentations.St2FinConcept0 + dbo.ScorePresentations.St2FinConcept1 + dbo.ScorePresentations.St2FinConcept2 + dbo.ScorePresentations.St2FinConcept3 + dbo.ScorePresentations.St2FinConcept4 + dbo.ScorePresentations.St2FinConcept5 +dbo.ScorePresentations.St2FinConcept6 +
						 dbo.ScorePresentations.St2FinConcept7 + dbo.ScorePresentations.St2FinConcept8 + dbo.ScorePresentations.St2FinConcept9 
						 --//FDT - ATA 2023 - aggiunto Financial Concept - FINE
						 --//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
						 + dbo.ScorePresentations.St2FinKPIs0 + dbo.ScorePresentations.St2FinKPIs1 + dbo.ScorePresentations.St2FinKPIs2 + dbo.ScorePresentations.St2FinKPIs3 + dbo.ScorePresentations.St2FinKPIs4
						 --//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
						 --//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                          --+ dbo.ScorePresentations.St2Content0 + dbo.ScorePresentations.St2Content1 + dbo.ScorePresentations.St2Content2 + dbo.ScorePresentations.St2Content3 + dbo.ScorePresentations.St2Content4 + 
						  --//FDT - ATA 2023 - eliminato Content e Investors - FINE
						  + dbo.ScorePresentations.St2DemonstrationAndDelivery0 + dbo.ScorePresentations.St2DemonstrationAndDelivery1 + dbo.ScorePresentations.St2DemonstrationAndDelivery2 + dbo.ScorePresentations.St2DemonstrationAndDelivery3 + dbo.ScorePresentations.St2DemonstrationAndDelivery4
                          --//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
						  --+ dbo.ScorePresentations.St2Investitors0 + dbo.ScorePresentations.St2Investitors1 + dbo.ScorePresentations.St2Investitors2, 
						  --+ dbo.ScorePresentations.St2Investitors3
						  , 0)
						  --//FDT - ATA 2023 - eliminato Content e Investors - FINE
						  AS Stage2, 
                         --ISNULL(dbo.ScorePresentations.Novelty0 + dbo.ScorePresentations.Novelty1 + dbo.ScorePresentations.Novelty2, 0) 
                         + ISNULL(dbo.ScorePresentations.Content0 + dbo.ScorePresentations.Content1 + dbo.ScorePresentations.Content2 + dbo.ScorePresentations.Content3 + dbo.ScorePresentations.Content4 + dbo.ScorePresentations.Content5
                          + dbo.ScorePresentations.Content6 
                          --FDT - ATA2024
                          --+ dbo.ScorePresentations.Content7 
						  --+ dbo.ScorePresentations.Content8 
						  --+ dbo.ScorePresentations.Content9
						  , 0) 
						  --FDT - ATA 2024
                         + ISNULL(dbo.ScorePresentations.Finances0 + dbo.ScorePresentations.Finances1 + dbo.ScorePresentations.Finances2 + dbo.ScorePresentations.Finances3 + dbo.ScorePresentations.Finances4
						  + dbo.ScorePresentations.Finances5 + dbo.ScorePresentations.Finances6 + dbo.ScorePresentations.Finances7 + dbo.ScorePresentations.Finances8 + dbo.ScorePresentations.Finances9
						   + dbo.ScorePresentations.Finances10 + dbo.ScorePresentations.Finances11, 0) 
                         + ISNULL(dbo.ScorePresentations.DeepDiveTopic0 + dbo.ScorePresentations.DeepDiveTopic1 + dbo.ScorePresentations.DeepDiveTopic2 
						 + dbo.ScorePresentations.DeepDiveTopic3 
						 --+ dbo.ScorePresentations.DeepDiveTopic4
						 ,0) 
                         + ISNULL(dbo.ScorePresentations.Demonstration0 + dbo.ScorePresentations.Demonstration1 + dbo.ScorePresentations.Demonstration2 
						 + dbo.ScorePresentations.Demonstration3 
                         --//FDT - ATA2024
						 + dbo.ScorePresentations.Demonstration4 
						 + dbo.ScorePresentations.Demonstration5
						 , 0) 
                         + ISNULL(dbo.ScorePresentations.Delivery0 + dbo.ScorePresentations.Delivery1 + dbo.ScorePresentations.Delivery2 + dbo.ScorePresentations.Delivery3 + dbo.ScorePresentations.Delivery4 + dbo.ScorePresentations.Delivery5
                          + dbo.ScorePresentations.Delivery6 + dbo.ScorePresentations.Delivery7
                          --//FDT - ATA2024
                          --+ dbo.ScorePresentations.Delivery8 + dbo.ScorePresentations.Delivery9
                          , 0) 
                         + ISNULL(dbo.ScorePresentations.Questions0 + dbo.ScorePresentations.Questions1 + dbo.ScorePresentations.Questions2 + dbo.ScorePresentations.Questions3 + dbo.ScorePresentations.Questions4 + dbo.ScorePresentations.Questions5
                          + dbo.ScorePresentations.Questions6 + dbo.ScorePresentations.Questions7 
						  --+ dbo.ScorePresentations.Questions8 + dbo.ScorePresentations.Questions9
						  , 0) 
						  + ISNULL(dbo.ScorePresentations.Structure0 + dbo.ScorePresentations.Structure1 + dbo.ScorePresentations.Structure2 + dbo.ScorePresentations.Structure3
						  + dbo.ScorePresentations.Structure4 
                          --//FDT - ATA2024
                          --+ dbo.ScorePresentations.Structure5 
                          , 0)                          
                         + ISNULL(dbo.ScorePresentations.GeneralImpression0 + dbo.ScorePresentations.GeneralImpression1 + dbo.ScorePresentations.GeneralImpression2, 0) + ISNULL(dbo.ScorePresentations.Miscellaneous, 0) 
                         + ISNULL(
						 --FDT - ATA 2023 - eliminato Business Figures - INIZIO
						 --dbo.ScorePresentations.St2BusinnesFigures0 + dbo.ScorePresentations.St2BusinnesFigures1 + dbo.ScorePresentations.St2BusinnesFigures2 + dbo.ScorePresentations.St2BusinnesFigures3,
						 --+ dbo.ScorePresentations.St2BusinnesFigures4,
						 --//FDT - ATA 2023 - aggiunto Financial Concept - FINE
						 --//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
						 dbo.ScorePresentations.St2FinConcept0 + dbo.ScorePresentations.St2FinConcept1 + dbo.ScorePresentations.St2FinConcept2 + dbo.ScorePresentations.St2FinConcept3 + dbo.ScorePresentations.St2FinConcept4 + dbo.ScorePresentations.St2FinConcept5 +dbo.ScorePresentations.St2FinConcept6 +
						 dbo.ScorePresentations.St2FinConcept7 + dbo.ScorePresentations.St2FinConcept8 + dbo.ScorePresentations.St2FinConcept9 ,
						 --//FDT - ATA 2023 - aggiunto Financial Concept - FINE
                          0) 
						 --//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
						 + ISNULL(dbo.ScorePresentations.St2FinKPIs0 + dbo.ScorePresentations.St2FinKPIs1 + dbo.ScorePresentations.St2FinKPIs2 + dbo.ScorePresentations.St2FinKPIs3 + dbo.ScorePresentations.St2FinKPIs4 , 0)
						 --//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
						  --//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
						  --+ ISNULL(dbo.ScorePresentations.St2Content0 + dbo.ScorePresentations.St2Content1 + dbo.ScorePresentations.St2Content2 + --dbo.ScorePresentations.St2Content3 + dbo.ScorePresentations.St2Content4, 0) 
						  --//FDT - ATA 2023 - eliminato Content e Investors - FINE
                         + ISNULL(dbo.ScorePresentations.St2DemonstrationAndDelivery0 + dbo.ScorePresentations.St2DemonstrationAndDelivery1 + dbo.ScorePresentations.St2DemonstrationAndDelivery2 + dbo.ScorePresentations.St2DemonstrationAndDelivery3
                          + dbo.ScorePresentations.St2DemonstrationAndDelivery4, 0) 
                         --//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
						 --+ ISNULL(dbo.ScorePresentations.St2Investitors0 + dbo.ScorePresentations.St2Investitors1 + dbo.ScorePresentations.St2Investitors2, 
						 --+ dbo.ScorePresentations.St2Investitors3,0) 
						 --//FDT - ATA 2023 - eliminato Content e Investors - FINE
                         + ISNULL(dbo.ScorePresentations.Stage1, 0) AS Total, ISNULL(dbo.ScorePresentations.Finals, 0) AS Finals
FROM            dbo.Scores LEFT OUTER JOIN
                         dbo.ScorePresentations ON dbo.Scores.Id = dbo.ScorePresentations.Score_Id

GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[19] 4[43] 2[21] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "VW_Cars"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 211
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "VW_Events"
            Begin Extent = 
               Top = 6
               Left = 249
               Bottom = 136
               Right = 420
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Scores"
            Begin Extent = 
               Top = 138
               Left = 38
               Bottom = 268
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_Scores'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_Scores'
GO
