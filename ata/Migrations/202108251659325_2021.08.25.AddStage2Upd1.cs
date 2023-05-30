namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20210825AddStage2Upd1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "St2Investitors3", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "St2Investitors4");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "St2Investitors4", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "St2Investitors3");
        }
    }
}
