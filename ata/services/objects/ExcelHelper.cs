using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using System.IO;
using System.Configuration;
using OfficeOpenXml;

namespace ATA.services
{
    public class ExcelHelper
    {
        public enum TypeOfEventByName
        {
            Overall = 0,
            Presentation = 1,
            Cost = 2,
            Design = 3,
            Acceleration = 4,
            SkidPad = 5,
            Autocross = 6,
            Endurance = 7
        }
        public enum TypeOfClass
        {
            Class1C = 1,
            Class1E = 2,
            Class3 = 3
        }

        protected ExcelPackage oExcelPkg;
        protected ExcelWorksheet oExcelSheet;

        protected string sheetName; //Name of the sheet to use and fill
        protected int sheetRow;     //Starting row to use to write data

        private TypeOfEventByName eventType;
        private TypeOfClass classId;

        private string templateFileName2Class;
        private string templateFileName;
        protected string templateFileNameExtension;

        public TypeOfEventByName EventType
        {
            get { return eventType; }
            set
            {
                eventType = value;

                switch (eventType)
                {
                    case TypeOfEventByName.Presentation:
                        sheetName = "Presentation Event Ord";
                        sheetRow = 2;
                        break;
                    case TypeOfEventByName.Cost:
                        sheetName = "Cost Event Ordinato";
                        sheetRow = 2;
                        break;
                    case TypeOfEventByName.Design:
                        sheetName = "Design Event Ordinato";
                        sheetRow = 2;
                        break;
                    case TypeOfEventByName.Acceleration:
                        sheetName = "Acceleration Ordinato";
                        sheetRow = 6;
                        break;
                    case TypeOfEventByName.SkidPad:
                        sheetName = "Skid Pad Event Ordinato";
                        sheetRow = 6;
                        break;
                    case TypeOfEventByName.Autocross:
                        sheetName = "Autocross Event Ordinato";
                        sheetRow = 6;
                        break;
                    case TypeOfEventByName.Endurance:
                        sheetName = "Endurance-Efficiency Ordinato";
                        sheetRow = 11;
                        break;
                    case TypeOfEventByName.Overall:
                        sheetName = "Overall Results Ordinato";
                        sheetRow = 2;
                        break;
                    default:
                        sheetName = string.Empty;
                        sheetName = "Overall Results Ordinato";
                        sheetRow = 2;
                        break;
                }
            }
        }
        public TypeOfClass ClassType
        {
            get { return classId; }
            set
            {
                classId = value;
                switch (ClassType)
                {
                    case TypeOfClass.Class1C:
                        templateFileName2Class = "1C ";
                        break;
                    case TypeOfClass.Class1E:
                        templateFileName2Class = "1E ";
                        break;
                    case TypeOfClass.Class3:
                        templateFileName2Class = "3 ";
                        break;
                    default:
                        templateFileName2Class = string.Empty;
                        break;
                }
            }
        }

        public string TemplateFileName
        {
            get { return templateFileName; }
            set
            {
                templateFileName = value;
                templateFileName += templateFileName2Class += DateTime.Now.Year + "_template" + templateFileNameExtension;
            }
        }
        public string TemplatesBaseDirectory
        {
            get
            {
                string templateDir = Properties.Settings.Default.TemplatesXLSDirectory;
                if (templateDir != null && templateDir != String.Empty)
                {
                    return templateDir;
                }
                else
                {
                    return System.AppDomain.CurrentDomain.BaseDirectory + "templatesXLSX\\" + DateTime.Now.Year;
                }
            }
        }

