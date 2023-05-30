namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20210915 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scores", "FinalsScore", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Scores", "FinalsScore");
        }
    }
}
