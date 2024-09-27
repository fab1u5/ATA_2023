using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;

namespace ATA.services
{
    /// <summary>
    /// Summary description for ATA_ImportService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class ATA_ImportService : System.Web.Services.WebService
    {
        [WebMethod]
        public bool DataUpload(JsonObjects scores)
        {
            try {
                if (scores != null) {
                    using (var ctx = new ATA_Context()) {
                        using (var dbContextTransaction = ctx.Database.BeginTransaction()) {
                            //ACCELERATION
                            if (scores.acceleration != null && scores.acceleration.Count > 0) {
                                ExceptionLogHelper.Log("saveAcceleration: " + saveAcceleration(scores.acceleration, ctx, scores.uploadingExamboard));
                            }

                            //AUTOCROSS
                            if (scores.autocross != null && scores.autocross.Count > 0) {
                                ExceptionLogHelper.Log("saveAutocross: " + saveAutocross(scores.autocross, ctx, scores.uploadingExamboard));
                            }

                            //DESIGN 1C-3
                            if (scores.design1C3 != null && scores.design1C3.Count > 0) {
                                ExceptionLogHelper.Log("saveDesign1C3: " + saveDesign1C3(scores.design1C3, ctx, scores.uploadingExamboard));
                            }

                            //DESIGN 1E
                            if (scores.design1E != null && scores.design1E.Count > 0) {
                                ExceptionLogHelper.Log("saveDesign1E: " + saveDesign1E(scores.design1E, ctx, scores.uploadingExamboard));
                            }

                            //PRESENTATION
                            if (scores.presentation != null && scores.presentation.Count > 0) {
                                ExceptionLogHelper.Log("savePresentation: " + savePresentation(scores.presentation, ctx, scores.uploadingExamboard));
                            }

                            //COST
                            if (scores.scorecost != null && scores.scorecost.Count > 0) {
                                ExceptionLogHelper.Log("saveCost: " + saveCost(scores.scorecost, ctx, scores.uploadingExamboard));
                            }

                            //SKIDPAD
                            if (scores.skidpad != null && scores.skidpad.Count > 0) {
                                ExceptionLogHelper.Log("saveSkidpad: " + saveSkidpad(scores.skidpad, ctx, scores.uploadingExamboard));
                            }

                            //ENDURANCE
                            if (scores.endurance != null && scores.endurance.Count > 0) {
                                ExceptionLogHelper.Log("saveEndurance: " + saveEndurance(scores.endurance, ctx, scores.uploadingExamboard));
                            }

                            dbContextTransaction.Commit();

                            //Recalculate scores
                            ATA_WebService ws = new ATA_WebService();
                            List<Class> classes = ws.GetClasses();
                            foreach (Class c in ctx.Classes.ToList()) {
                                //ACCELERATION
                                if (scores.acceleration != null && scores.acceleration.Count > 0) {
                                    ws.CalculateScoreAcceleration(c.Id);
                                }

                                //AUTOCROSS
                                if (scores.autocross != null && scores.autocross.Count > 0) {
                                    ws.CalculateScoreAutocross(c.Id);
                                }

                                //COST
                                if (scores.scorecost != null && scores.scorecost.Count > 0) {
                                    ws.CalculateScoreCost2015(c.Id);
                                }

                                //SKIDPAD
                                if (scores.skidpad != null && scores.skidpad.Count > 0) {
                                    ws.CalculateScoreSkidPad(c.Id);
                                }

                                //ENDURANCE
                                if (scores.endurance != null && scores.endurance.Count > 0) {
                                    ws.CalculateScoreEndurance(c.Id);
                                }
                            }
                        }
                    }
                }
                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }
        private bool saveAcceleration(List<Acceleration> accelerations, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Acceleration a in accelerations) {
                    var item = ctx.ScoresAcceleration.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null) {
                        //SCORE FOUND, DELETE
                        ctx.ScoresAcceleration.Remove(item);
                        ctx.Scores.Remove(
                            ctx.Scores.Where(
                                s => s.Car.Id.Equals(a.carid) &&
                                    s.Event.Id.Equals(a.eventid)
                                ).FirstOrDefault()
                            );
                    }

                    //INSERT
                    item = new ScoreAcceleration();
                    item.Run1NumOfCones = a.run1numofcones;
                    item.Run1Time = a.run1time;
                    item.Run1TimeAdj = a.run1timeadj;
                    item.Run2NumOfCones = a.run2numofcones;
                    item.Run2Time = a.run2time;
                    item.Run2TimeAdj = a.run2timeadj;
                    item.Run3NumOfCones = a.run3numofcones;
                    item.Run3Time = a.run3time;
                    item.Run3TimeAdj = a.run3timeadj;
                    item.Run4NumOfCones = a.run4numofcones;
                    item.Run4Time = a.run4time;
                    item.Run4TimeAdj = a.run4timeadj;

                    item.Score = new Score() {
                        Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        UploadingExamboard = uploadingExamboard
                        //Event 2017 - Save also uploading examboard
                    };
                    ctx.ScoresAcceleration.Add(item);
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveAutocross(List<Autocross> autocross, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Autocross a in autocross) {
                    var item = ctx.ScoresAutoCross.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null) {
                        //SCORE FOUND, DELETE
                        ctx.ScoresAutoCross.Remove(item);
                        ctx.Scores.Remove(
                            ctx.Scores.Where(
                                s => s.Car.Id.Equals(a.carid) &&
                                    s.Event.Id.Equals(a.eventid)
                                ).FirstOrDefault()
                            );
                    }

                    //INSERT
                    item = new ScoreAutoCross();
                    item.Run1Doc = a.run1doc;
                    item.Run1NumOfCones = a.run1numofcones;
                    item.Run1Time = a.run1time;
                    item.Run1TimeAdj = a.run1timeadj;
                    item.Run2Doc = a.run2doc;
                    item.Run2NumOfCones = a.run2numofcones;
                    item.Run2Time = a.run2time;
                    item.Run2TimeAdj = a.run2timeadj;
                    item.Run3Doc = a.run3doc;
                    item.Run3NumOfCones = a.run3numofcones;
                    item.Run3Time = a.run3time;
                    item.Run3TimeAdj = a.run3timeadj;
                    item.Run4Doc = a.run4doc;
                    item.Run4NumOfCones = a.run4numofcones;
                    item.Run4Time = a.run4time;
                    item.Run4TimeAdj = a.run4timeadj;

                    item.Score = new Score() {
                        Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        UploadingExamboard = uploadingExamboard
                        //Event 2017 - Save also uploading examboard
                    };
                    ctx.ScoresAutoCross.Add(item);
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveDesign1C3(List<Design1C3> designs, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Design1C3 a in designs) {
                    var item = ctx.ScoresDesign1C3.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null) {
                        //SCORE FOUND, DELETE
                        ctx.ScoresDesign1C3.Remove(item);
                        ctx.Scores.Remove(
                            ctx.Scores.Where(
                                s => s.Car.Id.Equals(a.carid) &&
                                    s.Event.Id.Equals(a.eventid)
                                ).FirstOrDefault()
                            );
                    }

                    //INSERT
                    item = new ScoreDesign1C3();
                    item.AestheticsStyle = a.aestheticsstyle;
                    item.AestheticsStyleNotes = a.aestheticsstylenotes;
                    item.CarWeight = a.carweight;
                    item.CockpitControlsBrakesSafety = a.cockpitcontrolsbrakessafety;
                    item.CockpitControlsBrakesSafetyNotes = a.cockpitcontrolsbrakessafetynotes;
                    item.Creativity = a.creativity;
                    item.CreativityNotes = a.creativitynotes;
                    item.FrameBodyAero = a.framebodyaero;
                    item.FrameBodyAeroNotes = a.framebodyaeronotes;
                    item.ManufacturabilityServiceability = a.manufacturabilityserviceability;
                    item.ManufacturabilityServiceabilityNotes = a.manufacturabilityserviceabilitynotes;
                    item.Powertrain = a.powertrain;
                    item.PowertrainNotes = a.powertrainnotes;
                    item.Suspension = a.suspension;
                    item.SuspensionNotes = a.suspensionnotes;
                    item.SystemManagementIntegration = a.systemmanagementintegration;
                    item.SystemManagementIntegrationNotes = a.systemmanagementintegrationnotes;

                    item.Miscellaneous = a.miscellaneous;
                    item.MiscellaneousNotes = a.miscellaneousnotes;

                    item.Score = new Score() {
                        Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        //AF - Giu 2016 - Update Total Score in the main table
                        GivenScore = item.RecalculateTotalScore(),
                        UploadingExamboard = uploadingExamboard
                        //Event 2017 - Save also uploading examboard
                    };
                    ctx.ScoresDesign1C3.Add(item);
                }
                ctx.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveDesign1E(List<Design1E> designs, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Design1E a in designs) {
                    var item = ctx.ScoresDesign1E.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null) {
                        //SCORE FOUND, DELETE
                        ctx.ScoresDesign1E.Remove(item);
                        ctx.Scores.Remove(
                            ctx.Scores.Where(
                                s => s.Car.Id.Equals(a.carid) &&
                                    s.Event.Id.Equals(a.eventid)
                                ).FirstOrDefault()
                            );
                    }
                    ctx.SaveChanges();
                    //INSERT
                    item = new ScoreDesign1E();
                    item.AestheticsStyle = a.aestheticsstyle;
                    item.AestheticsStyleNotes = a.aestheticsstylenotes;
                    item.CarWeight = a.carweight;
                    item.CockpitControlsBrakesSafety = a.cockpitcontrolsbrakessafety;
                    item.CockpitControlsBrakesSafetyNotes = a.cockpitcontrolsbrakessafetynotes;
                    item.Creativity = a.creativity;
                    item.CreativityNotes = a.creativitynotes;
                    item.FrameBodyAero = a.framebodyaero;
                    item.FrameBodyAeroNotes = a.framebodyaeronotes;
                    item.ManufacturabilityServiceability = a.manufacturabilityserviceability;
                    item.ManufacturabilityServiceabilityNotes = a.manufacturabilityserviceabilitynotes;
                    item.Suspension = a.suspension;
                    item.SuspensionNotes = a.suspensionnotes;
                    item.SystemManagementIntegration = a.systemmanagementintegration;
                    item.SystemManagementIntegrationNotes = a.systemmanagementintegrationnotes;
                    item.TractiveDriveRecoverySystem = a.tractivedriverecoverysystem;
                    item.TractiveDriveRecoverySystemNotes = a.tractivedriverecoverysystemnotes;

                    item.Miscellaneous = a.miscellaneous;
                    item.MiscellaneousNotes = a.miscellaneousnotes;

                    item.Score = new Score() {
                        Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        //AF - Giu 2016 - Update Total Score in the main table
                        GivenScore = item.RecalculateTotalScore(),
                        UploadingExamboard = uploadingExamboard
                        //Event 2017 - Save also uploading examboard
                    };
                    ctx.ScoresDesign1E.Add(item);
                }
                ctx.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool savePresentation(List<Presentation> presentations, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Presentation a in presentations) {
                    var item = ctx.ScoresPresentation.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null)
                    {
                        ////////SCORE FOUND, DELETE
                        //////ctx.ScoresPresentation.Remove(item);
                        //////ctx.Scores.Remove(
                        //////    ctx.Scores.Where(
                        //////        s => s.Car.Id.Equals(a.carid) &&
                        //////            s.Event.Id.Equals(a.eventid)
                        //////        ).FirstOrDefault()
                        //////    );

                        //FDT - ATA 2023 - modifiche stage3
                        //item.Novelty0 = a.novelty0;
                        //item.Novelty1 = a.novelty1;
                        //item.Novelty2 = a.novelty2;
                        //item.NoveltyNotes = a.noveltynotes;
                        item.Content0 = a.content0;
                        item.Content1 = a.content1;
                        item.Content2 = a.content2;
                        item.Content3 = a.content3;
                        item.Content4 = a.content4;
                        item.Content5 = a.content5;
                        item.Content6 = a.content6;
                        //FDT - ATA2024
                        //item.Content7 = a.content7;
                        //item.Content8 = a.content8;
                        item.ContentNotes = a.contentnotes;

                        item.Finances0 = a.finances0;
                        item.Finances1 = a.finances1;
                        item.Finances2 = a.finances2;
                        item.Finances3 = a.finances3;
                        //FDT  - ATA 2024
                        item.Finances4 = a.finances4;
                        item.Finances5 = a.finances5;
                        item.Finances6 = a.finances6;
                        item.Finances7 = a.finances7;
                        item.Finances8 = a.finances8;
                        item.Finances9 = a.finances9;
                        item.Finances10 = a.finances10;
                        item.Finances11 = a.finances11;
                        item.FinancesNotes = a.financesnotes;

                        item.DeepDiveTopic0 = a.deepdivetopic0;
                        item.DeepDiveTopic1 = a.deepdivetopic1;
                        item.DeepDiveTopic2 = a.deepdivetopic2;
                        item.DeepDiveTopic3 = a.deepdivetopic3;
                        item.DeepDiveTopicNotes = a.deepdivetopicnotes;

                        item.Demonstration0 = a.demonstration0;
                        item.Demonstration1 = a.demonstration1;
                        item.Demonstration2 = a.demonstration2;
                        item.Demonstration3 = a.demonstration3;
                        //FDT - ATA2024
                        item.Demonstration4 = a.demonstration4;
                        item.Demonstration5 = a.demonstration5;
                        item.DemonstrationNotes = a.demonstrationnotes;

                        item.Structure0 = a.structure0;
                        item.Structure1 = a.structure1;
                        item.Structure2 = a.structure2;
                        item.Structure3 = a.structure3;
                        item.Structure4 = a.structure4;
                        //FDT - ATA2024
                        //item.Structure5 = a.structure5;
                        item.StructureNotes = a.structurenotes;


                        item.Delivery0 = a.delivery0;
                        item.Delivery1 = a.delivery1;
                        item.Delivery2 = a.delivery2;
                        item.Delivery3 = a.delivery3;
                        item.Delivery4 = a.delivery4;
                        item.Delivery5 = a.delivery5;
                        item.Delivery6 = a.delivery6;
                        item.Delivery7 = a.delivery7;
                        //FDT - ATA2024
                        //item.Delivery8 = a.delivery8;
                        //item.Delivery9 = a.delivery9;
                        item.DeliveryNotes = a.deliverynotes;

                        item.Questions0 = a.questions0;
                        item.Questions1 = a.questions1;
                        item.Questions2 = a.questions2;
                        item.Questions3 = a.questions3;
                        item.Questions4 = a.questions4;
                        item.Questions5 = a.questions5;
                        item.Questions6 = a.questions6;
                        item.Questions7 = a.questions7;                        
                        item.QuestionsNotes = a.questionsnotes;

                        item.GeneralImpression0 = a.generalimpression0;
                        item.GeneralImpression1 = a.generalimpression1;
                        item.GeneralImpression2 = a.generalimpression2;
                        item.GeneralImpressionNotes = a.generalimpressionnotes;

                        item.Miscellaneous = a.miscellaneous;
                        item.MiscellaneousNotes = a.miscellaneousnotes;

                        item.Finals = a.finals;

                        item.Score.Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault();
                        item.Score.Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault();
                        item.Score.GivenScore = item.RecalculateTotalScore();
                        item.Score.FinalsScore = item.RecalculateFinalsScore();
                        item.Score.UploadingExamboard = uploadingExamboard;
                        //    = new Score()
                        //{
                        //    Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        //    Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        //    //Recalculate given score
                        //    GivenScore = item.RecalculateTotalScore(),
                        //    //FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                        //    FinalsScore = item.RecalculateFinalsScore(),
                        //    UploadingExamboard = uploadingExamboard
                        //    //Event 2017 - Save also uploading examboard
                        //};

                    }
                    else
                    {

                        //INSERT
                        item = new ScorePresentation();

                        //Event 2019 - Presentation Event has been changed
                        //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                        //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> . BEGIN
                        //var St2BusinnesFigures = ToArray(a.St2BusinnesFigures0, a.St2BusinnesFigures1, a.St2BusinnesFigures2, a.St2BusinnesFigures3);
                        //FDT - ATA 2023 - eliminato Business Figures - FINE

                        //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                        var St2FinConcept = ToArray(a.St2FinConcept0, a.St2FinConcept1, a.St2FinConcept2, a.St2FinConcept3, a.St2FinConcept4,
                                                    a.St2FinConcept5, a.St2FinConcept6, a.St2FinConcept7, a.St2FinConcept8, a.St2FinConcept9);
                        //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                        var St2FinKPIs = ToArray(a.St2FinKPIs0, a.St2FinKPIs1, a.St2FinKPIs2, a.St2FinKPIs3, a.St2FinKPIs4);
                        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE

