namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ATA_2023_addFinConcept : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScorePresentations", "St2FinConcept0", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept4", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept5", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept6", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept7", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept8", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConcept9", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2FinConceptNotes", c => c.String());
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures0");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures1");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures2");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFigures3");
            DropColumn("dbo.ScorePresentations", "St2BusinnesFiguresNotes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ScorePresentations", "St2BusinnesFiguresNotes", c => c.String());
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures3", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures2", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures1", c => c.Double(nullable: false));
            AddColumn("dbo.ScorePresentations", "St2BusinnesFigures0", c => c.Double(nullable: false));
            DropColumn("dbo.ScorePresentations", "St2FinConceptNotes");
            DropColumn("dbo.ScorePresentations", "St2FinConcept9");
            DropColumn("dbo.ScorePresentations", "St2FinConcept8");
            DropColumn("dbo.ScorePresentations", "St2FinConcept7");
            DropColumn("dbo.ScorePresentations", "St2FinConcept6");
            DropColumn("dbo.ScorePresentations", "St2FinConcept5");
            DropColumn("dbo.ScorePresentations", "St2FinConcept4");
            DropColumn("dbo.ScorePresentations", "St2FinConcept3");
            DropColumn("dbo.ScorePresentations", "St2FinConcept2");
            DropColumn("dbo.ScorePresentations", "St2FinConcept1");
            DropColumn("dbo.ScorePresentations", "St2FinConcept0");
        }
    }
}
