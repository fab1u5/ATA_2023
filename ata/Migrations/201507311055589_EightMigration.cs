namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EightMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScoreAccelerations", "BestTime", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScoreAccelerations", "BestTime");
        }
    }
}
