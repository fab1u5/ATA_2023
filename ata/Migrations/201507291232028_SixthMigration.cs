namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sixthMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScoreCosts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CostBeforeAddendum = c.Double(nullable: false),
                        AddendumAdjustment = c.Double(nullable: false),
                        Cost = c.Double(nullable: false),
                        CostPoint = c.Double(nullable: false),
                        VisualInspection = c.Double(nullable: false),
                        VisualInspectionPoint = c.Double(nullable: false),
                        EventDay = c.Double(nullable: false),
                        EventDayPoint = c.Double(nullable: false),
                        Penalities = c.Double(nullable: false),
                        DelayPenalities = c.Double(nullable: false),
                        ScoreNotWiegjted = c.Double(nullable: false),
                        ScoreValue = c.Double(nullable: false),
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScoreCosts", "Score_Id", "dbo.Scores");
            DropIndex("dbo.ScoreCosts", new[] { "Score_Id" });
            DropTable("dbo.ScoreCosts");
        }
    }
}
