namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20210825AddStage2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFiguresNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "St2Content0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Content4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2ContentNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2DemonstrationAndDeliveryNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "St2Investitors0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2InvestitorsNotes", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "St2InvestitorsNotes");
            DropColumn("dbo.ScorePresentations", "St2Investitors4");
            DropColumn("dbo.ScorePresentations", "St2Investitors2");
            DropColumn("dbo.ScorePresentations", "St2Investitors1");
            DropColumn("dbo.ScorePresentations", "St2Investitors0");
            DropColumn("dbo.ScorePresentations", "St2DemonstrationAndDeliveryNotes");
            DropColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery3");
            DropColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery2");
            DropColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery1");
            DropColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery0");
            DropColumn("dbo.ScorePresentations", "St2ContentNotes");
            DropColumn("dbo.ScorePresentations", "St2Content4");
            DropColumn("dbo.ScorePresentations", "St2Content3");
            DropColumn("dbo.ScorePresentations", "St2Content2");
            DropColumn("dbo.ScorePresentations", "St2Content1");
            DropColumn("dbo.ScorePresentations", "St2Content0");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFiguresNotes");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures4");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures3");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures2");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures1");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures0");
        }
    }
}
