using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ATA.services
{
    public class Design1E
    {
        public int id { get; set; }
        public int scoreid { get; set; }
        public int suspension { get; set; }
        public int framebodyaero { get; set; }
        public int tractivedriverecoverysystem { get; set; }
        public int cockpitcontrolsbrakessafety { get; set; }
        public int systemmanagementintegration { get; set; }
        public int manufacturabilityserviceability { get; set; }
        public int aestheticsstyle { get; set; }
        public int creativity { get; set; }
        public int carweight { get; set; }
        public int carid { get; set; }
        public int eventid { get; set; }
        public string suspensionnotes { get; set; }
        public string framebodyaeronotes { get; set; }
        public string tractivedriverecoverysystemnotes { get; set; }
        public string cockpitcontrolsbrakessafetynotes { get; set; }
        public string systemmanagementintegrationnotes { get; set; }
        public string manufacturabilityserviceabilitynotes { get; set; }
        public string aestheticsstylenotes { get; set; }
        public string creativitynotes { get; set; }
        public int miscellaneous { get; set; }
        public string miscellaneousnotes { get; set; }

    }

    public class Design1C3
    {
        public int id { get; set; }
        public int scoreid { get; set; }
        public int suspension { get; set; }
        public int framebodyaero { get; set; }
        public int powertrain { get; set; }
        public int cockpitcontrolsbrakessafety { get; set; }
        public int systemmanagementintegration { get; set; }
        public int manufacturabilityserviceability { get; set; }
        public int aestheticsstyle { get; set; }
        public int creativity { get; set; }
        public int carweight { get; set; }
        public int carid { get; set; }
        public int eventid { get; set; }
        public string suspensionnotes { get; set; }
        public string framebodyaeronotes { get; set; }
        public string powertrainnotes { get; set; }
        public string cockpitcontrolsbrakessafetynotes { get; set; }
        public string systemmanagementintegrationnotes { get; set; }
        public string manufacturabilityserviceabilitynotes { get; set; }
        public string aestheticsstylenotes { get; set; }
        public string creativitynotes { get; set; }
        public int miscellaneous { get; set; }
        public string miscellaneousnotes { get; set; }
    }

	//Event 2019 - Presentation Event has been changed
	public class Presentation
    {
        public int id { get; set; }
        public int scoreid { get; set; }

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
		//public double executivesummary0 { get; set; }
		//public double executivesummary1 { get; set; }
		//public double executivesummary2 { get; set; }
		//public double executivesummary3 { get; set; }
		//public string executivesummarynotes { get; set; }
		#region Novelty
		public double novelty0 { get; set; }
		public double novelty1 { get; set; }
		public double novelty2 { get; set; }
		#endregion

		#region Content
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
		//public double novelty3 { get; set; }
		public string noveltynotes { get; set; }
		public double content0 { get; set; }
        public double content1 { get; set; }
        public double content2 { get; set; }
        public double content3 { get; set; }
        public double content4 { get; set; }
        public double content5 { get; set; }
        public double content6 { get; set; }
        public double content7 { get; set; }
        public double content8 { get; set; }

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
		//public double content9 { get; set; }
		public string contentnotes { get; set; }
		#endregion

		#region Finance
		public double finances0 { get; set; }
		public double finances1 { get; set; }
		public double finances2 { get; set; }

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
		//public double finances3 { get; set; }
		//public double finances4 { get; set; }
		//public double finances5 { get; set; }
		//public double finances6 { get; set; }
		public string financesnotes { get; set; }
		#endregion

		#region Deep Dive Topic
		public double deepdivetopic0 { get; set; }
		public double deepdivetopic1 { get; set; }
		public double deepdivetopic2 { get; set; }
		//public double deepdivetopic3 { get; set; }

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
		//public double deepdivetopic4 { get; set; }

		public string deepdivetopicnotes { get; set; }
		#endregion

		#region DemonstrationAndDelivery
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - BEGIN
		public double demonstrationanddelivery0		{ get; set; }
		public double demonstrationanddelivery1		{ get; set; }
		public double demonstrationanddelivery2		{ get; set; }
		public double demonstrationanddelivery3		{ get; set; }
		public double demonstrationanddelivery4		{ get; set; }
		//public double demonstrationanddelivery5		{ get; set; }
		public string demonstrationanddeliverynotes { get; set; }
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - END
		#endregion

		#region Demonstration And Structure
		public double demonstrationandstructure0 { get; set; }
		public double demonstrationandstructure1 { get; set; }
		public double demonstrationandstructure2 { get; set; }
		public double demonstrationandstructure3 { get; set; }
		public double demonstrationandstructure4 { get; set; }
		public string demonstrationandstructurenotes { get; set; }
		#endregion

		#region Structure (ex Delivery)
		public double delivery0 { get; set; }
        public double delivery1 { get; set; }
        public double delivery2 { get; set; }
        public double delivery3 { get; set; }
        public double delivery4 { get; set; }
        public double delivery5 { get; set; }
        public double delivery6 { get; set; }
        public double delivery7 { get; set; }
        public double delivery8 { get; set; }
        public string deliverynotes { get; set; }
		#endregion

		#region Questions
		public double questions0 { get; set; }
        public double questions1 { get; set; }
        public double questions2 { get; set; }
        public double questions3 { get; set; }
		public double questions4 { get; set; }
		public double questions5 { get; set; }
		public double questions6 { get; set; }
		public double questions7 { get; set; }
		public double questions8 { get; set; }
		public double questions9 { get; set; }
		public string questionsnotes { get; set; }
		#endregion

		#region General Impressions
		public double generalimpression0 { get; set; }
		public double generalimpression1 { get; set; }
		public double generalimpression2 { get; set; }
		public string generalimpressionnotes { get; set; }
		public string presentationnotes { get; set; }
		#endregion

		#region Miscellanous
		public int miscellaneous { get; set; }
		public string miscellaneousnotes { get; set; }
		#endregion
		
		public int carid { get; set; }
        public int eventid { get; set; }

		//FD 2021.07.27 - ATA 2021  - Add Stage1
		public double stage1 { get; set; }

		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
		public double finals { get; set; }

        #region Stage2
        //FDT - ATA 2023 - eliminato Business Figures - INIZIO
        //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
        //#region Business Figures
        //public double St2BusinnesFigures0 { get; set; }
        //public double St2BusinnesFigures1 { get; set; }
        //public double St2BusinnesFigures2 { get; set; }
        //public double St2BusinnesFigures3 { get; set; }
        ////FDT - ATA 2022 - modify Stage 2
        ////public double St2BusinnesFigures4 { get; set; }
        //public string St2BusinnesFiguresNotes { get; set; }
        //#endregion
        //FDT - ATA 2023 - eliminato Business Figures - FINE

        //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
        #region Financial Concept
        public double St2FinConcept0 { get; set; }
        public double St2FinConcept1 { get; set; }
        public double St2FinConcept2 { get; set; }
        public double St2FinConcept3 { get; set; }
        public double St2FinConcept4 { get; set; }
        public double St2FinConcept5 { get; set; }
        public double St2FinConcept6 { get; set; }
        public double St2FinConcept7 { get; set; }
        public double St2FinConcept8 { get; set; }
        public double St2FinConcept9 { get; set; }
        public string St2FinConceptNotes { get; set; }
        #endregion
        //FDT - ATA 2023 - aggiunto Financial Concept - FINE

        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
        //      #region Content
        //      public double St2Content0 { get; set; }
        //public double St2Content1 { get; set; }
        //public double St2Content2 { get; set; }
        //public double St2Content3 { get; set; }
        //public double St2Content4 { get; set; }
        //public string St2ContentNotes { get; set; }
        //      #endregion
        //FDT - ATA 2023 - eliminato Content e Investors - FINE

        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
        #region Financial KPIs & insights
        public double St2FinKPIs0 { get; set; }
        public double St2FinKPIs1 { get; set; }
        public double St2FinKPIs2 { get; set; }
        public double St2FinKPIs3 { get; set; }
        public double St2FinKPIs4 { get; set; }
        public string St2FinKPIsNotes { get; set; }
        #endregion
        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE

        #region DemonstrationAndDelivery
        public double St2DemonstrationAndDelivery0 { get; set; }
		public double St2DemonstrationAndDelivery1 { get; set; }
		public double St2DemonstrationAndDelivery2 { get; set; }
		public double St2DemonstrationAndDelivery3 { get; set; }
		public double St2DemonstrationAndDelivery4 { get; set; }
		public string St2DemonstrationAndDeliveryNotes { get; set; }
        #endregion

        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
        //      #region Investitors
        //      public double St2Investitors0 { get; set; }
		//public double St2Investitors1 { get; set; }
		//public double St2Investitors2 { get; set; }
        //      //FDT - ATA 2022 - modify Stage 2
        //      //public double St2Investitors3 { get; set; }
        //      public string St2InvestitorsNotes { get; set; }
        //      #endregion
        //FDT - ATA 2023 - eliminato Content e Investors - FINE

        #endregion
    }

    public class Scorecost
    {
        public int id { get; set; }
        public double LowestCost { get; set; }
        public double Accuracy { get; set; }
        public double EventDay { get; set; }
        public double Presentation { get; set; }
        public double Penalties { get; set; }
        public int carid { get; set; }
        public int eventid { get; set; }
        public string Notes { get; set; }
    }

    public class Acceleration
    {
        public int id { get; set; }
        public int scoreid { get; set; }
        public double run1time { get; set; }
        public int run1numofcones { get; set; }
        public double run1timeadj { get; set; }
        public double run2time { get; set; }
        public int run2numofcones { get; set; }
        public double run2timeadj { get; set; }
        public double run3time { get; set; }
        public int run3numofcones { get; set; }
        public double run3timeadj { get; set; }
        public double run4time { get; set; }
        public int run4numofcones { get; set; }
        public double run4timeadj { get; set; }
        public int carid { get; set; }
        public int eventid { get; set; }
    }

    public class Skidpad
    {
        public int id { get; set; }
        public int scoreid { get; set; }
        public double run1time { get; set; }
        public int run1numofcones { get; set; }
        public double run1timeadj { get; set; }
        public double run2time { get; set; }
        public int run2numofcones { get; set; }
        public double run2timeadj { get; set; }
        public double run3time { get; set; }
        public int run3numofcones { get; set; }
        public double run3timeadj { get; set; }
        public double run4time { get; set; }
        public int run4numofcones { get; set; }
        public double run4timeadj { get; set; }
        public int carid { get; set; }
        public int eventid { get; set; }
    }

    public class Autocross
    {
        public int id { get; set; }
        public int scoreid { get; set; }
        public double run1time { get; set; }
        public int run1numofcones { get; set; }
        public int run1doc { get; set; }
        public double run1timeadj { get; set; }
        public double run2time { get; set; }
        public int run2numofcones { get; set; }
        public int run2doc { get; set; }
        public double run2timeadj { get; set; }
        public double run3time { get; set; }
        public int run3numofcones { get; set; }
        public int run3doc { get; set; }
        public double run3timeadj { get; set; }
        public double run4time { get; set; }
        public int run4numofcones { get; set; }
        public int run4doc { get; set; }
        public double run4timeadj { get; set; }
        public int carid { get; set; }
        public int eventid { get; set; }
    }

    public class Endurance
    {
        public int id { get; set; }
        public int scoreid { get; set; }
        public double time { get; set; }
        public int laps { get; set; }
        public double penalities { get; set; }
        public int cones { get; set; }
        public int doc { get; set; }
        public double fuelused { get; set; }
        public int fueltype { get; set; }
        public int carid { get; set; }
        public int eventid { get; set; }
    }

    public class JsonObjects
    {
        public List<Design1E> design1E { get; set; }
        public List<Design1C3> design1C3 { get; set; }
        public List<Presentation> presentation { get; set; }
        public List<Scorecost> scorecost { get; set; }
        public List<Acceleration> acceleration { get; set; }
        public List<Skidpad> skidpad { get; set; }
        public List<Autocross> autocross { get; set; }
        public List<Endurance> endurance { get; set; }
        //Event 2017 - Save also uploading examboard
        public int uploadingExamboard { get; set; }
    }

    public class PenaltiesJsonObject
    {
        public int CarID { get; set; }
        public int PenalityID { get; set; }
        public int CarNo { get; set; }
        public string TeamName { get; set; }
        public int Documents { get; set; }
        public int LackOfSEF { get; set; }
        public int DriverMeetingAttendance { get; set; }
        public int DriverPenalties { get; set; }
        public int PostEnduranceScrutineering { get; set; }
        public int TotalPenalties { get; set; }
        //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
        public bool IsAnElectricCar { get; set; }
        public string PenaltiesNotes { get; set; }
    }

    #region UploadCommon
    public class CarInfo
    {
        public int carno { get; set; }
        public string teamname { get; set; }
        public string university { get; set; }
        public bool hasBeenFound { get; set; }

        public CarInfo()
        {
            this.hasBeenFound = true;
        }
    }
    #endregion

    #region UploadTiming

    public class AccelerationTiming : CarInfo
    {
        public double run1time { get; set; }
        public double run2time { get; set; }
        public double run3time { get; set; }
        public double run4time { get; set; }
    }

    public class SkidpadTiming : AccelerationTiming
    {
    }

    public class AutocrossTiming : AccelerationTiming
    {
    }

    public class EnduranceTiming : CarInfo
    {
        public double time { get; set; }
        public int laps{ get; set; }
    }

    public class TimingJsonObject
    {
        public List<AccelerationTiming> acceleration { get; set; }
        public List<SkidpadTiming> skidpad { get; set; }
        public List<AutocrossTiming> autocross { get; set; }
        public List<EnduranceTiming> endurance { get; set; }    
    }
    #endregion

    #region UploadFuel
    public class FuelConsumption : CarInfo
    {
    }

    public class EnduranceFuelConsumption : FuelConsumption
    {
        public double fuelConsumption { get; set; }
        public string fuelType { get; set; }
    }

    public class FuelConsumptionJsonObject
    {
        public List<EnduranceFuelConsumption> endurance { get; set; }
    }

    #endregion

    //Event 2017 - new upload added
    #region UploadCost
    public class Cost : CarInfo
    {
        public double lowestcost { get; set; }
    }

    public class CostJsonObject
    {
        public List<Cost> costs { get; set; }
    }

    #endregion

    //Event 2018 - new upload added
    #region UploadDynamicPenalties
    public class SkidPadPenalties : CarInfo
    {
        public int run1numofcones { get; set; }
        public int run2numofcones { get; set; }
        public int run3numofcones { get; set; }
        public int run4numofcones { get; set; }
    }

    public class AutocrossPenalties : CarInfo
    {
        public int run1numofcones { get; set; }
        public int run1doc { get; set; }
        public int run2numofcones { get; set; }
        public int run2doc { get; set; }
        public int run3numofcones { get; set; }
        public int run3doc { get; set; }
        public int run4numofcones { get; set; }
        public int run4doc { get; set; }
    }

    public class EndurancePenalties : CarInfo
    {
        public int numofcones { get; set; }
        public int doc { get; set; }
    }
    public class DynamicPenaltiesJsonObject
    {
        public List<SkidPadPenalties> skidpad { get; set; }
        public List<AutocrossPenalties> autocross { get; set; }
        public List<EndurancePenalties> endurance { get; set; }
    }
}
#endregion
