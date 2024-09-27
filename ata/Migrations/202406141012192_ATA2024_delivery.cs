namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA2024_delivery : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "Delivery8");
            DropColumn("dbo.ScorePresentations", "Delivery9");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Delivery9", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Delivery8", c => c.Double(nullable: false));
        }
    }
}
