namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SecondRelease : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ExamBoardCars",
                c => new
                    {
                        ExamBoard_Id = c.Int(nullable: false),
                        Car_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ExamBoard_Id, t.Car_Id })
                .ForeignKey("dbo.ExamBoards", t => t.ExamBoard_Id, cascadeDelete: true)
                .ForeignKey("dbo.Cars", t => t.Car_Id, cascadeDelete: true)
                .Index(t => t.ExamBoard_Id)
                .Index(t => t.Car_Id);
            
            CreateTable(
                "dbo.ExaminerExamBoards",
                c => new
                    {
                        Examiner_Id = c.Int(nullable: false),
                        ExamBoard_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Examiner_Id, t.ExamBoard_Id })
                .ForeignKey("dbo.Examiners", t => t.Examiner_Id, cascadeDelete: true)
                .ForeignKey("dbo.ExamBoards", t => t.ExamBoard_Id, cascadeDelete: true)
                .Index(t => t.Examiner_Id)
                .Index(t => t.ExamBoard_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ExaminerExamBoards", "ExamBoard_Id", "dbo.ExamBoards");
            DropForeignKey("dbo.ExaminerExamBoards", "Examiner_Id", "dbo.Examiners");
            DropForeignKey("dbo.ExamBoardCars", "Car_Id", "dbo.Cars");
            DropForeignKey("dbo.ExamBoardCars", "ExamBoard_Id", "dbo.ExamBoards");
            DropIndex("dbo.ExaminerExamBoards", new[] { "ExamBoard_Id" });
            DropIndex("dbo.ExaminerExamBoards", new[] { "Examiner_Id" });
            DropIndex("dbo.ExamBoardCars", new[] { "Car_Id" });
            DropIndex("dbo.ExamBoardCars", new[] { "ExamBoard_Id" });
            DropTable("dbo.ExaminerExamBoards");
            DropTable("dbo.ExamBoardCars");
        }
    }
}
