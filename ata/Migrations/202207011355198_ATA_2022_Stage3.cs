namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA_2022_Stage3 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "Content9");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic3");
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic4");
            DropColumn("dbo.ScorePresentations", "DemonstrationAndDelivery5");
            DropColumn("dbo.ScorePresentations", "Questions8");
            DropColumn("dbo.ScorePresentations", "Questions9");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Questions9", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Questions8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DemonstrationAndDelivery5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Content9", c => c.Double(nullable: false));
        }
    }
}
