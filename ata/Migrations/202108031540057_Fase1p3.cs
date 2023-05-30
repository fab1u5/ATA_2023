namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fase1p3 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "Novelty3");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Novelty3", c => c.Double(nullable: false));
        }
    }
}
