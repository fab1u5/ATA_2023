namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fase1p1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary0");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary1");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary2");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummary3");
            DropColumn("dbo.ScorePresentations", "ExecutiveSummaryNotes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "ExecutiveSummaryNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "ExecutiveSummary0", c => c.Double(nullable: false));
        }
    }
}
