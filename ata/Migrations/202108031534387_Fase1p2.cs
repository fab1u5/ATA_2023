namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fase1p2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "Content9", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "Content9");
        }
    }
}
