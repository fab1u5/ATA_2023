namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20220516Stage2_upd2 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "St2Investitors3");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "St2Investitors3", c => c.Double(nullable: false));
        }
    }
}
