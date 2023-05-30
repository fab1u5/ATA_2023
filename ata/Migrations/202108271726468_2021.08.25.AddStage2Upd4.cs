namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20210825AddStage2Upd4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery4", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "St2DemonstrationAndDelivery4");
        }
    }
}
