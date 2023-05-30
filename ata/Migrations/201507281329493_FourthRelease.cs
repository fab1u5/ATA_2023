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
                        Content01 = c.Boolean(nullable: false),
                        Content02 = c.Boolean(nullable: false),
                        Content03 = c.Boolean(nullable: false),
                        Content04 = c.Boolean(nullable: false),
                        Content05 = c.Boolean(nullable: false),
                        Content06 = c.Boolean(nullable: false),
                        Content07 = c.Boolean(nullable: false),
                        Content08 = c.Boolean(nullable: false),
                        Content09 = c.Boolean(nullable: false),
                        Content10 = c.Boolean(nullable: false),
                        ContentV01 = c.Int(nullable: false),
                        ContentV02 = c.Int(nullable: false),
                        ContentV03 = c.Int(nullable: false),
                        ContentV04 = c.Int(nullable: false),
                        ContentV05 = c.Int(nullable: false),
                        ContentV06 = c.Int(nullable: false),
                        ContentV07 = c.Int(nullable: false),
                        ContentV08 = c.Int(nullable: false),
                        ContentV09 = c.Int(nullable: false),
                        ContentV10 = c.Int(nullable: false),
                        Organization01 = c.Boolean(nullable: false),
                        Organization02 = c.Boolean(nullable: false),
                        Organization03 = c.Boolean(nullable: false),
                        Organization04 = c.Boolean(nullable: false),
                        Organization05 = c.Boolean(nullable: false),
                        OrganizationV01 = c.Double(nullable: false),
                        OrganizationV02 = c.Double(nullable: false),
                        OrganizationV03 = c.Double(nullable: false),
                        OrganizationV04 = c.Double(nullable: false),
                        OrganizationV05 = c.Double(nullable: false),
                        VisualAids01 = c.Boolean(nullable: false),
                        VisualAids02 = c.Boolean(nullable: false),
                        VisualAids03 = c.Boolean(nullable: false),
                        VisualAids04 = c.Boolean(nullable: false),
                        VisualAids05 = c.Boolean(nullable: false),
                        VisualAidsV01 = c.Int(nullable: false),
                        VisualAidsV02 = c.Int(nullable: false),
                        VisualAidsV03 = c.Int(nullable: false),
                        VisualAidsV04 = c.Int(nullable: false),
                        VisualAidsV05 = c.Int(nullable: false),
                        Delivery01 = c.Boolean(nullable: false),
                        Delivery02 = c.Boolean(nullable: false),
                        Delivery03 = c.Boolean(nullable: false),
                        Delivery04 = c.Boolean(nullable: false),
                        Delivery05 = c.Boolean(nullable: false),
                        Delivery06 = c.Boolean(nullable: false),
                        Delivery07 = c.Boolean(nullable: false),
                        Delivery08 = c.Boolean(nullable: false),
                        Delivery09 = c.Boolean(nullable: false),
                        Delivery10 = c.Boolean(nullable: false),
                        DeliveryV01 = c.Int(nullable: false),
                        DeliveryV02 = c.Int(nullable: false),
                        DeliveryV03 = c.Int(nullable: false),
                        DeliveryV04 = c.Int(nullable: false),
                        DeliveryV05 = c.Int(nullable: false),
                        DeliveryV06 = c.Int(nullable: false),
                        DeliveryV07 = c.Int(nullable: false),
                        DeliveryV08 = c.Int(nullable: false),
                        DeliveryV09 = c.Int(nullable: false),
                        DeliveryV10 = c.Int(nullable: false),
                        Questions01 = c.Boolean(nullable: false),
                        Questions02 = c.Boolean(nullable: false),
                        Questions03 = c.Boolean(nullable: false),
                        Questions04 = c.Boolean(nullable: false),
                        Questions05 = c.Boolean(nullable: false),
                        QuestionsV01 = c.Int(nullable: false),
                        QuestionsV02 = c.Int(nullable: false),
                        QuestionsV03 = c.Int(nullable: false),
                        QuestionsV04 = c.Int(nullable: false),
                        QuestionsV05 = c.Int(nullable: false),
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
