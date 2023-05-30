namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fase1p5 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "DeepDiveTopic4", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "DeepDiveTopic4");
        }
    }
}
