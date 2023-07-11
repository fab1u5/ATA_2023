using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Services;

namespace ATA.services
{
    /// <summary>
    /// Summary description for ATA_ExportService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class ATA_ExportService : System.Web.Services.WebService
    {
        #region Downloads

        [WebMethod]
        public string DownloadExaminers()
        {
            ATA_Context ctx = new ATA_Context();
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Id; Name; Surname; Phone");
            foreach (Examiner e in ctx.Examiners.ToList())
            {
                sb.AppendLine(e.Id.ToString() + ";" + e.FirstName.ToString() + ";" + e.Surname.ToString() + ";" + e.Phone.ToString());
            }
            return sb.ToString();
        }

        [WebMethod]
        public string DownloadTeams()
        {
            ATA_Context ctx = new ATA_Context();
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Id; Name; University");
            foreach (Team t in ctx.Teams.ToList())
            {
                sb.AppendLine(t.Id.ToString() + ";" + t.Name.ToString() + ";" + t.University.ToString());
            }
            return sb.ToString();
        }

        [WebMethod]
        public string DownloadCars()
        {
            ATA_Context ctx = new ATA_Context();
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Id; Car.No.; Reg.No.; Class; Fuel; Team; Delivery Doc. Date; Box.No.");
            foreach (Car c in ctx.Cars.ToList())
            {
                sb.AppendLine(
                    c.Id.ToString() + ";" +
                    c.Carno.ToString() + ";" +
                    c.Regno.ToString() + ";" +
                    c.Class.Name + ";" +
                    c.Fuel.Name + ";" +
                    c.Team.Name + ";" +
                    c.DeliveryDocDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture) + ";" +
                    c.BoxNo.ToString()
                    );
            }
            return sb.ToString();
        }

