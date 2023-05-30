namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TwentiethMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Scores", "UploadingExamboard", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Scores", "UploadingExamboard");
        }
    }
}
