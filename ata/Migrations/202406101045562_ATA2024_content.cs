namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA2024_content : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "Content7");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "Content7", c => c.Double(nullable: false));
        }
    }
}
