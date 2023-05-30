namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TwentyFirst : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "ExecutiveSummaryNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "Novelty0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Novelty1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Novelty2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Novelty3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "NoveltyNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "Finances0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "FinancesNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DeepDiveTopicNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructureNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "GeneralImpression0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "GeneralImpression1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "GeneralImpression2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "GeneralImpressionNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "Miscellaneous", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "MiscellaneousNotes", c => c.String());
            DropColumn("dbo.ScorePresentations", "Content9");
            DropColumn("dbo.ScorePresentations", "Organization0");
            DropColumn("dbo.ScorePresentations", "Organization1");
            DropColumn("dbo.ScorePresentations", "Organization2");
            DropColumn("dbo.ScorePresentations", "Organization3");
            DropColumn("dbo.ScorePresentations", "Organization4");
            DropColumn("dbo.ScorePresentations", "Organization5");
            DropColumn("dbo.ScorePresentations", "Organization6");
            DropColumn("dbo.ScorePresentations", "Organization7");
            DropColumn("dbo.ScorePresentations", "Organization8");
            DropColumn("dbo.ScorePresentations", "OrganizationNotes");
            DropColumn("dbo.ScorePresentations", "VisualAids0");
            DropColumn("dbo.ScorePresentations", "VisualAids1");
            DropColumn("dbo.ScorePresentations", "VisualAids2");
            DropColumn("dbo.ScorePresentations", "VisualAids3");
            DropColumn("dbo.ScorePresentations", "VisualAids4");
            DropColumn("dbo.ScorePresentations", "VisualAids5");
            DropColumn("dbo.ScorePresentations", "VisualAids6");
            DropColumn("dbo.ScorePresentations", "VisualAids7");
            DropColumn("dbo.ScorePresentations", "VisualNotes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "VisualNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "VisualAids7", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "OrganizationNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "Organization8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization7", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Content9", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "MiscellaneousNotes");
            DropColumn("dbo.ScorePresentations", "Miscellaneous");
            DropColumn("dbo.ScorePresentations", "GeneralImpressionNotes");
            DropColumn("dbo.ScorePresentations", "GeneralImpression2");
            DropColumn("dbo.ScorePresentations", "GeneralImpression1");
            DropColumn("dbo.ScorePresentations", "GeneralImpression0");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructureNotes");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure4");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure3");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure2");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure1");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure0");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopicNotes");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic3");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic2");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic1");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic0");
            DropColumn("dbo.ScorePresentations", "FinancesNotes");
            DropColumn("dbo.ScorePresentations", "Finances6");
            DropColumn("dbo.ScorePresentations", "Finances5");
            DropColumn("dbo.ScorePresentations", "Finances4");
            DropColumn("dbo.ScorePresentations", "Finances3");
            DropColumn("dbo.ScorePresentations", "Finances2");
            DropColumn("dbo.ScorePresentations", "Finances1");
            DropColumn("dbo.ScorePresentations", "Finances0");
            DropColumn("dbo.ScorePresentations", "NoveltyNotes");
            DropColumn("dbo.ScorePresentations", "Novelty3");
            DropColumn("dbo.ScorePresentations", "Novelty2");
            DropColumn("dbo.ScorePresentations", "Novelty1");
            DropColumn("dbo.ScorePresentations", "Novelty0");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummaryNotes");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary3");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary2");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary1");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary0");
        }
    }
}
