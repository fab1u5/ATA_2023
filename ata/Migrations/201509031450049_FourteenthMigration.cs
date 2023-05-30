namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FourteenthMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Penalties",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Documents = c.Int(nullable: false),
                        LackOfSEF = c.Int(nullable: false),
                        DriverMeetingAttendance = c.Int(nullable: false),
                        DriverPenalties = c.Int(nullable: false),
                        PostEnduranceScrutineering = c.Int(nullable: false),
                        TotalPenalties = c.Int(nullable: false),
                        car_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cars", t => t.car_Id)
                .Index(t => t.car_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Penalties", "car_Id", "dbo.Cars");
            DropIndex("dbo.Penalties", new[] { "car_Id" });
            DropTable("dbo.Penalties");
        }
    }
}
