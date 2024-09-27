namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA2024_finances : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "Finances4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances7", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances9", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances10", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances11", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "Finances11");
            DropColumn("dbo.ScorePresentations", "Finances10");
            DropColumn("dbo.ScorePresentations", "Finances9");
            DropColumn("dbo.ScorePresentations", "Finances8");
            DropColumn("dbo.ScorePresentations", "Finances7");
            DropColumn("dbo.ScorePresentations", "Finances6");
            DropColumn("dbo.ScorePresentations", "Finances5");
            DropColumn("dbo.ScorePresentations", "Finances4");
        }
    }
}
