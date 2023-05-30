namespace ATA.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ThirteenthMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScoreDesign1C3", "PowertrainNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "SuspensionNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "FrameBodyAeroNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "CockpitControlsBrakesSafetyNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "SystemManagementIntegrationNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "ManufacturabilityServiceabilityNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "AestheticsStyleNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1C3", "CreativityNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "TractiveDriveRecoverySystemNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "SuspensionNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "FrameBodyAeroNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "CockpitControlsBrakesSafetyNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "SystemManagementIntegrationNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "ManufacturabilityServiceabilityNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "AestheticsStyleNotes", c => c.String());
            AddColumn("dbo.ScoreDesign1E", "CreativityNotes", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScoreDesign1E", "CreativityNotes");
            DropColumn("dbo.ScoreDesign1E", "AestheticsStyleNotes");
            DropColumn("dbo.ScoreDesign1E", "ManufacturabilityServiceabilityNotes");
            DropColumn("dbo.ScoreDesign1E", "SystemManagementIntegrationNotes");
            DropColumn("dbo.ScoreDesign1E", "CockpitControlsBrakesSafetyNotes");
            DropColumn("dbo.ScoreDesign1E", "FrameBodyAeroNotes");
            DropColumn("dbo.ScoreDesign1E", "SuspensionNotes");
            DropColumn("dbo.ScoreDesign1E", "TractiveDriveRecoverySystemNotes");
            DropColumn("dbo.ScoreDesign1C3", "CreativityNotes");
            DropColumn("dbo.ScoreDesign1C3", "AestheticsStyleNotes");
            DropColumn("dbo.ScoreDesign1C3", "ManufacturabilityServiceabilityNotes");
            DropColumn("dbo.ScoreDesign1C3", "SystemManagementIntegrationNotes");
            DropColumn("dbo.ScoreDesign1C3", "CockpitControlsBrakesSafetyNotes");
            DropColumn("dbo.ScoreDesign1C3", "FrameBodyAeroNotes");
            DropColumn("dbo.ScoreDesign1C3", "SuspensionNotes");
            DropColumn("dbo.ScoreDesign1C3", "PowertrainNotes");
        }
    }
}
