namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fase1p4 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "Finances3");
            DropColumn("dbo.ScorePresentations", "Finances4");
            DropColumn("dbo.ScorePresentations", "Finances5");
            DropColumn("dbo.ScorePresentations", "Finances6");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Finances6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "Finances3", c => c.Double(nullable: false));
        }
    }
}
