namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SixteenthMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "Organization5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization7", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Organization8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "VisualAids7", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Questions5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Questions6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Questions7", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "Delivery9");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Delivery9", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "Questions7");
            DropColumn("dbo.ScorePresentations", "Questions6");
            DropColumn("dbo.ScorePresentations", "Questions5");
            DropColumn("dbo.ScorePresentations", "VisualAids7");
            DropColumn("dbo.ScorePresentations", "VisualAids6");
            DropColumn("dbo.ScorePresentations", "VisualAids5");
            DropColumn("dbo.ScorePresentations", "Organization8");
            DropColumn("dbo.ScorePresentations", "Organization7");
            DropColumn("dbo.ScorePresentations", "Organization6");
            DropColumn("dbo.ScorePresentations", "Organization5");
        }
    }
}