                        //FDT - ATA 2022 - modify Stage 2
                        //a.St2BusinnesFigures4);
                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                        //var St2Content = ToArray(a.St2Content0, a.St2Content1, a.St2Content2, a.St2Content3, a.St2Content4);
                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                        var St2DemonstrationAndDelivery = ToArray(a.St2DemonstrationAndDelivery0, a.St2DemonstrationAndDelivery1, a.St2DemonstrationAndDelivery2, a.St2DemonstrationAndDelivery3, a.St2DemonstrationAndDelivery4);
                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                        //var St2Investitors = ToArray(a.St2Investitors0, a.St2Investitors1, a.St2Investitors2);
                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                        //FDT - ATA 2022 - modify Stage 2
                        //a.St2Investitors3);
                        //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                        //var executivesummary = ToArray(a.executivesummary0, a.executivesummary1, a.executivesummary2, a.executivesummary3);
                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
                        //var novelty = ToArray(a.novelty0, a.novelty1, a.novelty2, a.novelty3);

                        //FDT - ATA 2023 - modifiche stage3
                        //var novelty = ToArray(a.novelty0, a.novelty1, a.novelty2);

                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
                        //var content = ToArray(a.content0, a.content1, a.content2, a.content3, a.content4, a.content5, a.content6, a.content7, a.content8);
                        //var content = ToArray(a.content0, a.content1, a.content2, a.content3, a.content4, a.content5, a.content6, a.content7, a.content8, a.content9);
                        //FDT - ATA2024
                        var content = ToArray(a.content0, a.content1, a.content2, a.content3, a.content4, a.content5, a.content6);

                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
                        //var finances = ToArray(a.finances0, a.finances1, a.finances2, a.finances3, a.finances4, a.finances5, a.finances6);
                        //FDT - ATA 2024
                        var finances = ToArray(a.finances0, a.finances1, a.finances2, a.finances3, a.finances4,
                            a.finances5, a.finances6, a.finances7, a.finances8, a.finances9, a.finances10, a.finances11);

                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add deepdivetopic4
                        //var deepdivetopic = ToArray(a.deepdivetopic0, a.deepdivetopic1, a.deepdivetopic2, a.deepdivetopic3);
                        //var deepdivetopic = ToArray(a.deepdivetopic0, a.deepdivetopic1, a.deepdivetopic2, a.deepdivetopic3, a.deepdivetopic4);
                        var deepdivetopic = ToArray(a.deepdivetopic0, a.deepdivetopic1, a.deepdivetopic2, a.deepdivetopic3);

                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
                        //var demonstrationanddelivery = ToArray(a.demonstrationanddelivery0, a.demonstrationanddelivery1, a.demonstrationanddelivery2, a.demonstrationanddelivery3, a.demonstrationanddelivery4, a.demonstrationanddelivery5);
                        //FDT - ATA2024
                        var demonstration = ToArray(a.demonstration0, a.demonstration1, a.demonstration2, a.demonstration3, a.demonstration4, a.demonstration5);

                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
                        //FDT - ATA2024
                        var structure = ToArray(a.structure0, a.structure1, a.structure2, a.structure3, a.structure4);
                        //FDT - ATA2024
                        var delivery = ToArray(a.delivery0, a.delivery1, a.delivery2, a.delivery3, a.delivery4, a.delivery5, a.delivery6, a.delivery7);
                        var questions = ToArray(a.questions0, a.questions1, a.questions2, a.questions3, a.questions4, a.questions5, a.questions6, a.questions7);
                        var generalimpression = ToArray(a.generalimpression0, a.generalimpression1, a.generalimpression2);

