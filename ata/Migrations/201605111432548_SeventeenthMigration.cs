namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SeventeenthMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Penalties", "PenaltiesNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "Miscellaneous", c => c.Double(nullable: false));
            AddColumn("dbo.ScoreDesign1C3", "MiscellaneousNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "Miscellaneous", c => c.Double(nullable: false));
            AddColumn("dbo.ScoreDesign1E", "MiscellaneousNotes", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScoreDesign1E", "MiscellaneousNotes");
            DropColumn("dbo.ScoreDesign1E", "Miscellaneous");
            DropColumn("dbo.ScoreDesign1C3", "MiscellaneousNotes");
            DropColumn("dbo.ScoreDesign1C3", "Miscellaneous");
            DropColumn("dbo.Penalties", "PenaltiesNotes");
        }
    }
}
