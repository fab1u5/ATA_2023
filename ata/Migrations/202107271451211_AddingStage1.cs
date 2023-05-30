namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingStage1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "Stage1", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "Stage1");
        }
    }
}