                        //FD 2021.07.27 - ATA 2021  - Add Stage1
                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                        //item.SetData(executivesummary, a.executivesummarynotes, novelty, a.noveltynotes, content, a.contentnotes, finances, a.financesnotes, deepdivetopic, a.deepdivetopicnotes, demonstrationandstructure, a.demonstrationandstructurenotes, delivery, a.deliverynotes, questions, a.questionsnotes, generalimpression, a.generalimpressionnotes, a.miscellaneous, a.miscellaneousnotes, a.presentationnotes, a.stage1);
                        //FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
                        //item.SetData(novelty, a.noveltynotes, content, a.contentnotes, finances, a.financesnotes, deepdivetopic, a.deepdivetopicnotes, demonstrationandstructure, a.demonstrationandstructurenotes, delivery, a.deliverynotes, questions, a.questionsnotes, generalimpression, a.generalimpressionnotes, a.miscellaneous, a.miscellaneousnotes, a.presentationnotes, a.stage1);
                        //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
                        //item.SetData(novelty, a.noveltynotes, content, a.contentnotes, finances, a.financesnotes, deepdivetopic, a.deepdivetopicnotes, demonstrationandstructure, a.demonstrationandstructurenotes, delivery, a.deliverynotes, questions, a.questionsnotes, generalimpression, a.generalimpressionnotes, a.miscellaneous, a.miscellaneousnotes, a.presentationnotes, a.stage1, demonstrationanddelivery, a.demonstrationanddeliverynotes);
                        item.SetData(   //novelty, a.noveltynotes,
                                        content, a.contentnotes,
                                        finances, a.financesnotes,
                                        deepdivetopic, a.deepdivetopicnotes,
                                        structure, a.structurenotes,
                                        delivery, a.deliverynotes,
                                        questions, a.questionsnotes,
                                        generalimpression, a.generalimpressionnotes,
                                        a.miscellaneous, a.miscellaneousnotes,
                                        a.presentationnotes, a.stage1,
                                        demonstration, a.demonstrationnotes,
                                        //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                                        //St2BusinnesFigures, a.St2BusinnesFiguresNotes,
                                        //FDT - ATA 2023 - eliminato Business Figures - FINE
                                        //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                                        St2FinConcept, a.St2FinConceptNotes,
                                        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                                        St2FinKPIs, a.St2FinKPIsNotes,
                                        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
                                        //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                        //St2Content, a.St2ContentNotes,
                                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                        St2DemonstrationAndDelivery, a.St2DemonstrationAndDeliveryNotes,
                                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                        //St2Investitors, a.St2InvestitorsNotes,
                                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                        a.finals
                                    );