        [WebMethod]
        public string DownloadRanking(int eventType, int classId)
        {
            ATA_Context ctx = new ATA_Context();
            StringBuilder sb = new StringBuilder();

            if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Overall)
            {
                sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Best Time; Cost Score; Design Score; Presentation Score; Acceleration Score; SkidPad Score; AutoCross Score; Endurance Eff. Score; Endurance Score; Penalties Score; Penalties Notes; Corrected Score; Score; Normalized Score");

                List<OverallRankingObject> myRankingList = new List<OverallRankingObject>();
                myRankingList = getRankingListOverall(classId);

                foreach (OverallRankingObject ORO in myRankingList)
                {
                    sb.AppendLine(
                        ORO.CarNum.ToString() + ";" +
                        ORO.RegNum.ToString() + ";" +
                        ORO.TeamName.ToString() + ";" +
                        ORO.University.ToString() + ";" +
                        ORO.BestTime.ToString() + ";" +
                        ORO.CorrectedScoreCost.ToString() + ";" +
                        ORO.CorrectedScoreDesign.ToString() + ";" +
                        ORO.CorrectedScorePresentation.ToString() + ";" +
                        ORO.CorrectedScoreAcceleration.ToString() + ";" +
                        ORO.CorrectedScoreSkidPad.ToString() + ";" +
                        ORO.CorrectedScoreAutocross.ToString() + ";" +
                        ORO.CorrectedScoreEnduranceEfficiency.ToString() + ";" +
                        ORO.CorrectedScoreEndurance.ToString() + ";" +
                        ORO.PenalityScore.ToString() + ";" +
                        ORO.PenalityNotes.Replace("\n"," ") + ";" +
                        ORO.CorrectedScore.ToString() + ";" +
                        ORO.ScoreValue.ToString() + ";" +
                        ORO.NormalizedScore.ToString()
                        );
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    OverallRankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        sb.AppendLine(
                            c.Carno.ToString() + ";" +
                            c.Regno.ToString() + ";" +
                            c.Team.Name + ";" +
                            c.Team.University + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0"
                            );
                    }
                }
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Presentation)
            {     
                //AF - Lug 2016 - Added Notes for Presentation

				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
				//sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Best Time; Score; Normalized Score; Novelty Notes; Content Notes; Finances Notes; Deep Dive Topic Notes; Demonstration & Delivery Notes; Structure Notes; Questions Notes; General Impression Notes; Miscellaneous Notes; Presentation Notes;");
				sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Best Time; Score; Normalized Score; Content Notes; Finances Notes; Deep Dive Topic Notes; Demonstration Notes; Delivery Notes; Structure Notes; Questions Notes; General Impression Notes; Miscellaneous Notes; Presentation Notes;");

                //sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Best Time; Score; Normalized Score; Executive Summary Notes; Novelty Notes; Content Notes; Finances Notes; Deep Dive Topic Notes; Demonstration & Structure Notes; Delivery Notes; Questions Notes; General Impression Notes; Miscellaneous Notes; Presentation Notes;");
                List<RankingObject> myRankingList = new List<RankingObject>();
                myRankingList = getRankingList(eventType, classId);

                foreach (RankingObject RO in myRankingList)
                {
                    //AF - Lug 2016 - Added Notes for Presentation
                    System.Text.StringBuilder allNotes = new System.Text.StringBuilder();
                    foreach(string n in RO.Notes)
                    {
                        allNotes.Append(n.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }).Replace("\n"," ") + ";");
                    }

					//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
					//sb.AppendLine(RO.CarNum.ToString() + ";" +RO.RegNum.ToString() + ";" +RO.TeamName.ToString() + ";" +RO.University.ToString() + ";" +RO.BestTime.ToString() + ";" +RO.ScoreValue.ToString() + ";" +RO.NormalizedScore.ToString() + ";" +allNotes.ToString());
                    sb.AppendLine(
                        RO.CarNum.ToString() + ";" +
                        RO.RegNum.ToString() + ";" +
                        RO.TeamName.ToString() + ";" +
                        RO.University.ToString() + ";" +
                        RO.BestTime.ToString() + ";" +
                        RO.ScoreValue.ToString() + ";" +
                        (RO.NormalizedScore + RO.FinalsScore).ToString() + ";" +
                        allNotes.ToString()
                        );
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    RankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        sb.AppendLine(
                            c.Carno.ToString() + ";" +
                            c.Regno.ToString() + ";" +
                            c.Team.Name + ";" +
                            c.Team.University + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0"
                            );
                    }
                }
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Cost)
            {
                sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Best Time; Score; Normalized Score");
                List<RankingObject> myRankingList = new List<RankingObject>();
                myRankingList = getRankingList(eventType, classId);

                foreach (RankingObject RO in myRankingList)
                {
                    sb.AppendLine(
                        RO.CarNum.ToString() + ";" +
                        RO.RegNum.ToString() + ";" +
                        RO.TeamName.ToString() + ";" +
                        RO.University.ToString() + ";" +
                        RO.BestTime.ToString() + ";" +
                        RO.ScoreValue.ToString() + ";" +
                        RO.NormalizedScore.ToString()
                        );
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    RankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        sb.AppendLine(
                            c.Carno.ToString() + ";" +
                            c.Regno.ToString() + ";" +
                            c.Team.Name + ";" +
                            c.Team.University + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0"
                            );
                    }
                }
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Design)
            {
                List<DesignRankingObject> myRankingList = new List<DesignRankingObject>();
                myRankingList = getDesignRankingList(eventType, classId);

                sb.AppendLine("Car.No.; Reg.No.; Team Name; University;Suspension; SuspensionNotes; FrameBodyAero; FrameBodyAeroNotes; TractiveOrPowertrain; TractiveOrPowertrainNotes; CockpitControlsBrakesSafety; CockpitControlsBrakesSafetyNotes; SystemManagementIntegration; SystemManagementIntegrationNotes; ManufacturabilityServiceability; ManufacturabilityServiceabilityNotes; AestheticsStyle; AestheticsStyleNotes; Creativity; CreativityNotes; Miscellaneous; MiscellaneousNotes; CarWeight ;  Best Time; Score; Normalized Score");

                Regex rgx = new Regex("[^a-zA-Z0-9 -]");
                string s;
                foreach (DesignRankingObject RO in myRankingList)
                {
                    s = "";
                    s = RO.FrameBodyAeroNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.FrameBodyAeroNotes = s;

                    s = "";
                    s = RO.SuspensionNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.SuspensionNotes = s;
                    s = "";

                    s = RO.TractiveOrPowerTrainNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.TractiveOrPowerTrainNotes = s;

                    s = "";
                    s = RO.CockpitControlsBrakesSafetyNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.CockpitControlsBrakesSafetyNotes = s;

                    s = "";
                    s = RO.SystemManagementIntegrationNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.SystemManagementIntegrationNotes = s;

                    s = "";
                    s = RO.ManufacturabilityServiceabilityNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.ManufacturabilityServiceabilityNotes = s;


                    s = "";
                    s = RO.AestheticsStyleNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.AestheticsStyleNotes = s;

                    s = "";
                    s = RO.CreativityNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.CreativityNotes = s;

                    s = "";
                    s = RO.MiscellaneousNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.MiscellaneousNotes = s;

                    sb.AppendLine(
                        RO.CarNum.ToString() + ";" +
                        RO.RegNum.ToString() + ";" +
                        RO.TeamName.ToString() + ";" +
                        RO.University.ToString() + ";" +
                        RO.Suspension.ToString() + ";" +
                        RO.SuspensionNotes.ToString() + ";" +
                        RO.FrameBodyAero.ToString() + ";" +
                        RO.FrameBodyAeroNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.TractiveOrPowerTrain.ToString() + ";" +
                        RO.TractiveOrPowerTrainNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.CockpitControlsBrakesSafety.ToString() + ";" +
                        RO.CockpitControlsBrakesSafetyNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.SystemManagementIntegration.ToString() + ";" +
                        RO.SystemManagementIntegrationNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.ManufacturabilityServiceability.ToString() + ";" +
                        RO.ManufacturabilityServiceabilityNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.AestheticsStyle.ToString() + ";" +
                        RO.AestheticsStyleNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.Creativity.ToString() + ";" +
                        RO.CreativityNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.Miscellaneous.ToString() + ";" +
                        RO.MiscellaneousNotes.ToString().Replace(";", " ").TrimEnd(new char[] { '\r', '\n' }) + ";" +
                        RO.CarWeight.ToString() + ";" +
                        RO.BestTime.ToString() + ";" +
                        RO.ScoreValue.ToString() + ";" +
                        RO.NormalizedScore.ToString()
                        );
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    DesignRankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        sb.AppendLine(
                            c.Carno.ToString() + ";" +
                            c.Regno.ToString() + ";" +
                            c.Team.Name + ";" +
                            c.Team.University + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0"
                            );
                    }
                }
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Acceleration ||
                     (ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.SkidPad)
            {
                List<DynamicRankingObject> myRankingList = new List<DynamicRankingObject>();
                myRankingList = getDynamicRankingList(eventType, classId);
                //sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Adj #1; Cones #1; Adj #2; Cones #2; Adj #3; Cones #3; Adj #4; Cones #4; Best Time; Score; Normalized Score");
                sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Adj #1; Cones #1; Adj #2; Cones #2; Adj #3; Cones #3; Adj #4; Cones #4; Best Time; Score");

                foreach (DynamicRankingObject RO in myRankingList)
                {
                    sb.AppendLine(
                        RO.CarNum.ToString() + ";" +
                        RO.RegNum.ToString() + ";" +
                        RO.TeamName.ToString() + ";" +
                        RO.University.ToString() + ";" +
                        RO.Run1TimeAdj.ToString() + ";" +
                        RO.Run1NumCones.ToString() + ";" +
                        RO.Run2TimeAdj.ToString() + ";" +
                        RO.Run2NumCones.ToString() + ";" +
                        RO.Run3TimeAdj.ToString() + ";" +
                        RO.Run3NumCones.ToString() + ";" +
                        RO.Run4TimeAdj.ToString() + ";" +
                        RO.Run4NumCones.ToString() + ";" +
                        RO.BestTime.ToString() + ";" +
                        RO.ScoreValue.ToString() /*+ ";" +
                        RO.NormalizedScore.ToString()*/
                        );
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    DynamicRankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        sb.AppendLine(
                            c.Carno.ToString() + ";" +
                            c.Regno.ToString() + ";" +
                            c.Team.Name + ";" +
                            c.Team.University + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" /*+ ";" +
                            "0"*/
                            );
                    }
                }
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Autocross)
            {
                List<DynamicRankingObjectAutoCross> myRankingList = new List<DynamicRankingObjectAutoCross>();
                myRankingList = getDynamicRankingAutoCrossList(eventType, classId);
                //sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Time #1; Adj #1; Cones #1; Doc #1; Time #2; Adj #2; Cones #2; Doc #2; Time #3; Adj #3; Cones #3; Doc #3; Time #4; Adj #4; Cones #4; Doc #4; Best Time; Score; Normalized Score");
                sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Time #1; Adj #1; Cones #1; Doc #1; Time #2; Adj #2; Cones #2; Doc #2; Time #3; Adj #3; Cones #3; Doc #3; Time #4; Adj #4; Cones #4; Doc #4; Best Time; Score");

                foreach (DynamicRankingObjectAutoCross RO in myRankingList)
                {
                    sb.AppendLine(
                        RO.CarNum.ToString() + ";" +
                        RO.RegNum.ToString() + ";" +
                        RO.TeamName.ToString() + ";" +
                        RO.University.ToString() + ";" +
                        RO.Run1Time.ToString() + ";" +
                        RO.Run1TimeAdj.ToString() + ";" +
                        RO.Run1NumCones.ToString() + ";" +
                        RO.Run1Doc.ToString() + ";" +
                        RO.Run2Time.ToString() + ";" +
                        RO.Run2TimeAdj.ToString() + ";" +
                        RO.Run2NumCones.ToString() + ";" +
                        RO.Run2Doc.ToString() + ";" +
                        RO.Run3Time.ToString() + ";" +
                        RO.Run3TimeAdj.ToString() + ";" +
                        RO.Run3NumCones.ToString() + ";" +
                        RO.Run3Doc.ToString() + ";" +
                        RO.Run4Time.ToString() + ";" +
                        RO.Run4TimeAdj.ToString() + ";" +
                        RO.Run4NumCones.ToString() + ";" +
                        RO.Run4Doc.ToString() + ";" +
                        RO.BestTime.ToString() + ";" +
                        RO.ScoreValue.ToString() /*+ ";" +
                        RO.NormalizedScore.ToString()*/
                        );
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    DynamicRankingObjectAutoCross rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        sb.AppendLine(
                            c.Carno.ToString() + ";" +
                            c.Regno.ToString() + ";" +
                            c.Team.Name + ";" +
                            c.Team.University + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" /*+ ";" +
                            "0"*/
                            );
                    }
                }
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Endurance)
            {
                ATA_WebService ws = new ATA_WebService();

/*              sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Laps; Best Time; " +
                    "Adj Time; Adj Time DNF; Avg Lap Time; Avg Lap Time Efficiency; Co2 Lap; Co2 Used; " +
                    "Cone; Doc; Driver Change Start; Efficiency Factor; Efficiency Score; Endurance Score; " +
                    "Fuel Type; Fuel Used; Laps; Penalties; Time; T Min Avg; Total Score; Normalized Score");
*/
//FDT - ATA 2023 - midifiche stage3
                sb.AppendLine("Car.No.; Reg.No.; Team Name; University; Laps; Best Time; " +
                    "Adj Time; Adj Time DNF; " +
                    //"Avg Lap Time; " +
                    //"Avg Lap Time Efficiency; " +
                    //"Co2 Lap; " +
                    //"Co2 Used; " +
                    "Energy corrected;" +
                    "Cone; Doc; " +
                    //"Driver Change Start; " +
                    "Efficiency Factor; Efficiency Score; Endurance Score; " +
                    "Fuel Type; Fuel Used; Laps; Penalties; Time; T Min Avg; Total Score");

                List<EnduranceRankingObject> myRankingList = new List<EnduranceRankingObject>();
                myRankingList = getRankingListEndurance(classId);

                EnduranceDetailRankingObject EDRO;
                foreach (EnduranceRankingObject ERO in myRankingList)
                {
                    string line =
                        ERO.CarNum.ToString() + ";" +
                        ERO.RegNum.ToString() + ";" +
                        ERO.TeamName.ToString() + ";" +
                        ERO.University.ToString() + ";" +
                        ERO.Laps.ToString() + ";" +
                        ERO.BestTime.ToString() + ";";

                    EDRO = ws.GetScoreDetailsEndurance((int)ERO.Id);
                    if (EDRO != null)
                    {
                        line +=
                            EDRO.AdjTime.ToString() + ";" +
                            EDRO.AdjTimeDNF.ToString() + ";" +
                            //EDRO.AvgLapTime.ToString() + ";" +
                            //EDRO.AvgLapTimeEfficiency.ToString() + ";" +
                            //EDRO.Co2Lap.ToString() + ";" +
                            //EDRO.Co2Used.ToString() + ";" +
                            EDRO.EnergyCorr.ToString() + ";" +
                            EDRO.Cone.ToString() + ";" +
                            EDRO.Doc.ToString() + ";" +
                            //EDRO.DriverChangeStart.ToString() + ";" +
                            EDRO.EfficencyFactor.ToString() + ";" +
                            EDRO.EfficienctyScore.ToString() + ";" +
                            EDRO.EnduranceScore.ToString() + ";" +
                            EDRO.FuelType + ";" +
                            EDRO.FuelUsed.ToString() + ";" +
                            EDRO.Laps.ToString() + ";" +
                            EDRO.Penalities.ToString() + ";" +
                            EDRO.Time.ToString() + ";" +
                            EDRO.TminAvg.ToString() + ";";
                    }

                    line +=
                        ERO.TotalScore.ToString(); /*+ ";" +
                        ERO.NormalizedScore.ToString();*/

                    if (line.Trim() != null && line.Trim() != string.Empty)
                        sb.AppendLine(line);
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    RankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        string line =
                            c.Carno.ToString() + ";" +
                            c.Regno.ToString() + ";" +
                            c.Team.Name + ";" +
                            c.Team.University + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            //"0" + ";" +
                            //"0" + ";" +
                            //"0" + ";" +
                            //"0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            //string.Empty + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            string.Empty + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0" + ";" +
                            "0"; /*+ ";" +
                            "0";*/
                        sb.AppendLine(line);
                    }

                }
            }
            return sb.ToString();
        }

        private List<DynamicRankingObject> getDynamicRankingList(int eventType, int classId)
        {
            ATA_WebService ws = new ATA_WebService();
            List<DynamicRankingObject> myRanking = new List<DynamicRankingObject>();

            switch (eventType)
            {
                case 4:
                    myRanking = ws.CalculateScoreAcceleration(classId);
                    break;
                case 5:
                    myRanking = ws.CalculateScoreSkidPad(classId);
                    break;
            }

            return myRanking;
        }

        private List<DynamicRankingObjectAutoCross> getDynamicRankingAutoCrossList(int eventType, int classId)
        {
            ATA_WebService ws = new ATA_WebService();
            List<DynamicRankingObjectAutoCross> myRanking = new List<DynamicRankingObjectAutoCross>();

            switch (eventType)
            {
                case 6:
                    myRanking = ws.CalculateScoreAutocross(classId);
                    break;
            }

            return myRanking;
        }

        private List<RankingObject> getRankingList(int eventType, int classId)
        {
            ATA_WebService ws = new ATA_WebService();


            List<RankingObject> myRanking = new List<RankingObject>();

            switch (eventType)
            {
                case 1:
                    myRanking = ws.CalculateScorePresentation(classId);
                    break;
                case 2:
                    myRanking = ws.CalculateScoreCost2015(classId);
                    break;
            }
            return myRanking;
        }

        private List<DesignRankingObject> getDesignRankingList(int eventType, int classId)
        {
            ATA_WebService ws = new ATA_WebService();
            List<DesignRankingObject> myRanking = new List<DesignRankingObject>();

            myRanking = ws.CalculateDesignScore(classId);

            return myRanking;
        }

        private List<EnduranceRankingObject> getRankingListEndurance(int classId)
        {
            ATA_WebService ws = new ATA_WebService();
            List<EnduranceRankingObject> myRanking = new List<EnduranceRankingObject>();

            myRanking = ws.CalculateScoreEndurance(classId);

            return myRanking;
        }

        private List<OverallRankingObject> getRankingListOverall(int classId)
        {
            ATA_WebService ws = new ATA_WebService();
            List<OverallRankingObject> myRanking = new List<OverallRankingObject>();

            myRanking = ws.GetOverallRanking(classId);

            return myRanking;
        }

        #endregion

        #region Configuration

        [WebMethod(Description = "Load the configuration for the selected Examboard")]
        public CustomConfiguration ConfigurationDownload(int examboardid)
        {
            try
            {
                CustomConfiguration config = new CustomConfiguration();
                bool result = config.Load(examboardid);
                return config;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
        }

        #endregion

        #region RankingToExcel
        [WebMethod]
        public string DownloadRankingToExcel(int eventType, int classId, int useMacro)
        {
            ATA_Context ctx = new ATA_Context();

            string activeWorkbookToString = string.Empty;

            ExcelHelper excelHelper = new ExcelHelper(eventType, classId, useMacro);

            if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Overall)
            {
                List<OverallRankingObject> myRankingList = new List<OverallRankingObject>();
                myRankingList = getRankingListOverall(classId);

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    OverallRankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        OverallRankingObject RO = new OverallRankingObject();

                        RO.CarNum = c.Carno;
                        RO.RegNum = c.Regno;
                        RO.TeamName = c.Team.Name;
                        RO.University = c.Team.University;
                        RO.BestTime = 0;
                        RO.CorrectedScoreCost = 0;
                        RO.CorrectedScoreDesign = 0;
                        RO.CorrectedScorePresentation = 0;
                        RO.CorrectedScoreAcceleration = 0;
                        RO.CorrectedScoreSkidPad = 0;
                        RO.CorrectedScoreAutocross = 0;
                        RO.CorrectedScoreEnduranceEfficiency = 0;
                        RO.CorrectedScoreEndurance = 0;
                        RO.PenalityScore = 0;
                        RO.PenalityNotes = string.Empty;
                        RO.CorrectedScore = 0;
                        RO.ScoreValue = 0;
                        RO.NormalizedScore = 0;
						RO.FinalsScore = 0;

                        myRankingList.Add(RO);
                    }
                }
                activeWorkbookToString = excelHelper.GetRanking(myRankingList);
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Presentation ||
                     (ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Cost)
            {
                List<RankingObject> myRankingList = new List<RankingObject>();
                myRankingList = getRankingList(eventType, classId);

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    RankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        RankingObject RO = new RankingObject();
                        RO.CarNum = c.Carno;
                        RO.RegNum = c.Regno;
                        RO.TeamName = c.Team.Name;
                        RO.University = c.Team.University;
                        RO.BestTime = 0;
                        RO.ScoreValue = 0;
                        RO.NormalizedScore = 0;

						//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
						if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Presentation)
							RO.FinalsScore = 0;

                        myRankingList.Add(RO);

                    }
                }
                activeWorkbookToString = excelHelper.GetRanking(myRankingList);
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Design)
            {
                List<DesignRankingObject> myRankingList = new List<DesignRankingObject>();
                myRankingList = getDesignRankingList(eventType, classId);

                Regex rgx = new Regex("[^a-zA-Z0-9 -]");
                string s;
                foreach (DesignRankingObject RO in myRankingList)
                {
                    s = "";
                    s = RO.FrameBodyAeroNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.FrameBodyAeroNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });

                    s = "";
                    s = RO.SuspensionNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.SuspensionNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });
                    s = "";

                    s = RO.TractiveOrPowerTrainNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.TractiveOrPowerTrainNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });

                    s = "";
                    s = RO.CockpitControlsBrakesSafetyNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.CockpitControlsBrakesSafetyNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });

                    s = "";
                    s = RO.SystemManagementIntegrationNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.SystemManagementIntegrationNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });

                    s = "";
                    s = RO.ManufacturabilityServiceabilityNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.ManufacturabilityServiceabilityNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });


                    s = "";
                    s = RO.AestheticsStyleNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.AestheticsStyleNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });

                    s = "";
                    s = RO.CreativityNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.CreativityNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });

                    s = "";
                    s = RO.MiscellaneousNotes.ToString();
                    s = rgx.Replace(s, "").Replace("\n"," ");
                    RO.MiscellaneousNotes = s.Replace(";", " ").TrimEnd(new char[] { '\r', '\n' });
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    DesignRankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        DesignRankingObject RO = new DesignRankingObject();
                        RO.CarNum = c.Carno;
                        RO.RegNum = c.Regno;
                        RO.TeamName = c.Team.Name;
                        RO.University = c.Team.University;
                        RO.Suspension = 0;
                        RO.SuspensionNotes = string.Empty;
                        RO.FrameBodyAero = 0;
                        RO.FrameBodyAeroNotes = string.Empty;
                        RO.TractiveOrPowerTrain = 0;
                        RO.TractiveOrPowerTrainNotes = string.Empty;
                        RO.CockpitControlsBrakesSafety = 0;
                        RO.CockpitControlsBrakesSafetyNotes = string.Empty;
                        RO.SystemManagementIntegration = 0;
                        RO.SystemManagementIntegrationNotes = string.Empty;
                        RO.ManufacturabilityServiceability = 0;
                        RO.ManufacturabilityServiceabilityNotes = string.Empty;
                        RO.AestheticsStyle = 0;
                        RO.AestheticsStyleNotes = string.Empty;
                        RO.Creativity = 0;
                        RO.CreativityNotes = string.Empty;
                        RO.Miscellaneous = 0;
                        RO.MiscellaneousNotes = string.Empty;
                        RO.CarWeight = 0;
                        RO.BestTime = 0;
                        RO.ScoreValue = 0;
                        RO.NormalizedScore = 0;

                        myRankingList.Add(RO);
                    }
                }
                activeWorkbookToString = excelHelper.GetRanking(myRankingList);
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Acceleration ||
                     (ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.SkidPad)
            {
                List<DynamicRankingObject> myRankingList = new List<DynamicRankingObject>();
                myRankingList = getDynamicRankingList(eventType, classId);

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    DynamicRankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        DynamicRankingObject RO = new DynamicRankingObject();

                        RO.CarNum = c.Carno;
                        RO.RegNum = c.Regno;
                        RO.TeamName = c.Team.Name;
                        RO.University = c.Team.University;
                        RO.Run1Time = 0;
                        RO.Run1TimeAdj = 0;
                        RO.Run1NumCones = 0;
                        RO.Run2Time = 0;
                        RO.Run2TimeAdj = 0;
                        RO.Run2NumCones = 0;
                        RO.Run3Time = 0;
                        RO.Run3TimeAdj = 0;
                        RO.Run3NumCones = 0;
                        RO.Run4Time = 0;
                        RO.Run4TimeAdj = 0;
                        RO.Run4NumCones = 0;
                        RO.BestTime = 0;
                        RO.ScoreValue = 0;
                        RO.NormalizedScore = 0;
                        myRankingList.Add(RO);
                    }
                }
                activeWorkbookToString = excelHelper.GetRanking(myRankingList);
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Autocross)
            {
                List<DynamicRankingObjectAutoCross> myRankingList = new List<DynamicRankingObjectAutoCross>();
                myRankingList = getDynamicRankingAutoCrossList(eventType, classId);

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    DynamicRankingObjectAutoCross rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        DynamicRankingObjectAutoCross RO = new DynamicRankingObjectAutoCross();

                        RO.CarNum = c.Carno;
                        RO.RegNum = c.Regno;
                        RO.TeamName = c.Team.Name;
                        RO.University = c.Team.University;
                        RO.Run1Time = 0;
                        RO.Run1TimeAdj = 0;
                        RO.Run1NumCones = 0;
                        RO.Run1Doc = 0;
                        RO.Run2Time = 0;
                        RO.Run2TimeAdj = 0;
                        RO.Run2NumCones = 0;
                        RO.Run2Doc = 0;
                        RO.Run3Time = 0;
                        RO.Run3TimeAdj = 0;
                        RO.Run3NumCones = 0;
                        RO.Run3Doc = 0;
                        RO.Run4Time = 0;
                        RO.Run4TimeAdj = 0;
                        RO.Run4NumCones = 0;
                        RO.Run4Doc = 0;
                        RO.BestTime = 0;
                        RO.ScoreValue = 0;
                        RO.NormalizedScore = 0;

                        myRankingList.Add(RO);
                    }
                }
                activeWorkbookToString = excelHelper.GetRanking(myRankingList);
            }
            else if ((ExcelHelper.TypeOfEventByName)eventType == ExcelHelper.TypeOfEventByName.Endurance)
            {
                ATA_WebService ws = new ATA_WebService();

                List<EnduranceRankingObject> myRankingList = new List<EnduranceRankingObject>();
                myRankingList = getRankingListEndurance(classId);

                List<EnduranceDetailRankingObject> myRankingListDetails = new List<EnduranceDetailRankingObject>();

                foreach (EnduranceRankingObject ERO in myRankingList)
                {
                    EnduranceDetailRankingObject EDRO = ws.GetScoreDetailsEndurance((int)ERO.Id);
                    if (EDRO != null)
                    {
                        myRankingListDetails.Add(EDRO);
                    }
                    else
                    {
                        myRankingListDetails.Add(new EnduranceDetailRankingObject());
                    }
                }

                List<Car> cars = ctx.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();
                foreach (Car c in cars)
                {
                    RankingObject rankFound = myRankingList.Where(r => r.CarNum.Equals(c.Carno)).FirstOrDefault();
                    if (rankFound == null)
                    {
                        EnduranceRankingObject RO = new EnduranceRankingObject();
                        EnduranceDetailRankingObject EDRO = new EnduranceDetailRankingObject();

                        RO.CarNum = c.Carno;
                        RO.RegNum = c.Regno;
                        RO.TeamName = c.Team.Name;
                        RO.University = c.Team.University;
                        RO.Laps = 0;
                        RO.BestTime = 0;

                        EDRO.DriverChangeStart = string.Empty;
                        EDRO.FuelType = string.Empty;

                        myRankingList.Add(RO);
                        myRankingListDetails.Add(EDRO);
                    }
                }
                activeWorkbookToString = excelHelper.GetRanking(myRankingList, myRankingListDetails);
            }
            return activeWorkbookToString;
        }
        #endregion

    }
}
