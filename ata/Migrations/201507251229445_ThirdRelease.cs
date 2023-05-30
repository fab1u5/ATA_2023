namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ThirdRelease : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScoreDesign1C3",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Powertrain = c.Double(nullable: false),
                        Suspension = c.Double(nullable: false),
                        FrameBodyAero = c.Double(nullable: false),
                        CockpitControlsBrakesSafety = c.Double(nullable: false),
                        SystemManagementIntegration = c.Double(nullable: false),
                        ManufacturabilityServiceability = c.Double(nullable: false),
                        AestheticsStyle = c.Double(nullable: false),
                        Creativity = c.Double(nullable: false),
                        CarWeight = c.Double(nullable: false),
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
            CreateTable(
                "dbo.ScoreDesign1E",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TractiveDriveRecoverySystem = c.Double(nullable: false),
                        Suspension = c.Double(nullable: false),
                        FrameBodyAero = c.Double(nullable: false),
                        CockpitControlsBrakesSafety = c.Double(nullable: false),
                        SystemManagementIntegration = c.Double(nullable: false),
                        ManufacturabilityServiceability = c.Double(nullable: false),
                        AestheticsStyle = c.Double(nullable: false),
                        Creativity = c.Double(nullable: false),
                        CarWeight = c.Double(nullable: false),
                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScoreDesign1E", "Score_Id", "dbo.Scores");
            DropForeignKey("dbo.ScoreDesign1C3", "Score_Id", "dbo.Scores");
            DropIndex("dbo.ScoreDesign1E", new[] { "Score_Id" });
            DropIndex("dbo.ScoreDesign1C3", new[] { "Score_Id" });
            DropTable("dbo.ScoreDesign1E");
            DropTable("dbo.ScoreDesign1C3");
        }
    }
}