                        item.Score = new Score()
                        {
                            Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                            Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                            //Recalculate given score
                            GivenScore = item.RecalculateTotalScore(),
                            //FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                            FinalsScore = item.RecalculateFinalsScore(),
                            UploadingExamboard = uploadingExamboard
                            //Event 2017 - Save also uploading examboard
                        };
                        ctx.ScoresPresentation.Add(item);
                    }
                }
                ctx.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        protected double[] ToArray(params double[] values)
        {
            List<double> values2Return = new List<double>();
            foreach (double value in values) {
                values2Return.Add(value);
            }
            return values2Return.ToArray();
        }

        private bool saveCost(List<Scorecost> costs, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Scorecost a in costs) {
                    var item = ctx.ScoresCost_2015.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null) {
                        //SCORE FOUND, DELETE
                        ctx.ScoresCost_2015.Remove(item);
                        ctx.Scores.Remove(
                            ctx.Scores.Where(
                                s => s.Car.Id.Equals(a.carid) &&
                                    s.Event.Id.Equals(a.eventid)
                                ).FirstOrDefault()
                            );
                    }

                    //INSERT
                    item = new ScoreCost_2015();
                    item.LowerstCost = a.LowestCost;
                    item.Accuracy = a.Accuracy;
                    item.EventDay = a.EventDay;
                    item.Notes = a.Notes;
                    item.Penalties = a.Penalties;
                    item.Presentation = a.Presentation;

                    item.TotalAchivedPoints = item.LowerstCost + item.Accuracy + item.EventDay + item.Presentation - item.Penalties;

                    item.Score = new Score() {
                        Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        UploadingExamboard = uploadingExamboard
                        //Event 2017 - Save also uploading examboard
                    };
                    ctx.ScoresCost_2015.Add(item);
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveSkidpad(List<Skidpad> skidpads, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Skidpad a in skidpads) {
                    var item = ctx.ScoresSkidPad.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null) {
                        //SCORE FOUND, DELETE
                        ctx.ScoresSkidPad.Remove(item);
                        ctx.Scores.Remove(
                            ctx.Scores.Where(
                                s => s.Car.Id.Equals(a.carid) &&
                                    s.Event.Id.Equals(a.eventid)
                                ).FirstOrDefault()
                            );
                    }

                    //INSERT
                    item = new ScoreSkidPad();
                    item.Run1NumOfCones = a.run1numofcones;
                    item.Run1Time = a.run1time;
                    item.Run1TimeAdj = a.run1timeadj;
                    item.Run2NumOfCones = a.run2numofcones;
                    item.Run2Time = a.run2time;
                    item.Run2TimeAdj = a.run2timeadj;
                    item.Run3NumOfCones = a.run3numofcones;
                    item.Run3Time = a.run3time;
                    item.Run3TimeAdj = a.run3timeadj;
                    item.Run4NumOfCones = a.run4numofcones;
                    item.Run4Time = a.run4time;
                    item.Run4TimeAdj = a.run4timeadj;

                    item.Score = new Score() {
                        Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        UploadingExamboard = uploadingExamboard
                        //Event 2017 - Save also uploading examboard
                    };
                    ctx.ScoresSkidPad.Add(item);
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveEndurance(List<Endurance> endurances, ATA_Context ctx, int uploadingExamboard)
        {
            try {
                foreach (Endurance a in endurances) {
                    var item = ctx.ScoresEndurance.Where(
                        i => i.Score.Car.Id.Equals(a.carid) &&
                            i.Score.Event.Id.Equals(a.eventid)
                            ).SingleOrDefault();

                    if (item != null) {
                        //SCORE FOUND, DELETE
                        ctx.ScoresEndurance.Remove(item);
                        ctx.Scores.Remove(
                            ctx.Scores.Where(
                                s => s.Car.Id.Equals(a.carid) &&
                                    s.Event.Id.Equals(a.eventid)
                                ).FirstOrDefault()
                            );
                    }

                    //INSERT
                    item = new ScoreEndurance();
                    item.Cone = a.cones;
                    item.Doc = a.doc;
                    item.FuelType = a.fueltype;
                    item.FuelUsed = a.fuelused;
                    item.Laps = a.laps;
                    item.Penalities = (int)a.penalities;
                    item.Time = a.time;

                    item.Score = new Score() {
                        Car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault(),
                        Event = ctx.Events.Where(e => e.Id.Equals(a.eventid)).FirstOrDefault(),
                        UploadingExamboard = uploadingExamboard
                        //Event 2017 - Save also uploading examboard
                    };
                    ctx.ScoresEndurance.Add(item);

                    //Event 2017 - Update Car Fuel Type if changed
                    Car car = ctx.Cars.Where(c => c.Id.Equals(a.carid)).FirstOrDefault();
                    if (!(car.Fuel.Id.Equals(a.fueltype))) {
                        car.Fuel = ctx.Fuels.Where(e => e.Id.Equals(a.fueltype)).FirstOrDefault(); ;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }


        #region UploadTiming
        [WebMethod]
        public string TimingUpload(TimingJsonObject timing)
        {
            try {
                if (timing != null) {
                    StringBuilder sb = new StringBuilder();

                    using (var ctx = new ATA_Context()) {
                        using (var dbContextTransaction = ctx.Database.BeginTransaction()) {
                            //ACCELERATION
                            if (timing.acceleration != null && timing.acceleration.Count > 0) {
                                saveUploadAccelerationTiming(timing.acceleration, ctx);
                            }

                            //AUTOCROSS
                            if (timing.autocross != null && timing.autocross.Count > 0) {
                                saveUploadAutocrossTiming(timing.autocross, ctx);
                            }

                            //SKIDPAD
                            if (timing.skidpad != null && timing.skidpad.Count > 0) {
                                saveUploadSkidpadTiming(timing.skidpad, ctx);
                            }

                            //ENDURANCE
                            if (timing.endurance != null && timing.endurance.Count > 0) {
                                saveUploadEnduranceTiming(timing.endurance, ctx);
                            }

                            dbContextTransaction.Commit();

                            //Recalculate scores
                            ATA_WebService ws = new ATA_WebService();
                            List<Class> classes = ws.GetClasses();
                            foreach (Class c in ctx.Classes.ToList()) {
                                //ACCELERATION
                                if (timing.acceleration != null && timing.acceleration.Count > 0) {
                                    ws.CalculateScoreAcceleration(c.Id);
                                }

                                //AUTOCROSS
                                if (timing.autocross != null && timing.autocross.Count > 0) {
                                    ws.CalculateScoreAutocross(c.Id);
                                }

                                //SKIDPAD
                                if (timing.skidpad != null && timing.skidpad.Count > 0) {
                                    ws.CalculateScoreSkidPad(c.Id);
                                }

                                //ENDURANCE
                                if (timing.endurance != null && timing.endurance.Count > 0) {
                                    ws.CalculateScoreEndurance(c.Id);
                                }
                            }
                        }

                        if ((timing.acceleration.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)
                            || (timing.skidpad.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)
                            || (timing.autocross.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)
                            || (timing.endurance.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)
                            ) {
                            sb.AppendLine("Event; CarNo.; Team; University");

                            foreach (AccelerationTiming el in timing.acceleration.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("Acceleration;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                            foreach (SkidpadTiming el in timing.skidpad.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("SkidPad;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                            foreach (AutocrossTiming el in timing.autocross.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("Autocross;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                            foreach (EnduranceTiming el in timing.endurance.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("Endurance;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                        }
                    }
                    return sb.ToString();
                }
                else {
                    return string.Empty;
                }
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return string.Empty;
            }
        }
        private bool saveUploadAccelerationTiming(List<AccelerationTiming> accelerations, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Acceleration", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (AccelerationTiming el in accelerations) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresAcceleration.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.Run1Time = el.run1time;
                            item.Run2Time = el.run2time;
                            item.Run3Time = el.run3time;
                            item.Run4Time = el.run4time;

                            //item.CalculateAdjTimes();
                            //item.CalculateBestTime();
                        }
                        else {
                            //Insert
                            item = new ScoreAcceleration();
                            item.Run1Time = el.run1time;
                            item.Run2Time = el.run2time;
                            item.Run3Time = el.run3time;
                            item.Run4Time = el.run4time;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            //item.CalculateAdjTimes();
                            //item.CalculateBestTime();

                            ctx.ScoresAcceleration.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveUploadSkidpadTiming(List<SkidpadTiming> skidpads, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Skid Pad", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (SkidpadTiming el in skidpads) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresSkidPad.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.Run1Time = el.run1time;
                            item.Run2Time = el.run2time;
                            item.Run3Time = el.run3time;
                            item.Run4Time = el.run4time;

                            //item.CalculateAdjTimes();
                            //item.CalculateBestTime();
                        }
                        else {
                            //Insert
                            item = new ScoreSkidPad();
                            item.Run1Time = el.run1time;
                            item.Run2Time = el.run2time;
                            item.Run3Time = el.run3time;
                            item.Run4Time = el.run4time;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            //item.CalculateAdjTimes();
                            //item.CalculateBestTime();

                            ctx.ScoresSkidPad.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveUploadAutocrossTiming(List<AutocrossTiming> autocrosses, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Autocross", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (AutocrossTiming el in autocrosses) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresAutoCross.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.Run1Time = el.run1time;
                            item.Run2Time = el.run2time;
                            item.Run3Time = el.run3time;
                            item.Run4Time = el.run4time;
                        }
                        else {
                            //Insert
                            item = new ScoreAutoCross();
                            item.Run1Time = el.run1time;
                            item.Run2Time = el.run2time;
                            item.Run3Time = el.run3time;
                            item.Run4Time = el.run4time;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            ctx.ScoresAutoCross.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveUploadEnduranceTiming(List<EnduranceTiming> endurances, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Endurance", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (EnduranceTiming el in endurances) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresEndurance.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.Time = el.time;
                            item.Laps = el.laps;
                        }
                        else {
                            //Insert
                            item = new ScoreEndurance();
                            item.Time = el.time;
                            item.Laps = el.laps;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            ctx.ScoresEndurance.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private int getEventTypeIdByName(string eName, ATA_Context ctx)
        {
            int eId = -1;

            try {
                EventName evtName = ctx.EventNames.Where(e => e.Name.Contains(eName)).FirstOrDefault();

                if (evtName != null) {
                    Event evt = ctx.Events.Where(e => e.EventName.Id.Equals(evtName.Id)).FirstOrDefault();
                    if (evt != null) {
                        eId = evt.Id;
                    }
                }
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                throw;
            }

            return eId;
        }
        #endregion

        #region UploadFuelConsumption
        [WebMethod]
        public string FuelConsumptionUpload(FuelConsumptionJsonObject fuelConsumption)
        {
            try {
                if (fuelConsumption != null) {
                    StringBuilder sb = new StringBuilder();

                    using (var ctx = new ATA_Context()) {
                        using (var dbContextTransaction = ctx.Database.BeginTransaction()) {
                            //ENDURANCE
                            if (fuelConsumption.endurance != null && fuelConsumption.endurance.Count > 0) {
                                saveUploadEnduranceFuelConsumption(fuelConsumption.endurance, ctx);
                            }

                            dbContextTransaction.Commit();

                            //Recalculate scores
                            ATA_WebService ws = new ATA_WebService();
                            List<Class> classes = ws.GetClasses();
                            foreach (Class c in ctx.Classes.ToList()) {
                                if (fuelConsumption.endurance != null && fuelConsumption.endurance.Count > 0) {
                                    ws.CalculateScoreEndurance(c.Id);
                                }
                            }
                        }

                        if ((fuelConsumption.endurance.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)) {
                            sb.AppendLine("Event; CarNo.; Team; University");

                            foreach (EnduranceFuelConsumption el in fuelConsumption.endurance.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("Endurance;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                        }
                    }
                    return sb.ToString();

                }
                else {
                    return string.Empty;
                }
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return string.Empty;
            }
        }

        private bool saveUploadEnduranceFuelConsumption(List<EnduranceFuelConsumption> endurances, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Endurance", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (EnduranceFuelConsumption el in endurances) {
                    int fuelId = getFuelTypeIdByName(el.fuelType, ctx);

                    //Fuel type not found, cannot proceed
                    if (fuelId.Equals(-1)) {
                        return false;
                    }

                    Fuel fuel = ctx.Fuels.Where(e => e.Id.Equals(fuelId)).FirstOrDefault();

                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresEndurance.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.FuelUsed = el.fuelConsumption;
                            item.FuelType = fuelId;
                        }
                        else {
                            //Insert
                            item = new ScoreEndurance();
                            item.FuelUsed = el.fuelConsumption;
                            item.FuelType = fuelId;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            ctx.ScoresEndurance.Add(item);
                        }

                        //Event 2017 - Update Car Fuel Type if changed
                        if (!(car.Fuel.Id.Equals(fuelId))) {
                            car.Fuel = fuel;
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private int getFuelTypeIdByName(string fName, ATA_Context ctx)
        {
            int fId = -1;

            try {
                Fuel fuel = ctx.Fuels.Where(e => e.Name.Contains(fName)).FirstOrDefault();

                if (fuel != null) {
                    fId = fuel.Id;
                }
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                throw;
            }

            return fId;
        }
        #endregion

        //Event 2017 - new upload added
        #region UploadCost
        [WebMethod]
        public string CostUpload(CostJsonObject cost)
        {
            try {
                if (cost != null) {
                    StringBuilder sb = new StringBuilder();

                    using (var ctx = new ATA_Context()) {
                        using (var dbContextTransaction = ctx.Database.BeginTransaction()) {
                            //Endurance
                            if (cost.costs.Count > 0) {
                                saveUploadCosts(cost.costs, ctx);
                            }

                            dbContextTransaction.Commit();

                            //Recalculate scores
                            ATA_WebService ws = new ATA_WebService();
                            List<Class> classes = ws.GetClasses();
                            foreach (Class c in ctx.Classes.ToList()) {
                                if (cost.costs.Count > 0) {
                                    ws.CalculateScoreCost2015(c.Id);
                                }
                            }
                        }
                    }

                    if ((cost.costs.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)) {
                        sb.AppendLine("Event; CarNo.; Team; University");

                        foreach (Cost el in cost.costs.Where(a => a.hasBeenFound.Equals(false))) {
                            sb.AppendLine("Cost;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                        }
                    }
                    return sb.ToString();
                }
                else {
                    return string.Empty;
                }
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return string.Empty;
            }
        }
        private bool saveUploadCosts(List<Cost> costs, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Cost", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (Cost el in costs) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresCost_2015.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.LowerstCost = el.lowestcost;
                            item.TotalAchivedPoints = item.LowerstCost + item.Accuracy + item.EventDay + item.Presentation - item.Penalties;
                        }
                        else {
                            //Insert
                            item = new ScoreCost_2015();
                            item.LowerstCost = el.lowestcost;
                            item.TotalAchivedPoints = item.LowerstCost + item.Accuracy + item.EventDay + item.Presentation - item.Penalties;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            ctx.ScoresCost_2015.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        //Event 2018 - new upload added
        #region UploadPenalties
        [WebMethod]
        public string DynamicPenaltiesUpload(DynamicPenaltiesJsonObject dynamicpenalties)
        {
            try {
                if (dynamicpenalties != null) {
                    StringBuilder sb = new StringBuilder();

                    using (var ctx = new ATA_Context()) {
                        using (var dbContextTransaction = ctx.Database.BeginTransaction()) {
                            //AUTOCROSS
                            if (dynamicpenalties.autocross != null && dynamicpenalties.autocross.Count > 0) {
                                saveUploadAutocrossPenalties(dynamicpenalties.autocross, ctx);
                            }

                            //SKIDPAD
                            if (dynamicpenalties.skidpad != null && dynamicpenalties.skidpad.Count > 0) {
                                saveUploadSkidpadPenalties(dynamicpenalties.skidpad, ctx);
                            }

                            //ENDURANCE
                            if (dynamicpenalties.endurance != null && dynamicpenalties.endurance.Count > 0) {
                                saveUploadEndurancePenalties(dynamicpenalties.endurance, ctx);
                            }

                            dbContextTransaction.Commit();

                            //Recalculate scores
                            ATA_WebService ws = new ATA_WebService();
                            List<Class> classes = ws.GetClasses();
                            foreach (Class c in ctx.Classes.ToList()) {
                                //AUTOCROSS
                                if (dynamicpenalties.autocross != null && dynamicpenalties.autocross.Count > 0) {
                                    ws.CalculateScoreAutocross(c.Id);
                                }

                                //SKIDPAD
                                if (dynamicpenalties.skidpad != null && dynamicpenalties.skidpad.Count > 0) {
                                    ws.CalculateScoreSkidPad(c.Id);
                                }

                                //ENDURANCE
                                if (dynamicpenalties.endurance != null && dynamicpenalties.endurance.Count > 0) {
                                    ws.CalculateScoreEndurance(c.Id);
                                }
                            }
                        }

                        if ((dynamicpenalties.skidpad.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)
                            || (dynamicpenalties.autocross.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)
                            || (dynamicpenalties.endurance.Where(a => a.hasBeenFound.Equals(false)).Count() > 0)
                            ) {
                            sb.AppendLine("Event; CarNo.; Team; University");

                            foreach (SkidPadPenalties el in dynamicpenalties.skidpad.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("SkidPad;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                            foreach (AutocrossPenalties el in dynamicpenalties.autocross.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("Autocross;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                            foreach (EndurancePenalties el in dynamicpenalties.endurance.Where(a => a.hasBeenFound.Equals(false))) {
                                sb.AppendLine("Endurance;" + el.carno.ToString() + ";" + el.teamname.ToString() + ";" + el.university.ToString());
                            }
                        }
                    }
                    return sb.ToString();
                }
                else {
                    return string.Empty;
                }
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return string.Empty;
            }
        }
        private bool saveUploadSkidpadPenalties(List<SkidPadPenalties> skidpads, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Skid Pad", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (SkidPadPenalties el in skidpads) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresSkidPad.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.Run1NumOfCones = el.run1numofcones;
                            item.Run2NumOfCones = el.run2numofcones;
                            item.Run3NumOfCones = el.run3numofcones;
                            item.Run4NumOfCones = el.run4numofcones;

                            //item.CalculateAdjTimes();
                            //item.CalculateBestTime();
                        }
                        else {
                            //Insert
                            item = new ScoreSkidPad();
                            item.Run1NumOfCones = el.run1numofcones;
                            item.Run2NumOfCones = el.run2numofcones;
                            item.Run3NumOfCones = el.run3numofcones;
                            item.Run4NumOfCones = el.run4numofcones;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            //item.CalculateAdjTimes();
                            //item.CalculateBestTime();

                            ctx.ScoresSkidPad.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveUploadAutocrossPenalties(List<AutocrossPenalties> autocrosses, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Autocross", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (AutocrossPenalties el in autocrosses) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresAutoCross.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.Run1NumOfCones = el.run1numofcones;
                            item.Run1Doc = el.run1doc;
                            item.Run2NumOfCones = el.run2numofcones;
                            item.Run2Doc = el.run2doc;
                            item.Run3NumOfCones = el.run3numofcones;
                            item.Run3Doc = el.run3doc;
                            item.Run4NumOfCones = el.run4numofcones;
                            item.Run4Doc = el.run4doc;
                        }
                        else {
                            //Insert
                            item = new ScoreAutoCross();
                            item.Run1NumOfCones = el.run1numofcones;
                            item.Run1Doc = el.run1doc;
                            item.Run2NumOfCones = el.run2numofcones;
                            item.Run2Doc = el.run2doc;
                            item.Run3NumOfCones = el.run3numofcones;
                            item.Run3Doc = el.run3doc;
                            item.Run4NumOfCones = el.run4numofcones;
                            item.Run4Doc = el.run4doc;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            ctx.ScoresAutoCross.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        private bool saveUploadEndurancePenalties(List<EndurancePenalties> endurances, ATA_Context ctx)
        {
            try {
                int eventId = getEventTypeIdByName("Endurance", ctx);

                //Event not found, cannot proceed
                if (eventId.Equals(-1)) {
                    return false;
                }

                Event evt = ctx.Events.Where(e => e.Id.Equals(eventId)).FirstOrDefault();

                foreach (EndurancePenalties el in endurances) {
                    Car car = ctx.Cars.Where(c => c.Carno.Equals(el.carno)).FirstOrDefault();

                    if (car != null) {
                        var item = ctx.ScoresEndurance.Where(
                            i => i.Score.Car.Carno.Equals(el.carno) &&
                                i.Score.Event.Id.Equals(eventId)
                                ).SingleOrDefault();

                        if (item != null) {
                            //Score found, update
                            item.Cone = el.numofcones;
                            item.Doc = el.doc;
                        }
                        else {
                            //Insert
                            item = new ScoreEndurance();
                            item.Cone = el.numofcones;
                            item.Doc = el.doc;
                            item.Score = new Score() {
                                Car = car,
                                Event = evt
                            };

                            ctx.ScoresEndurance.Add(item);
                        }
                    }
                    else {
                        el.hasBeenFound = false;
                    }
                }
                ctx.SaveChanges();

                return true;
            }
            catch (Exception ex) {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion
    }
}
