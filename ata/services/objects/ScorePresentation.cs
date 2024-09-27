using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
   
    public class ScorePresentation
    {
        public int Id { get; set; }

        //FD 2021.07.27 - ATA 2021 
        #region Stage1
        public double Stage1 { get; set; }
        #endregion

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
        ////FDT - ATA 2022 - modify Stage 2
        ////public double St2Investitors3 { get; set; }
        //public string St2InvestitorsNotes { get; set; }
        //      #endregion
        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO



        #endregion

        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN
        #region Stage3
        //Event 2019 - Presentation Event has been changed
        //#region ExecutiveSummary
        //public double ExecutiveSummary0 { get; set; }
        //public double ExecutiveSummary1 { get; set; }
        //public double ExecutiveSummary2 { get; set; }
        //public double ExecutiveSummary3 { get; set; }
        //public string ExecutiveSummaryNotes { get; set; }
        //#endregion

        //FDT - ATA 2023 - Modifica Stage 3 - INIZIO
		//#region Novelty
		//public double Novelty0 { get; set; }
		//public double Novelty1 { get; set; }
		//public double Novelty2 { get; set; }
		////FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
		////public double Novelty3 { get; set; }
		//public string NoveltyNotes { get; set; }
		//#endregion

		#region Content
		public double Content0 { get; set; }
		public double Content1 { get; set; }
		public double Content2 { get; set; }
		public double Content3 { get; set; }
		public double Content4 { get; set; }
		public double Content5 { get; set; }
		public double Content6 { get; set; }
        //FDT - ATA2024
        //public double Content7 { get; set; }
		public string ContentNotes { get; set; }

		#endregion

		#region Finances
		public double Finances0 { get; set; }
		public double Finances1 { get; set; }
		public double Finances2 { get; set; }
        public double Finances3 { get; set; }
		//FDT - ATA 2024
        public double Finances4 { get; set; }
        public double Finances5 { get; set; }
        public double Finances6 { get; set; }
        public double Finances7 { get; set; }
        public double Finances8 { get; set; }
        public double Finances9 { get; set; }
        public double Finances10 { get; set; }
        public double Finances11 { get; set; }
        public string FinancesNotes { get; set; }
		#endregion

		#region DeepDiveTopic
		public double DeepDiveTopic0 { get; set; }
		public double DeepDiveTopic1 { get; set; }
		public double DeepDiveTopic2 { get; set; }
		public double DeepDiveTopic3 { get; set; }

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
		//public double DeepDiveTopic4 { get; set; }
		public string DeepDiveTopicNotes { get; set; }
        #endregion

        //FDT - ATA 2023 - modificato in Demonstration
        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - BEGIN
        #region Demonstration
        public double Demonstration0 { get; set; }
		public double Demonstration1 { get; set; }
		public double Demonstration2 { get; set; }
		public double Demonstration3 { get; set; }
        //FDT - ATA2024
        public double Demonstration4 { get; set; }
        public double Demonstration5 { get; set; }
        public string DemonstrationNotes { get; set; }
        #endregion
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - END
        
		#region Delivery
		public double Delivery0 { get; set; }
		public double Delivery1 { get; set; }
		public double Delivery2 { get; set; }
		public double Delivery3 { get; set; }
		public double Delivery4 { get; set; }
		public double Delivery5 { get; set; }
		public double Delivery6 { get; set; }
		public double Delivery7 { get; set; }
        //FDT - ATA2024 
        //public double Delivery8 { get; set; }
        //public double Delivery9 { get; set; }
        public string DeliveryNotes { get; set; }
		#endregion

		//FDT - ATA 2023 - modificato in Structure        
        #region Structure
        public double Structure0 { get; set; }
		public double Structure1 { get; set; }
		public double Structure2 { get; set; }
		public double Structure3 { get; set; }
		public double Structure4 { get; set; }
        //FDT - ATA2024
        //public double Structure5 { get; set; }
        public string StructureNotes { get; set; }
		#endregion

		#region Questions
		public double Questions0 { get; set; }
		public double Questions1 { get; set; }
		public double Questions2 { get; set; }
		public double Questions3 { get; set; }
		public double Questions4 { get; set; }
		public double Questions5 { get; set; }
		public double Questions6 { get; set; }
		public double Questions7 { get; set; }
		//public double Questions8 { get; set; }
		//public double Questions9 { get; set; }
		public string QuestionsNotes { get; set; }
		#endregion

		#region GeneralImpression
		public double GeneralImpression0 { get; set; }
		public double GeneralImpression1 { get; set; }
		public double GeneralImpression2 { get; set; }
		public string GeneralImpressionNotes { get; set; }
		#endregion

		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
		#region Finals
		public double Finals { get; set; }
		#endregion

        public string PresentationNotes { get; set; }
		public double Miscellaneous { get; set; }
		public string MiscellaneousNotes { get; set; }
		#endregion
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - END

		public virtual Score Score { get; set; }

        public ScorePresentation() {}

        //FDT - ATA 2023 - Modifica Stage 3 - INIZIO
        public void SetData(/*double[] novelty,						string noveltyNotes,*/
							double[] content,						string contentNotes,
							double[] finances,						string financesNotes,
							double[] deepDiveTopic,					string deepDiveTopicNotes,
							double[] structure,						string structureNotes,
							double[] delivery,						string deliveryNotes,
							double[] questions,						string questionsNotes,
							double[] generalImpression,				string generalImpressionNotes,
							double   miscellaneous,					string miscellaneousNotes,
							string   presentationNotes,				double stage1,
							double[] demonstration,					string demonstrationNotes,

							//FDT - ATA 2023 - eliminato Business Figures - INIZIO
							//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
							//double[] st2businessfigure,				string st2businessfigureNotes,
							//FDT - ATA 2023 - eliminato Business Figures - INIZIO
							//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
							double[] st2finconcept,					string st2finconceptNotes,
                            //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                            //double[] st2content,					string st2contentNotes,
                            //FDT - ATA 2023 - eliminato Content e Investors - FINE
                            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
							double[] st2finkpis,						string st2finkpisNotes,
                            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
                            double[] st2demonstrationanddelivery,	string st2demonstrationanddeliveryNotes,
                            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                            //double[] st2investitors,				string st2investitorsNotes,
                            //FDT - ATA 2023 - eliminato Content e Investors - FINE
                            //FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                            double finals)
		{
            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary - BEGIN
            //this.ExecutiveSummary0				= executiveSummary[0];
            //this.ExecutiveSummary1				= executiveSummary[1];
            //this.ExecutiveSummary2				= executiveSummary[2];
            //this.ExecutiveSummary3				= executiveSummary[3];
            //this.ExecutiveSummaryNotes			= executiveSummaryNotes;
            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary - END

            //FDT - ATA 2023 - eliminato Business Figures - INIZIO
            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
            //#region St2BusinnesFigures
            //this.St2BusinnesFigures0				= st2businessfigure[0];
            //this.St2BusinnesFigures1				= st2businessfigure[1];
            //this.St2BusinnesFigures2				= st2businessfigure[2];
            //this.St2BusinnesFigures3				= st2businessfigure[3];
            ////FDT - ATA 2022 - modify Stage 2
            ////this.St2BusinnesFigures4				= st2businessfigure[4];
            //this.St2BusinnesFiguresNotes			= st2businessfigureNotes;
            //#endregion
            //FDT - ATA 2023 - eliminato Business Figures - FINE

            #region Financial Concept
            //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO            
            this.St2FinConcept0						= st2finconcept[0];
            this.St2FinConcept1						= st2finconcept[1];
            this.St2FinConcept2						= st2finconcept[2];
            this.St2FinConcept3						= st2finconcept[3];
            this.St2FinConcept4						= st2finconcept[4];
            this.St2FinConcept5						= st2finconcept[5];
            this.St2FinConcept6						= st2finconcept[6];
            this.St2FinConcept7						= st2finconcept[7];
            this.St2FinConcept8						= st2finconcept[8];
            this.St2FinConcept9						= st2finconcept[9];
			this.St2FinConceptNotes					 = st2finconceptNotes;
			//FDT - ATA 2023 - aggiunto Financial Concept - FINE
			#endregion

			//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
			//         #region st2Content
			//         this.St2Content0						= st2content[0];
			//this.St2Content1						= st2content[1];
			//this.St2Content2						= st2content[2];
			//this.St2Content3						= st2content[3];
			//this.St2Content4						= st2content[4];
			//this.St2ContentNotes					= st2contentNotes;
			//         #endregion
			//FDT - ATA 2023 - eliminato Content e Investors - FINE

			//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
			this.St2FinKPIs0 = st2finkpis[0];
            this.St2FinKPIs1 = st2finkpis[1];
            this.St2FinKPIs2 = st2finkpis[2];
            this.St2FinKPIs3 = st2finkpis[3];
            this.St2FinKPIs4 = st2finkpis[4];
            this.St2FinKPIsNotes = st2finkpisNotes;
            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE

            #region st2demonstrationanddelivery
            this.St2DemonstrationAndDelivery0		= st2demonstrationanddelivery[0];
			this.St2DemonstrationAndDelivery1		= st2demonstrationanddelivery[1];
			this.St2DemonstrationAndDelivery2		= st2demonstrationanddelivery[2];
			this.St2DemonstrationAndDelivery3		= st2demonstrationanddelivery[3];
			this.St2DemonstrationAndDelivery4		= st2demonstrationanddelivery[4];
			this.St2DemonstrationAndDeliveryNotes = st2demonstrationanddeliveryNotes;
            #endregion

            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //         #region st2investitors
            //         this.St2Investitors0					= st2investitors[0];
            //this.St2Investitors1					= st2investitors[1];
            //this.St2Investitors2					= st2investitors[2];
            ////FDT - ATA 2022 - modify Stage 2
            ////this.St2Investitors3					= st2investitors[3];
            //this.St2InvestitorsNotes				= st2investitorsNotes;
            //         #endregion
            //FDT - ATA 2023 - eliminato Content e Investors - FINE
            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

            //FDT - ATA 2023 - Modifica Stage 3 - INIZIO
			//this.Novelty0							= novelty[0];
			//this.Novelty1							= novelty[1];
			//this.Novelty2							= novelty[2];
			////FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
			////this.Novelty3 = novelty[3];
			//this.NoveltyNotes						= noveltyNotes;

			this.Content0							= content[0];
			this.Content1							= content[1];
			this.Content2							= content[2];
			this.Content3							= content[3];
			this.Content4							= content[4];
			this.Content5							= content[5];
			this.Content6							= content[6];
            //FDT - ATA2024
            //this.Content7							= content[7];
			//this.Content8							= content[8];

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
			//this.Content9							= content[9];
			this.ContentNotes						= contentNotes;

			this.Finances0							= finances[0];
			this.Finances1							= finances[1];
			this.Finances2							= finances[2];
			this.Finances3							= finances[3];
			//FDT - ATA 2024
			this.Finances4							= finances[4];
			this.Finances5							= finances[5];
			this.Finances6							= finances[6];
            this.Finances7							= finances[7];
            this.Finances8							= finances[8];
            this.Finances9							= finances[9];
            this.Finances10							= finances[10];
            this.Finances11							= finances[11];
            this.FinancesNotes						= financesNotes;

			this.DeepDiveTopic0						= deepDiveTopic[0];
			this.DeepDiveTopic1						= deepDiveTopic[1];
			this.DeepDiveTopic2						= deepDiveTopic[2];
			this.DeepDiveTopic3						= deepDiveTopic[3];
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
			//this.DeepDiveTopic4						= deepDiveTopic[4];
			this.DeepDiveTopicNotes					= deepDiveTopicNotes;

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - BEGIN
			this.Demonstration0			= demonstration[0];
			this.Demonstration1			= demonstration[1];
			this.Demonstration2			= demonstration[2];
			this.Demonstration3			= demonstration[3];
            //FDT - ATA2024
            this.Demonstration4			= demonstration[4];
            this.Demonstration5			= demonstration[5];
            this.DemonstrationNotes		= demonstrationNotes;
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - END

			this.Structure0			= structure[0];
			this.Structure1			= structure[1];
			this.Structure2			= structure[2];
			this.Structure3			= structure[3];
			this.Structure4			= structure[4];
            //FDT - ATA2024
            //this.Structure5			= structure[5];	
			this.StructureNotes		= structureNotes;

			this.Delivery0							= delivery[0];
			this.Delivery1							= delivery[1];
			this.Delivery2							= delivery[2];
			this.Delivery3							= delivery[3];
			this.Delivery4							= delivery[4];
			this.Delivery5							= delivery[5];
			this.Delivery6							= delivery[6];
			this.Delivery7							= delivery[7];
            //FDT - ATA2024
            //this.Delivery8							= delivery[8];
            //this.Delivery9							= delivery[9];
            this.DeliveryNotes						= deliveryNotes;

			this.Questions0							= questions[0];
			this.Questions1							= questions[1];
			this.Questions2							= questions[2];
			this.Questions3							= questions[3];
			this.Questions4							= questions[4];
			this.Questions5							= questions[5];
			this.Questions6							= questions[6];
			this.Questions7							= questions[7];
			//this.Questions8							= questions[8];
			//this.Questions9							= questions[9];
			this.QuestionsNotes						= questionsNotes;

			this.GeneralImpression0					= generalImpression[0];
			this.GeneralImpression1					= generalImpression[1];
			this.GeneralImpression2					= generalImpression[2];
			this.GeneralImpressionNotes				= generalImpressionNotes;

			this.Miscellaneous						= miscellaneous;
			this.MiscellaneousNotes					= miscellaneousNotes;

			this.PresentationNotes					= presentationNotes;

            //FD 2021.07.27 - ATA 2021 
			this.Stage1								= stage1;

			//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
			this.Finals								= finals;
		}
		public double RecalculateTotalScore()
		{
			double givenscore = 0;

            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolto executive summary
            //givenscore += this.ExecutiveSummary0 + this.ExecutiveSummary1 + this.ExecutiveSummary2 + this.ExecutiveSummary3;

            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
            //givenscore += this.Novelty0 + this.Novelty1 + this.Novelty2 + this.Novelty3;
            //FDT - ATA 2023 - Modifica Stage 3 - INIZIO
            //givenscore += this.Novelty0 + this.Novelty1 + this.Novelty2;

            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
            //givenscore += this.Content0 + this.Content1 + this.Content2 + this.Content3 + this.Content4 + this.Content5 + this.Content6 + this.Content7 + this.Content8;
            //FDT - ATA2024
            givenscore += this.Content0 + this.Content1 + this.Content2 + this.Content3 + this.Content4 + this.Content5 + this.Content6 ;

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
			//givenscore += this.Finances0 + this.Finances1 + this.Finances2 + this.Finances3 + this.Finances4 + this.Finances5 + this.Finances6;
			//FDT - ATA 2024
			givenscore += this.Finances0 + this.Finances1 + this.Finances2 + this.Finances3 + this.Finances4 + this.Finances5 
				+ this.Finances6 + this.Finances7 + this.Finances8 + this.Finances9+ this.Finances10 + this.Finances11;

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
			//givenscore += this.DeepDiveTopic0 + this.DeepDiveTopic1 + this.DeepDiveTopic2 + this.DeepDiveTopic3;
			//givenscore += this.DeepDiveTopic0 + this.DeepDiveTopic1 + this.DeepDiveTopic2 + this.DeepDiveTopic3 + this.DeepDiveTopic4;
			givenscore += this.DeepDiveTopic0 + this.DeepDiveTopic1 + this.DeepDiveTopic2 + this.DeepDiveTopic3;

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - BEGIN
			//givenscore += this.DemonstrationAndDelivery0 + this.DemonstrationAndDelivery1 + this.DemonstrationAndDelivery2 + this.DemonstrationAndDelivery3 + this.DemonstrationAndDelivery4 + +this.DemonstrationAndDelivery5;
			//FDT - ATA2024
			givenscore += this.Demonstration0 + this.Demonstration1 + this.Demonstration2 + this.Demonstration3 + this.Demonstration4 + this.Demonstration5;
            //FDT - ATA2024
            givenscore += this.Delivery0 + this.Delivery1 + this.Delivery2 + this.Delivery3 + this.Delivery4 + this.Delivery5 +
				this.Delivery6 + this.Delivery7;//+ this.Delivery8 + this.Delivery9;

			givenscore += this.Questions0 + this.Questions1 + this.Questions2 + this.Questions3 + this.Questions4 + this.Questions5 + 
				this.Questions6 + this.Questions7;// + this.Questions8 + this.Questions9;
            //FDT - ATA2024
            givenscore += this.Structure0 + this.Structure1 + this.Structure2 + this.Structure3 + this.Structure4;

			givenscore += this.GeneralImpression0			+ this.GeneralImpression1 + this.GeneralImpression2;

			givenscore += this.Miscellaneous;

            //FDT - ATA 2023 - eliminato Business Figures - INIZIO
            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
            //givenscore += this.St2BusinnesFigures0			+ this.St2BusinnesFigures1				+ this.St2BusinnesFigures2			+ this.St2BusinnesFigures3;
            //FDT - ATA 2022 - modify Stage 2            
            //+ this.St2BusinnesFigures4;
            //FDT - ATA 2023 - eliminato Business Figures - FINE
            //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
            givenscore += this.St2FinConcept0 + this.St2FinConcept1 + this.St2FinConcept2 + this.St2FinConcept3 +this.St2FinConcept4
				+ this.St2FinConcept5 + this.St2FinConcept6 + this.St2FinConcept7 + this.St2FinConcept8 + this.St2FinConcept9;
			//FDT - ATA 2023 - aggiunto Financial Concept - FINE
			//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
			//givenscore += this.St2Content0					+ this.St2Content1						+ this.St2Content2					+ this.St2Content3					+ this.St2Content4;
			//FDT - ATA 2023 - eliminato Content e Investors - FINE
			//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
			givenscore += this.St2FinKPIs0 + this.St2FinKPIs1 + this.St2FinKPIs2 + this.St2FinKPIs3 + this.St2FinKPIs4;
            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
            givenscore += this.St2DemonstrationAndDelivery0 + this.St2DemonstrationAndDelivery1		+ this.St2DemonstrationAndDelivery2 + this.St2DemonstrationAndDelivery3 + this.St2DemonstrationAndDelivery4;
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //givenscore += this.St2Investitors0				+ this.St2Investitors1					+ this.St2Investitors2;
            //FDT - ATA 2023 - eliminato Content e Investors - FINE
            //FDT - ATA 2022 - modify Stage 2
            //+ this.St2Investitors3;
            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END)

            //FD 2021.07.27 - ATA 2021 - VA SOMMATO AGLI ALTRI
            givenscore += this.Stage1;

			//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
			//ATTENZIONE DA SPECIFICA <FINALS> NON VA AGGIUNTO NEL TOTALE PER LA NORMALIZZAZIONE

			return givenscore;
		}

		public double RecalculateFinalsScore()
		{
			double finalsScore = this.Finals;

			return finalsScore;
		}
	}
}