namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EighteenthMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "PresentationNotes", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "PresentationNotes");
        }
    }
}
