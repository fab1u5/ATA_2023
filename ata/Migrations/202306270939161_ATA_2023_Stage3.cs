namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA_2023_Stage3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScoreEndurances", "EnergyCorr", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Demonstration0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Demonstration1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Demonstration2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Demonstration3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "Delivery9", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Structure0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Structure1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Structure2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Structure3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Structure4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Structure5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "StructureNotes", c => c.String());
            DropColumn("dbo.ScorePresentations", "Novelty0");
            DropColumn("dbo.ScorePresentations", "Novelty1");
            DropColumn("dbo.ScorePresentations", "Novelty2");
            DropColumn("dbo.ScorePresentations", "NoveltyNotes");
            DropColumn("dbo.ScorePresentations", "Content8");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery0");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery1");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery2");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery3");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery4");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDeliveryNotes");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure0");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure1");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure2");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure3");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructure4");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndStructureNotes");
            DropColumn("dbo.ScorePresentations", "Questions8");
            DropColumn("dbo.ScorePresentations", "Questions9");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Questions9", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Questions8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructureNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndStructure0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDeliveryNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Content8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "NoveltyNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "Novelty2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Novelty1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Novelty0", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "StructureNotes");
            DropColumn("dbo.ScorePresentations", "Structure5");
            DropColumn("dbo.ScorePresentations", "Structure4");
            DropColumn("dbo.ScorePresentations", "Structure3");
            DropColumn("dbo.ScorePresentations", "Structure2");
            DropColumn("dbo.ScorePresentations", "Structure1");
            DropColumn("dbo.ScorePresentations", "Structure0");
            DropColumn("dbo.ScorePresentations", "Delivery9");
            DropColumn("dbo.ScorePresentations", "DemonstrationNotes");
            DropColumn("dbo.ScorePresentations", "Demonstration3");
            DropColumn("dbo.ScorePresentations", "Demonstration2");
            DropColumn("dbo.ScorePresentations", "Demonstration1");
            DropColumn("dbo.ScorePresentations", "Demonstration0");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic3");
            DropColumn("dbo.ScorePresentations", "Finances3");
            DropColumn("dbo.ScoreEndurances", "EnergyCorr");
        }
    }
}
