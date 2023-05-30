namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20220513Stage2_upd1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures4");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures4", c => c.Double(nullable: false));
        }
    }
}
