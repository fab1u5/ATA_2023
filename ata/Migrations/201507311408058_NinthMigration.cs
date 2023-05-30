namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NinthMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScoreAutoCrosses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Run1Doc = c.Int(nullable: false),
                        Run2Doc = c.Int(nullable: false),
                        Run3Doc = c.Int(nullable: false),
                        Run4Doc = c.Int(nullable: false),
                        Run1Time = c.Double(nullable: false),
                        Run1NumOfCones = c.Int(nullable: false),
                        Run1TimeAdj = c.Double(nullable: false),
                        Run2Time = c.Double(nullable: false),
                        Run2NumOfCones = c.Int(nullable: false),
                        Run2TimeAdj = c.Double(nullable: false),
                        Run3Time = c.Double(nullable: false),
                        Run3NumOfCones = c.Int(nullable: false),
                        Run3TimeAdj = c.Double(nullable: false),
                        Run4Time = c.Double(nullable: false),
                        Run4NumOfCones = c.Int(nullable: false),
                        Run4TimeAdj = c.Double(nullable: false),
                        BestTime = c.Double(nullable: false),
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
            CreateTable(
                "dbo.ScoreSkidPads",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Run1Time = c.Double(nullable: false),
                        Run1NumOfCones = c.Int(nullable: false),
                        Run1TimeAdj = c.Double(nullable: false),
                        Run2Time = c.Double(nullable: false),
                        Run2NumOfCones = c.Int(nullable: false),
                        Run2TimeAdj = c.Double(nullable: false),
                        Run3Time = c.Double(nullable: false),
                        Run3NumOfCones = c.Int(nullable: false),
                        Run3TimeAdj = c.Double(nullable: false),
                        Run4Time = c.Double(nullable: false),
                        Run4NumOfCones = c.Int(nullable: false),
                        Run4TimeAdj = c.Double(nullable: false),
                        BestTime = c.Double(nullable: false),
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScoreSkidPads", "Score_Id", "dbo.Scores");
            DropForeignKey("dbo.ScoreAutoCrosses", "Score_Id", "dbo.Scores");
            DropIndex("dbo.ScoreSkidPads", new[] { "Score_Id" });
            DropIndex("dbo.ScoreAutoCrosses", new[] { "Score_Id" });
            DropTable("dbo.ScoreSkidPads");
            DropTable("dbo.ScoreAutoCrosses");
        }
    }
}
