namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TenthMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScoreEndurances",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Time = c.Double(nullable: false),
                        Laps = c.Int(nullable: false),
                        Penalities = c.Int(nullable: false),
                        Cone = c.Int(nullable: false),
                        Doc = c.Int(nullable: false),
                        AdjTimeDNF = c.Double(nullable: false),
                        AdjTime = c.Double(nullable: false),
                        AvgLapTime = c.Double(nullable: false),
                        AvgLapTimeEfficiency = c.Double(nullable: false),
                        EnduranceScore = c.Double(nullable: false),
                        FuelUsed = c.Double(nullable: false),
                        FuelType = c.Int(nullable: false),
                        Co2Used = c.Double(nullable: false),
                        Co2Lap = c.Double(nullable: false),
                        TminAvg = c.Double(nullable: false),
                        DriverChangeStart = c.Boolean(nullable: false),
                        EfficencyFactor = c.Double(nullable: false),
                        EfficienctyScore = c.Double(nullable: false),
                        TotalScore = c.Double(nullable: false),
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScoreEndurances", "Score_Id", "dbo.Scores");
            DropIndex("dbo.ScoreEndurances", new[] { "Score_Id" });
            DropTable("dbo.ScoreEndurances");
        }
    }
}
