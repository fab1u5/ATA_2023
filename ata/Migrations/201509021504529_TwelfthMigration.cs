namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TwelfthMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScoreCosts", "Notes", c => c.String());

        }
        
        public override void Down()
        {
            DropColumn("dbo.ScoreCosts", "Notes");
          
        }
    }
}
