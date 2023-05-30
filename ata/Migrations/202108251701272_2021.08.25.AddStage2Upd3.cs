namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20210825AddStage2Upd3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "St2Investitors0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2InvestitorsNotes", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScorePresentations", "St2InvestitorsNotes");
            DropColumn("dbo.ScorePresentations", "St2Investitors3");
            DropColumn("dbo.ScorePresentations", "St2Investitors2");
            DropColumn("dbo.ScorePresentations", "St2Investitors1");
            DropColumn("dbo.ScorePresentations", "St2Investitors0");
        }
    }
}
