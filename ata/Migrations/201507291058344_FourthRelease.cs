namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FourthRelease : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScorePresentations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content0 = c.Double(nullable: false),
                        Content1 = c.Double(nullable: false),
                        Content2 = c.Double(nullable: false),
                        Content3 = c.Double(nullable: false),
                        Content4 = c.Double(nullable: false),
                        Content5 = c.Double(nullable: false),
                        Content6 = c.Double(nullable: false),
                        Content7 = c.Double(nullable: false),
                        Content8 = c.Double(nullable: false),
                        Content9 = c.Double(nullable: false),
                        ContentNotes = c.String(),
                        Organization0 = c.Double(nullable: false),
                        Organization1 = c.Double(nullable: false),
                        Organization2 = c.Double(nullable: false),
                        Organization3 = c.Double(nullable: false),
                        Organization4 = c.Double(nullable: false),
                        OrganizationNotes = c.String(),
                        VisualAids0 = c.Double(nullable: false),
                        VisualAids1 = c.Double(nullable: false),
                        VisualAids2 = c.Double(nullable: false),
                        VisualAids3 = c.Double(nullable: false),
                        VisualAids4 = c.Double(nullable: false),
                        VisualNotes = c.String(),
                        Delivery0 = c.Double(nullable: false),
                        Delivery1 = c.Double(nullable: false),
                        Delivery2 = c.Double(nullable: false),
                        Delivery3 = c.Double(nullable: false),
                        Delivery4 = c.Double(nullable: false),
                        Delivery5 = c.Double(nullable: false),
                        Delivery6 = c.Double(nullable: false),
                        Delivery7 = c.Double(nullable: false),
                        Delivery8 = c.Double(nullable: false),
                        Delivery9 = c.Double(nullable: false),
                        DeliveryNotes = c.String(),
                        Questions0 = c.Double(nullable: false),
                        Questions1 = c.Double(nullable: false),
                        Questions2 = c.Double(nullable: false),
                        Questions3 = c.Double(nullable: false),
                        Questions4 = c.Double(nullable: false),
                        QuestionsNotes = c.String(),

                        Score_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Scores", t => t.Score_Id)
                .Index(t => t.Score_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScorePresentations", "Score_Id", "dbo.Scores");
            DropIndex("dbo.ScorePresentations", new[] { "Score_Id" });
            DropTable("dbo.ScorePresentations");
        }
    }
}