        protected void OpenWorkbook()
        {
            FileInfo f = new FileInfo(TemplatesBaseDirectory + "\\" + TemplateFileName);
            //FileInfo n = new FileInfo(TemplatesBaseDirectory + "\\" + "pippo" + templateFileNameExtension);
            FileInfo n = new FileInfo(Path.GetTempFileName());
            oExcelPkg = new ExcelPackage(n, f);
        }
        protected void GetSheet()
        {
            //Search sheet by name
            oExcelSheet = oExcelPkg.Workbook.Worksheets[sheetName];
            if (oExcelSheet == null)
            {
                //Create new one
                oExcelSheet = oExcelPkg.Workbook.Worksheets.Add(sheetName);
                oExcelSheet.Name = sheetName;
            }
        }
        protected void ResizeColumns()
        {
            if (oExcelSheet.Dimension != null)
            {
                int rStart = oExcelSheet.Dimension.Start.Row;
                int cStart = oExcelSheet.Dimension.Start.Column;
                int rEnd = oExcelSheet.Dimension.End.Row;
                int cEnd = oExcelSheet.Dimension.End.Column;

                using (var range = oExcelSheet.Cells[rStart, cStart, rEnd, cEnd])
                {
                    //range.Style.Font.Name = "Verdana";
                    range.AutoFitColumns();
                }
            }
        }
        protected void Close()
        {
            oExcelSheet = null;
            oExcelPkg = null;
        }
        protected byte[] GetActiveWorkbook()
        {
            string path = oExcelPkg.File.FullName;
            byte[] activeWorkbookToBytes;
            try
            {
                //oExcelPkg.Save();
                //activeWorkbookToBytes = File.ReadAllBytes(path);
                var ms = new MemoryStream();
                oExcelPkg.SaveAs(ms);
                oExcelPkg.Load(ms);
                activeWorkbookToBytes = oExcelPkg.GetAsByteArray();
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
            finally
            {
                if (File.Exists(path))
                    File.Delete(path);
            }
            return activeWorkbookToBytes;
        }
        protected byte[] GetActiveWorksheet()
        {
            string path = oExcelPkg.File.FullName;
            byte[] activeWorkbookToBytes;
            try
            {
                //Gets all sheets different from the desired one
                List<ExcelWorksheet> sheets = oExcelPkg.Workbook.Worksheets.Where(s => !s.Name.Equals(sheetName)).ToList();

                //Hide them
                foreach (ExcelWorksheet s in sheets)
                {
                    //s.Hidden = eWorkSheetHidden.VeryHidden;
                    s.Hidden = eWorkSheetHidden.Hidden;
                }

                ExcelWorksheet currentWS = oExcelPkg.Workbook.Worksheets.Where(s => s.Name.Equals(sheetName)).FirstOrDefault();
                currentWS.Select();

                //oExcelPkg.Save();
                //activeWorkbookToBytes = File.ReadAllBytes(path);
                var ms = new MemoryStream();
                oExcelPkg.SaveAs(ms);
                oExcelPkg.Load(ms);
                activeWorkbookToBytes = oExcelPkg.GetAsByteArray();
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
            finally
            {
                if (File.Exists(path))
                    File.Delete(path);
            }
            return activeWorkbookToBytes;
        }

        public ExcelHelper(int eventType, int classId, int useMacro)
        {
            EventType = (TypeOfEventByName)eventType;
            ClassType = (TypeOfClass)classId;

            templateFileNameExtension = (useMacro == 0) ? ".xlsx" : ".xlsm";
            TemplateFileName = "FSaeItalyResultsClass";

            oExcelPkg = new ExcelPackage();
        }

        //Presentation & Cost
        public string GetRanking(IEnumerable<RankingObject> rankingObjects)
        {
            try
            {
                //Open workbook
                OpenWorkbook();

                //Get desired sheet
                GetSheet();

                //Write data
                foreach (RankingObject ro in rankingObjects)
                {
                    oExcelSheet.Cells[sheetRow, 2].Value = ro.CarNum;

                    if (EventType == TypeOfEventByName.Presentation)
                    {
                        //oExcelSheet.Cells[sheetRow, 3].Value = ro.RegNum;
                        oExcelSheet.Cells[sheetRow, 3].Value = ro.TeamName;
                        oExcelSheet.Cells[sheetRow, 4].Value = ro.University;
						//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                        oExcelSheet.Cells[sheetRow, 5].Value = ro.NormalizedScore + ro.FinalsScore;
                    }
                    else
                    {
                        oExcelSheet.Cells[sheetRow, 3].Value = ro.TeamName;
                        oExcelSheet.Cells[sheetRow, 4].Value = ro.University;
                        oExcelSheet.Cells[sheetRow, 5].Value = ro.NormalizedScore;
                    }
                    sheetRow++;
                }

                //Resize the columns 
                ResizeColumns();

                byte[] activeWorkbookToBytes = GetActiveWorksheet();

                //Save the sheet and close 
                Close();

                return Convert.ToBase64String(activeWorkbookToBytes);
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
        }
        //Design
        public string GetRanking(IEnumerable<DesignRankingObject> rankingObjects)
        {
            try
            {
                //Open workbook
                OpenWorkbook();

                //Get desired sheet
                GetSheet();

                //Write data
                foreach (RankingObject ro in rankingObjects)
                {
                    oExcelSheet.Cells[sheetRow, 2].Value = ro.CarNum;
                    oExcelSheet.Cells[sheetRow, 3].Value = ro.TeamName;
                    oExcelSheet.Cells[sheetRow, 4].Value = ro.University;
                    oExcelSheet.Cells[sheetRow, 5].Value = ro.ScoreValue;
                    oExcelSheet.Cells[sheetRow, 6].Value = ro.NormalizedScore;

                    sheetRow++;
                }

                //Resize the columns 
                ResizeColumns();

                byte[] activeWorkbookToBytes = GetActiveWorksheet();

                //Save the sheet and close 
                Close();

                return Convert.ToBase64String(activeWorkbookToBytes);
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
        }
        //Acceleration & Skidpad
        public string GetRanking(IEnumerable<DynamicRankingObject> rankingObjects)
        {
            try
            {
                //Open workbook
                OpenWorkbook();

                //Get desired sheet
                GetSheet();

                //Write data
                //foreach (DynamicRankingObject ro in rankingObjects.Where(r => r.BestTime > 0))
                foreach (DynamicRankingObject ro in rankingObjects)
                {
                    oExcelSheet.Cells[sheetRow, 2].Value = ro.CarNum;
                    oExcelSheet.Cells[sheetRow, 3].Value = ro.TeamName;
                    oExcelSheet.Cells[sheetRow, 4].Value = ro.University;

                    oExcelSheet.Cells[sheetRow, 5].Value = ro.Run1Time;
                    oExcelSheet.Cells[sheetRow, 6].Value = ro.Run1NumCones;
                    oExcelSheet.Cells[sheetRow, 7].Value = ro.Run1TimeAdj;

                    oExcelSheet.Cells[sheetRow, 8].Value = ro.Run2Time;
                    oExcelSheet.Cells[sheetRow, 9].Value = ro.Run2NumCones;
                    oExcelSheet.Cells[sheetRow, 10].Value = ro.Run2TimeAdj;

                    oExcelSheet.Cells[sheetRow, 11].Value = ro.Run3Time;
                    oExcelSheet.Cells[sheetRow, 12].Value = ro.Run3NumCones;
                    oExcelSheet.Cells[sheetRow, 13].Value = ro.Run3TimeAdj;

                    oExcelSheet.Cells[sheetRow, 14].Value = ro.Run4Time;
                    oExcelSheet.Cells[sheetRow, 15].Value = ro.Run4NumCones;
                    oExcelSheet.Cells[sheetRow, 16].Value = ro.Run4TimeAdj;

                    oExcelSheet.Cells[sheetRow, 17].Value = ro.BestTime;
                    oExcelSheet.Cells[sheetRow, 18].Value = ro.ScoreValue;

                    sheetRow++;
                }

                //Resize the columns 
                ResizeColumns();

                byte[] activeWorkbookToBytes = GetActiveWorksheet();

                //Save the sheet and close 
                Close();

                return Convert.ToBase64String(activeWorkbookToBytes);
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
        }
        //Autocross
        public string GetRanking(IEnumerable<DynamicRankingObjectAutoCross> rankingObjects)
        {
            try
            {
                //Open workbook
                OpenWorkbook();

                //Get desired sheet
                GetSheet();

                //Write data
                //foreach (DynamicRankingObjectAutoCross ro in rankingObjects.Where(r => r.BestTime > 0))
                foreach (DynamicRankingObjectAutoCross ro in rankingObjects)
                {
                    oExcelSheet.Cells[sheetRow, 2].Value = ro.CarNum;
                    oExcelSheet.Cells[sheetRow, 3].Value = ro.TeamName;
                    oExcelSheet.Cells[sheetRow, 4].Value = ro.University;

                    oExcelSheet.Cells[sheetRow, 5].Value = ro.Run1Time;
                    oExcelSheet.Cells[sheetRow, 6].Value = ro.Run1NumCones;
                    oExcelSheet.Cells[sheetRow, 7].Value = ro.Run1Doc;
                    oExcelSheet.Cells[sheetRow, 8].Value = ro.Run1TimeAdj;

                    oExcelSheet.Cells[sheetRow, 9].Value = ro.Run2Time;
                    oExcelSheet.Cells[sheetRow, 10].Value = ro.Run2NumCones;
                    oExcelSheet.Cells[sheetRow, 11].Value = ro.Run2Doc;
                    oExcelSheet.Cells[sheetRow, 12].Value = ro.Run2TimeAdj;

                    oExcelSheet.Cells[sheetRow, 13].Value = ro.Run3Time;
                    oExcelSheet.Cells[sheetRow, 14].Value = ro.Run3NumCones;
                    oExcelSheet.Cells[sheetRow, 15].Value = ro.Run3Doc;
                    oExcelSheet.Cells[sheetRow, 16].Value = ro.Run3TimeAdj;

                    oExcelSheet.Cells[sheetRow, 17].Value = ro.Run4Time;
                    oExcelSheet.Cells[sheetRow, 18].Value = ro.Run4NumCones;
                    oExcelSheet.Cells[sheetRow, 19].Value = ro.Run4Doc;
                    oExcelSheet.Cells[sheetRow, 20].Value = ro.Run4TimeAdj;

                    oExcelSheet.Cells[sheetRow, 21].Value = ro.BestTime;
                    oExcelSheet.Cells[sheetRow, 22].Value = ro.ScoreValue;

                    sheetRow++;
                }

                //Resize the columns 
                ResizeColumns();

                byte[] activeWorkbookToBytes = GetActiveWorksheet();

                //Save the sheet and close 
                Close();

                return Convert.ToBase64String(activeWorkbookToBytes);
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
        }
        //Endurance
        public string GetRanking(IEnumerable<EnduranceRankingObject> rankingObjects, IEnumerable<EnduranceDetailRankingObject> rankingDetailsObjects)
        {
            try
            {
                //Open workbook
                OpenWorkbook();

                //Get desired sheet
                GetSheet();

                //Write data
                int indexDetails = 0;
                foreach (EnduranceRankingObject ro in rankingObjects)
                {
                    EnduranceDetailRankingObject rod = rankingDetailsObjects.ElementAt(indexDetails);
                    //if (rod.Time > 0)
                    //{
                    oExcelSheet.Cells[sheetRow, 2].Value = ro.CarNum;
                    oExcelSheet.Cells[sheetRow, 3].Value = ro.TeamName;
                    oExcelSheet.Cells[sheetRow, 4].Value = ro.University;

                    oExcelSheet.Cells[sheetRow, 5].Value = rod.Time;
                    oExcelSheet.Cells[sheetRow, 6].Value = rod.Laps;
                    oExcelSheet.Cells[sheetRow, 7].Value = rod.Penalities;
                    oExcelSheet.Cells[sheetRow, 8].Value = rod.Cone;
                    oExcelSheet.Cells[sheetRow, 9].Value = rod.Doc;
                    oExcelSheet.Cells[sheetRow, 10].Value = rod.AdjTimeDNF;
                    oExcelSheet.Cells[sheetRow, 11].Value = rod.AdjTime;
                    oExcelSheet.Cells[sheetRow, 12].Value = rod.EnduranceScore;
                    oExcelSheet.Cells[sheetRow, 13].Value = rod.FuelUsed;

                    if (ClassType == TypeOfClass.Class1C)
                    {
                        oExcelSheet.Cells[sheetRow, 14].Value = rod.FuelType;
                        //FDT - ATA 2023 - da cambiare la colonna 15
                        //oExcelSheet.Cells[sheetRow, 15].Value = rod.Co2Used;
                        oExcelSheet.Cells[sheetRow, 15].Value = rod.EnergyCorr;
                        oExcelSheet.Cells[sheetRow, 16].Value = rod.EfficienctyScore;
                        oExcelSheet.Cells[sheetRow, 17].Value = rod.TotalScore;
                    }
                    else
                    {
                        //FDT - ATA 2023 - da cambiare la colonna 14
                        //oExcelSheet.Cells[sheetRow, 14].Value = rod.Co2Used;
                        oExcelSheet.Cells[sheetRow, 14].Value = rod.EnergyCorr;
                        oExcelSheet.Cells[sheetRow, 15].Value = rod.EfficienctyScore;
                        oExcelSheet.Cells[sheetRow, 16].Value = rod.TotalScore;
                    }

                    sheetRow++;
                    //}

                    indexDetails++;
                }

                double minLapTotalCo2 = 0;
                EnduranceDetailRankingObject item = rankingDetailsObjects.Where(d => d.Co2Lap > 0).OrderBy(d => d.Co2Lap).FirstOrDefault();
                if (item != null) { minLapTotalCo2 = item.Co2Lap; }

                double minAvgLapTimeEfficiency = 0;
                item = rankingDetailsObjects.Where(d => d.AvgLapTimeEfficiency > 0).OrderBy(d => d.AvgLapTimeEfficiency).FirstOrDefault();
                if (item != null) { minAvgLapTimeEfficiency = item.AvgLapTimeEfficiency; }

                double maxEfficencyFactor = 0;
                item = rankingDetailsObjects.Where(d => d.EfficencyFactor > 0).OrderByDescending(d => d.EfficencyFactor).FirstOrDefault();
                if (item != null) { maxEfficencyFactor = item.EfficencyFactor; }

                //FDT - ATA 2023 - add scrittura min efficiency factor
                //fuelEfficiencyFactorMin = myScores.Min(d => d.EfficencyFactor)
                double minEfficiencyFactor = 0;
                minEfficiencyFactor = rankingDetailsObjects.Where(x => x.EfficencyFactor >0).Min(d => d.EfficencyFactor);
                oExcelSheet.Cells[7, 12].Value = minEfficiencyFactor;

                if (ClassType == TypeOfClass.Class1C)
                {
                    //FDT - ATA 2023 - campi non più scritti
                    //oExcelSheet.Cells[3, 17].Value = minLapTotalCo2;
                    //oExcelSheet.Cells[5, 17].Value = minAvgLapTimeEfficiency;
                    //oExcelSheet.Cells[8, 17].Value = maxEfficencyFactor;                    
                }
                else
                {
                    //FDT - ATA 2023 - campi non più scritti
                    //oExcelSheet.Cells[3, 16].Value = minLapTotalCo2;
                    //oExcelSheet.Cells[5, 16].Value = minAvgLapTimeEfficiency;
                    //oExcelSheet.Cells[8, 16].Value = maxEfficencyFactor;
                }

                //Resize the columns 
                ResizeColumns();

                byte[] activeWorkbookToBytes = GetActiveWorksheet();

                //Save the sheet and close 
                Close();

                return Convert.ToBase64String(activeWorkbookToBytes);
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
        }
        //Overall
        public string GetRanking(IEnumerable<OverallRankingObject> rankingObjects)
        {
            try
            {
                //Open workbook
                OpenWorkbook();

                //Get desired sheet
                GetSheet();

                //Write data
                foreach (OverallRankingObject ro in rankingObjects)
                {
                    oExcelSheet.Cells[sheetRow, 2].Value = ro.CarNum;
                    oExcelSheet.Cells[sheetRow, 3].Value = ro.TeamName;
                    oExcelSheet.Cells[sheetRow, 4].Value = ro.University;

                    oExcelSheet.Cells[sheetRow, 5].Value = ro.CorrectedScoreCost;
                    oExcelSheet.Cells[sheetRow, 6].Value = ro.CorrectedScorePresentation;
                    oExcelSheet.Cells[sheetRow, 7].Value = ro.CorrectedScoreDesign;
                    oExcelSheet.Cells[sheetRow, 8].Value = ro.CorrectedScoreAcceleration;

                    if ((ClassType == TypeOfClass.Class1C) || (ClassType == TypeOfClass.Class1E))
                    {
                        oExcelSheet.Cells[sheetRow, 9].Value = ro.CorrectedScoreSkidPad;
                        oExcelSheet.Cells[sheetRow, 10].Value = ro.CorrectedScoreAutocross;
                        oExcelSheet.Cells[sheetRow, 11].Value = ro.CorrectedScoreEndurance;
                        oExcelSheet.Cells[sheetRow, 12].Value = ro.CorrectedScoreEnduranceEfficiency;
                        oExcelSheet.Cells[sheetRow, 13].Value = ro.PenalityScore;
                        oExcelSheet.Cells[sheetRow, 14].Value = ro.CorrectedScore;
                    }
                    else
                    {
                        oExcelSheet.Cells[sheetRow, 9].Value = ro.PenalityScore;
                        oExcelSheet.Cells[sheetRow, 10].Value = ro.CorrectedScore;
                    }

                    sheetRow++;
                }

                //Resize the columns 
                ResizeColumns();

                byte[] activeWorkbookToBytes = GetActiveWorksheet();

                //Save the sheet and close 
                Close();

                return Convert.ToBase64String(activeWorkbookToBytes);
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw ex;
            }
        }
    }
}