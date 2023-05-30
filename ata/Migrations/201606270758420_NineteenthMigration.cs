namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NineteenthMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ExamBoards", "Event_Id", c => c.Int());
            CreateIndex("dbo.ExamBoards", "Event_Id");
            AddForeignKey("dbo.ExamBoards", "Event_Id", "dbo.Events", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ExamBoards", "Event_Id", "dbo.Events");
            DropIndex("dbo.ExamBoards", new[] { "Event_Id" });
            DropColumn("dbo.ExamBoards", "Event_Id");
        }
    }
}
