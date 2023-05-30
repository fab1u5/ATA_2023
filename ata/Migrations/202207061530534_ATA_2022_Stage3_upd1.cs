namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA_2022_Stage3_upd1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "Questions8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Questions9", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "Questions9");
            DropColumn("dbo.ScorePresentations", "Questions8");
        }
    }
}
