namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SeventhMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScoreAccelerations",
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
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScoreAccelerations", "Score_Id", "dbo.Scores");
            DropIndex("dbo.ScoreAccelerations", new[] { "Score_Id" });
            DropTable("dbo.ScoreAccelerations");
        }
    }
}
