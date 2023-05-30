namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cars",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Carno = c.Int(nullable: false),
                        Regno = c.Int(nullable: false),
                        DeliveryDocDate = c.DateTime(nullable: false),
                        BoxNo = c.Int(nullable: false),
                        Class_Id = c.Int(),
                        Fuel_Id = c.Int(),
                        Team_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Classes", t => t.Class_Id)
                .ForeignKey("dbo.Fuels", t => t.Fuel_Id)
                .ForeignKey("dbo.Teams", t => t.Team_Id)
                .Index(t => t.Class_Id)
                .Index(t => t.Fuel_Id)
                .Index(t => t.Team_Id);
            
            CreateTable(
                "dbo.Classes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Fuels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Teams",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        University = c.String(),
                        Country = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EventNames",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        EventType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.EventTypes", t => t.EventType_Id)
                .Index(t => t.EventType_Id);
            
            CreateTable(
                "dbo.EventTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        IsScoreNumeric = c.Boolean(nullable: false),
                        MaximumScore = c.Double(nullable: false),
                        EventName_Id = c.Int(),
                        EventType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.EventNames", t => t.EventName_Id)
                .ForeignKey("dbo.EventTypes", t => t.EventType_Id)
                .Index(t => t.EventName_Id)
                .Index(t => t.EventType_Id);
            
            CreateTable(
                "dbo.ExamBoards",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Color = c.String(),
                        IsColorUsed = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Examiners",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        Surname = c.String(),
                        Phone = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Scores",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GivenScore = c.Double(nullable: false),
                        PenalityScore = c.Double(nullable: false),
                        PenalityNotes = c.String(),
                        CorrectedScore = c.Double(nullable: false),
                        Car_Id = c.Int(),
                        Event_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cars", t => t.Car_Id)
                .ForeignKey("dbo.Events", t => t.Event_Id)
                .Index(t => t.Car_Id)
                .Index(t => t.Event_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Token = c.String(),
                        ExpiryDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Scores", "Event_Id", "dbo.Events");
            DropForeignKey("dbo.Scores", "Car_Id", "dbo.Cars");
            DropForeignKey("dbo.Events", "EventType_Id", "dbo.EventTypes");
            DropForeignKey("dbo.Events", "EventName_Id", "dbo.EventNames");
            DropForeignKey("dbo.EventNames", "EventType_Id", "dbo.EventTypes");
            DropForeignKey("dbo.Cars", "Team_Id", "dbo.Teams");
            DropForeignKey("dbo.Cars", "Fuel_Id", "dbo.Fuels");
            DropForeignKey("dbo.Cars", "Class_Id", "dbo.Classes");
            DropIndex("dbo.Scores", new[] { "Event_Id" });
            DropIndex("dbo.Scores", new[] { "Car_Id" });
            DropIndex("dbo.Events", new[] { "EventType_Id" });
            DropIndex("dbo.Events", new[] { "EventName_Id" });
            DropIndex("dbo.EventNames", new[] { "EventType_Id" });
            DropIndex("dbo.Cars", new[] { "Team_Id" });
            DropIndex("dbo.Cars", new[] { "Fuel_Id" });
            DropIndex("dbo.Cars", new[] { "Class_Id" });
            DropTable("dbo.Users");
            DropTable("dbo.Scores");
            DropTable("dbo.Examiners");
            DropTable("dbo.ExamBoards");
            DropTable("dbo.Events");
            DropTable("dbo.EventTypes");
            DropTable("dbo.EventNames");
            DropTable("dbo.Teams");
            DropTable("dbo.Fuels");
            DropTable("dbo.Classes");
            DropTable("dbo.Cars");
        }
    }
}
