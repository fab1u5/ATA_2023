namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA2024_structure : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "Structure5");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Structure5", c => c.Double(nullable: false));
        }
    }
}
