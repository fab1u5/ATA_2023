namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA_2023_addFinKPIs : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "St2FinKPIs0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinKPIs1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinKPIs2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinKPIs3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinKPIs4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinKPIsNotes", c => c.String());
            DropColumn("dbo.ScorePresentations", "St2Content0");
            DropColumn("dbo.ScorePresentations", "St2Content1");
            DropColumn("dbo.ScorePresentations", "St2Content2");
            DropColumn("dbo.ScorePresentations", "St2Content3");
            DropColumn("dbo.ScorePresentations", "St2Content4");
            DropColumn("dbo.ScorePresentations", "St2ContentNotes");
            DropColumn("dbo.ScorePresentations", "St2Investitors0");
            DropColumn("dbo.ScorePresentations", "St2Investitors1");
            DropColumn("dbo.ScorePresentations", "St2Investitors2");
            DropColumn("dbo.ScorePresentations", "St2InvestitorsNotes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "St2InvestitorsNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "St2Investitors2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2ContentNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "St2Content4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content0", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "St2FinKPIsNotes");
            DropColumn("dbo.ScorePresentations", "St2FinKPIs4");
            DropColumn("dbo.ScorePresentations", "St2FinKPIs3");
            DropColumn("dbo.ScorePresentations", "St2FinKPIs2");
            DropColumn("dbo.ScorePresentations", "St2FinKPIs1");
            DropColumn("dbo.ScorePresentations", "St2FinKPIs0");
        }
    }
}
