namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fase1p6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDeliveryNotes", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDeliveryNotes");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery5");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery4");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery3");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery2");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery1");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery0");
        }
    }
}
