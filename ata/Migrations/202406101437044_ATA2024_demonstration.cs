namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA2024_demonstration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "Demonstration4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Demonstration5", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "Demonstration5");
            DropColumn("dbo.ScorePresentations", "Demonstration4");
        }
    }
}
