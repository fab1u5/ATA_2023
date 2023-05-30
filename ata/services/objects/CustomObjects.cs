using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class CustomScoresClassesEvents
    {
        public int ClassId;
        public string ClassName;
        public int EventId;
        public string Description;
        public int EventNameId;
        public string EventName;
        public int EventTypeId;
        public string EventTypeName;
        public double GivenScore;

        public CustomScoresClassesEvents() { }
    }

    public class CustomScores {

        public int EventId;
        public string Description;
        public bool IsScoreNumeric;
        public double MaximumScore;
        public int EventNameId;
        public string EventName;
        public int EventTypeId;
        public string EventTypeName;
        public int CarId;
        public int CarNo;
        public int RegNo;
        public DateTime DeliveryDocDate;
        public int BoxNo;
        public int ClassId;
        public string ClassName;
        public int FuelId;
        public string FuelName;
        public int TeamId;
        public string TeamName;
        public string University;
        public string Country;
        public double GivenScore;
        public double PenalityScore;
        public string PenalityNotes;
        public double CorrectedScore;
        public string PageToJump;
        public int ScoreId;
        public string ExamBoardName;
        //Event 2017 - Save also uploading examboard
        public int UploadingExamboard;

        //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
        public bool IsAnElectricCar;

        public CustomScores() { }
    }

    public class CustomScoreEventDetail {
        public string ClassName ;
        public string EventName ;
        public string Description ;
        public string EventTypeName ;

        public CustomScoreEventDetail() { }
    }

	//Event 2018 - Show partials scores for Presentation and Design
	//Event 2019 - Presentation Event has been changed
	#region PartialScores
	public class CustomScoresPresentationPartial
    {
        public int ScoreId;

        //FD 2021.07.27 - ATA 2021  - Add Stage1
        public double Stage1;

		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
		public double Finals;

		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
		public double Stage2;

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
		//public double ExecutiveSummary;
		public double Novelty;
		public double Content;
		public double Finances;
		public double DeepDiveTopic;
		public double DemonstrationAndStructure;
        public double Delivery;
        public double Questions;
		public double GeneralImpression;
		public double Miscellaneous;

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
		public double DemonstrationAndDelivery;
		public CustomScoresPresentationPartial() { }
    }

    public class CustomScoresDesignPartial
    {
        public int ScoreId;
        public double Suspension;
        public double FrameBodyAero;
        public double CockpitControlsBrakesSafety;
        public double SystemManagementIntegration;
        public double ManufacturabilityServiceability;
        public double AestheticsStyle;
        public double Creativity;
        public double Miscellaneous;
        public CustomScoresDesignPartial() { }
    }
    public class CustomScoresDesign1EPartial : CustomScoresDesignPartial
    {
        public double TractiveDriveRecoverySystem;
        public CustomScoresDesign1EPartial() { }
    }
    public class CustomScoresDesign1C3Partial : CustomScoresDesignPartial
    {
        public double Powertrain;
        public CustomScoresDesign1C3Partial() { }
    }
    #endregion
}