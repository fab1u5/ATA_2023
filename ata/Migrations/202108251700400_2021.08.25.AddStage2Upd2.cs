namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20210825AddStage2Upd2 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ScorePresentations", "St2Investitors0");
            DropColumn("dbo.ScorePresentations", "St2Investitors1");
            DropColumn("dbo.ScorePresentations", "St2Investitors2");
            DropColumn("dbo.ScorePresentations", "St2Investitors3");
            DropColumn("dbo.ScorePresentations", "St2InvestitorsNotes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "St2InvestitorsNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "St2Investitors3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2Investitors0", c => c.Double(nullable: false));
        }
    }
}
