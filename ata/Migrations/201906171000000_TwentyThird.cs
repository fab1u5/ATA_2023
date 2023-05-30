namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class TwentyThird : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Scores", new string[2] { "Car_Id", "Event_id" }, true, "UK_Car_Event");
        }

        public override void Down()
        {
            DropIndex("dbo.Scores", new string[2] { "Car_Id", "Event_id" });
        }
    }
}
