namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EleventhMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Settings",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        KeyName = c.String(),
                        Value = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Settings");
        }
    }
}
