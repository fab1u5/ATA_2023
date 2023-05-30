namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20210912_Fase4AddingFinals : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "Finals", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "Finals");
        }
    }
}
