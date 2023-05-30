namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FifteenthMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScoreCost_2015",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LowerstCost = c.Double(nullable: false),
                        Accuracy = c.Double(nullable: false),
                        EventDay = c.Double(nullable: false),
                        Presentation = c.Double(nullable: false),
                        Penalties = c.Double(nullable: false),
                        TotalAchivedPoints = c.Double(nullable: false),
                        NormalizedScore = c.Double(nullable: false),
                        Notes = c.String(),
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScoreCost_2015", "Score_Id", "dbo.Scores");
            DropIndex("dbo.ScoreCost_2015", new[] { "Score_Id" });
            DropTable("dbo.ScoreCost_2015");
        }
    }
}
