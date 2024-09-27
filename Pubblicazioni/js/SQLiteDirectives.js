// DATABASE --------------------------------------------------------------------------------------------------------------
//Open database
//FDT ATA 2024 - non è più supportato
var db = openDatabase("FormulaATA", "2.0", "Formula ATA", 2 * 1024 * 1024);  // Open SQLite Database
//var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});

//var db 
//= window.sqlitePlugin.openDatabase({ name: 'FormulaATA', location: 'default' });

var dbCurrentVersion = "6.0";

var dataset;
var DataType;

var dataset_versions;
var dataset_fuels;
var dataset_classes;
var dataset_cars;
var dataset_teams;
var dataset_examiners;
var dataset_examboards;
var dataset_examboards2examiners;
var dataset_examboards2cars;

var dataset_eventstypes;
var dataset_eventsnames;
var dataset_events;

var dataset_scores_cars_classes;
var dataset_scores_bycar;
var dataset_scores_design1E;
var dataset_scores_design1C3;
var dataset_scores_presentation;
var dataset_scores_Cost;
var dataset_scores_acceleration;
var dataset_scores_skidpad;
var dataset_scores_autocross;
var dataset_scores_endurance;

var dataset_examboards_login;

//
// SQL DIRECTIVES - Create and Drop TABLES -------------------------------------------------------------------------------
//
var createStatement_versions = "CREATE TABLE IF NOT EXISTS TB_Versions (id INTEGER PRIMARY KEY AUTOINCREMENT, version TEXT, versiondate TEXT)";
var dropStatement_versions = "DROP TABLE IF EXISTS TB_Versions";
//
var createStatement_fuels = "CREATE TABLE IF NOT EXISTS TB_Fuels (id INTEGER PRIMARY KEY AUTOINCREMENT, fuelname TEXT)";
var dropStatement_fuels = "DROP TABLE IF EXISTS TB_Fuels";
//
var createStatement_classes = "CREATE TABLE IF NOT EXISTS TB_Classes (id INTEGER PRIMARY KEY AUTOINCREMENT, classname TEXT)";
var dropStatement_classes = "DROP TABLE IF EXISTS TB_Classes";
//
var createStatement_cars = "CREATE TABLE IF NOT EXISTS TB_Cars (id INTEGER PRIMARY KEY AUTOINCREMENT, carno INTEGER, regno INTEGER, teamid INTEGER, classid INTEGER, fuelid INTEGER, deliverydocdate DATETIME, boxno INTEGER)";
var dropStatement_cars = "DROP TABLE IF EXISTS TB_Cars";
//
var createStatement_teams = "CREATE TABLE IF NOT EXISTS TB_Teams (id INTEGER PRIMARY KEY AUTOINCREMENT, teamname TEXT, university TEXT, country TEXT)";
var dropStatement_teams = "DROP TABLE IF EXISTS TB_Teams";
//
var createStatement_examiners = "CREATE TABLE IF NOT EXISTS TB_Examiners (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, surname TEXT, phone TEXT)";
var dropStatement_examiners = "DROP TABLE IF EXISTS TB_Examiners";
//
//AF - Giu 2016 - Examboard is connected to a single Event
var createStatement_examboards = "CREATE TABLE IF NOT EXISTS TB_ExamBoards (id INTEGER PRIMARY KEY AUTOINCREMENT, examboardname TEXT, description TEXT, color TEXT, usecolor INTEGER, eventid INTEGER)";
var dropStatement_examboards = "DROP TABLE IF EXISTS TB_ExamBoards";
//
var createStatement_examboards2examiners = "CREATE TABLE IF NOT EXISTS TB_ExamBoards2Examiners (examboardid INTEGER, examinerid INTEGER, UNIQUE(examboardid, examinerid));";
var dropStatement_examboards2examiners = "DROP TABLE IF EXISTS TB_ExamBoards2Examiners";
//
var createStatement_examboards2cars = "CREATE TABLE IF NOT EXISTS TB_ExamBoards2Cars (examboardid INTEGER, carid INTEGER, UNIQUE(examboardid, carid));";
var dropStatement_examboards2cars = "DROP TABLE IF EXISTS TB_Examboards2cars";
//
var createStatement_eventstypes = "CREATE TABLE IF NOT EXISTS TB_EventsTypes (id INTEGER PRIMARY KEY AUTOINCREMENT, eventtypename TEXT)";
var dropStatement_eventstypes = "DROP TABLE IF EXISTS TB_EventsTypes";
//
var createStatement_eventsnames = "CREATE TABLE IF NOT EXISTS TB_EventsNames (id INTEGER PRIMARY KEY AUTOINCREMENT, eventname TEXT, eventtypeid INTEGER)";
var dropStatement_eventsnames = "DROP TABLE IF EXISTS TB_EventsNames";
//
var createStatement_events = "CREATE TABLE IF NOT EXISTS TB_Events (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, eventnameid INTEGER, eventtypeid INTEGER, scoretypenumeric INTEGER, maximumscore DOUBLE(4,4))";
var dropStatement_events = "DROP TABLE IF EXISTS TB_Events";
//
var createStatement_scores = "CREATE TABLE IF NOT EXISTS TB_Scores (id INTEGER PRIMARY KEY AUTOINCREMENT, eventid INTEGER, carid INTEGER, score DOUBLE(4,4), penalityscore DOUBLE(4,4), penalitynotes STRING, correctedscore DOUBLE(4,4));";
var dropStatement_scores = "DROP TABLE IF EXISTS TB_Scores";
//
var createStatement_scores_design1E = "CREATE TABLE IF NOT EXISTS TB_Scores_Design1E  (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreid INTEGER, suspension DOUBLE(4,4), framebodyaero DOUBLE(4,4), tractivedriverecoverysystem DOUBLE(4,4), cockpitcontrolsbrakessafety DOUBLE(4,4), systemmanagementintegration DOUBLE(4,4), manufacturabilityserviceability DOUBLE(4,4), aestheticsstyle DOUBLE(4,4), creativity DOUBLE(4,4), carweight DOUBLE(4,4), suspensionnotes STRING, framebodyaeronotes STRING, tractivedriverecoverysystemnotes STRING, cockpitcontrolsbrakessafetynotes STRING, systemmanagementintegrationnotes STRING, manufacturabilityserviceabilitynotes STRING, aestheticsstylenotes STRING, creativitynotes STRING, miscellaneous DOUBLE(4,4), miscellaneousnotes STRING, FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE);";
var dropStatement_scores_design1E = "DROP TABLE IF EXISTS TB_Scores_Design1E";
//
var createStatement_scores_design1C3 = "CREATE TABLE IF NOT EXISTS TB_Scores_Design1C3 (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreid INTEGER, suspension DOUBLE(4,4), framebodyaero DOUBLE(4,4), powertrain DOUBLE(4,4), cockpitcontrolsbrakessafety DOUBLE(4,4), systemmanagementintegration DOUBLE(4,4), manufacturabilityserviceability DOUBLE(4,4), aestheticsstyle DOUBLE(4,4), creativity DOUBLE(4,4), carweight DOUBLE(4,4), suspensionnotes STRING, framebodyaeronotes STRING, powertrainnotes STRING, cockpitcontrolsbrakessafetynotes STRING, systemmanagementintegrationnotes STRING, manufacturabilityserviceabilitynotes STRING, aestheticsstylenotes STRING, creativitynotes STRING, miscellaneous DOUBLE(4,4), miscellaneousnotes STRING, FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE);";
var dropStatement_scores_design1C3 = "DROP TABLE IF EXISTS TB_Scores_Design1CE";

//FDT - ATA2023 - modifiche Stage3
//Event 2019 - Presentation Event has been changed
var createStatement_scores_presentation = "CREATE TABLE IF NOT EXISTS TB_Scores_Presentation (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreid INTEGER, ";
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
//createStatement_scores_presentation += "novelty0 DOUBLE, novelty1 DOUBLE, novelty2 DOUBLE, noveltynotes STRING, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
//createStatement_scores_presentation += "content0 DOUBLE, content1 DOUBLE, content2 DOUBLE, content3 DOUBLE, content4 DOUBLE, content5 DOUBLE, content6 DOUBLE, content7 DOUBLE, content8 DOUBLE, content9 DOUBLE, contentnotes STRING, ";
//FDT - ATA2024
createStatement_scores_presentation += "content0 DOUBLE, content1 DOUBLE, content2 DOUBLE, content3 DOUBLE, content4 DOUBLE, content5 DOUBLE, content6 DOUBLE, contentnotes STRING, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
createStatement_scores_presentation += "finances0 DOUBLE, finances1 DOUBLE, finances2 DOUBLE, finances3 DOUBLE, finances4 DOUBLE, finances5 DOUBLE, finances6 DOUBLE, finances7 DOUBLE, finances8 DOUBLE, finances9 DOUBLE, finances10 DOUBLE, finances11 DOUBLE, financesnotes STRING, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
//createStatement_scores_presentation += "deepdivetopic0 DOUBLE, deepdivetopic1 DOUBLE, deepdivetopic2 DOUBLE, deepdivetopic3 DOUBLE, deepdivetopic4 DOUBLE, deepdivetopicnotes STRING, ";
createStatement_scores_presentation += "deepdivetopic0 DOUBLE, deepdivetopic1 DOUBLE, deepdivetopic2 DOUBLE,deepdivetopic3 DOUBLE, deepdivetopicnotes STRING, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
//createStatement_scores_presentation += "demonstrationanddelivery0 DOUBLE, demonstrationanddelivery1 DOUBLE, demonstrationanddelivery2 DOUBLE, demonstrationanddelivery3 DOUBLE, demonstrationanddelivery4 DOUBLE, demonstrationanddelivery5 DOUBLE, demonstrationanddeliverynotes STRING, ";
//FDT - ATA2024
createStatement_scores_presentation += "demonstration0 DOUBLE, demonstration1 DOUBLE, demonstration2 DOUBLE, demonstration3 DOUBLE, demonstration4 DOUBLE, demonstration5 DOUBLE, demonstrationnotes STRING, ";
//FDT - ATA2024
createStatement_scores_presentation += "structure0 DOUBLE, structure1 DOUBLE, structure2 DOUBLE, structure3 DOUBLE, structure4 DOUBLE, structurenotes STRING, ";
//FDT - ATA2024
createStatement_scores_presentation += "delivery0 DOUBLE, delivery1 DOUBLE, delivery2 DOUBLE, delivery3 DOUBLE, delivery4 DOUBLE, delivery5 DOUBLE, delivery6 DOUBLE, delivery7 DOUBLE, deliverynotes STRING, ";
createStatement_scores_presentation += "questions0 DOUBLE, questions1 DOUBLE, questions2 DOUBLE, questions3 DOUBLE, questions4 DOUBLE, questions5 DOUBLE, questions6 DOUBLE, questions7 DOUBLE, questionsnotes STRING, ";

createStatement_scores_presentation += "generalimpression0 DOUBLE, generalimpression1 DOUBLE, generalimpression2 DOUBLE, generalimpressionnotes STRING, ";

createStatement_scores_presentation += "miscellaneous DOUBLE, miscellaneousnotes STRING, ";

//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
//FDT - ATA 2022 - modify Stage 2
//createStatement_scores_presentation += "st2businnesfigures0 DOUBLE, st2businnesfigures1 DOUBLE, st2businnesfigures2 DOUBLE, st2businnesfigures3 DOUBLE, st2businnesfigures4 DOUBLE, st2businnesfiguresnotes STRING, ";
//FDT - ATA 2023 - eliminato Business Figures - INIZIO
//createStatement_scores_presentation += "st2businnesfigures0 DOUBLE, st2businnesfigures1 DOUBLE, st2businnesfigures2 DOUBLE, st2businnesfigures3 DOUBLE, st2businnesfiguresnotes STRING, ";
//FDT - ATA 2023 - eliminato Business Figures - FINE
//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
createStatement_scores_presentation += "st2finconcept0 DOUBLE, st2finconcept1 DOUBLE, st2finconcept2 DOUBLE, st2finconcept3 DOUBLE, st2finconcept4 DOUBLE, st2finconcept5 DOUBLE, st2finconcept6 DOUBLE, st2finconcept7 DOUBLE, st2finconcept8 DOUBLE, st2finconcept9 DOUBLE,  st2finconceptnotes STRING, ";
//FDT - ATA 2023 - aggiunto Financial Concept - FINE
//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
createStatement_scores_presentation += "st2finkpis0 DOUBLE, st2finkpis1 DOUBLE, st2finkpis2 DOUBLE, st2finkpis3 DOUBLE, st2finkpis4 DOUBLE, st2finkpisnotes STRING, ";
//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//createStatement_scores_presentation += "st2content0 DOUBLE, st2content1 DOUBLE, st2content2 DOUBLE, st2content3 DOUBLE, st2content4 DOUBLE, st2contentnotes STRING, ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE
createStatement_scores_presentation += "st2demonstrationanddelivery0 DOUBLE, st2demonstrationanddelivery1 DOUBLE, st2demonstrationanddelivery2 DOUBLE, st2demonstrationanddelivery3 DOUBLE, st2demonstrationanddelivery4 DOUBLE, st2demonstrationanddeliverynotes STRING, ";
//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//FDT - ATA 2022 - modify Stage 2
//createStatement_scores_presentation += "st2investitors0 DOUBLE, st2investitors1 DOUBLE, st2investitors2 DOUBLE, st2investitors3 DOUBLE, st2investitorsnotes STRING, ";
//createStatement_scores_presentation += "st2investitors0 DOUBLE, st2investitors1 DOUBLE, st2investitors2 DOUBLE, st2investitorsnotes STRING, ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE
//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

//FD 2021.07.27 - ATA 2021  - Add Stage1
//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
//createStatement_scores_presentation += "presentationnotes STRING, stage1 DOUBLE, FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE)";
createStatement_scores_presentation += "presentationnotes STRING, stage1 DOUBLE, finals DOUBLE, FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE)";

var dropStatement_scores_presentation = "DROP TABLE IF EXISTS TB_Scores_Presentation";
//
var createStatement_scoresCost = "CREATE TABLE IF NOT EXISTS TB_Scores_Cost_2015 (id INTEGER PRIMARY KEY AUTOINCREMENT,LowestCost DOUBLE(4,4), Accuracy DOUBLE(4,4) ,EventDay DOUBLE(4,4),Presentation DOUBLE(4,4),Penalties DOUBLE(4,4),TotalAchivedPoints DOUBLE(4,4), NormalizedScore DOUBLE(4,4), Notes STRING, scoreid INTEGER, FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE);";
var dropStatement_scoresCost = "DROP TABLE IF EXISTS TB_Scores_Cost_2015";
//
var createStatement_scores_acceleration = "CREATE TABLE IF NOT EXISTS TB_Scores_Acceleration (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreid INTEGER, run1time DOUBLE(4,4), run1numofcones INTEGER, run1timeadj DOUBLE(4,4),	run2time DOUBLE(4,4), run2numofcones INTEGER, run2timeadj DOUBLE(4,4), run3time DOUBLE(4,4), run3numofcones INTEGER, run3timeadj DOUBLE(4,4), run4time DOUBLE(4,4), run4numofcones INTEGER, run4timeadj DOUBLE(4,4), FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE);";
var dropStatement_scores_acceleration = "DROP TABLE IF EXISTS TB_Scores_Acceleration";
//
var createStatement_scores_skidpad = "CREATE TABLE IF NOT EXISTS TB_Scores_SkidPad (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreid INTEGER, run1time DOUBLE(4,4), run1numofcones INTEGER, run1timeadj DOUBLE(4,4),	run2time DOUBLE(4,4), run2numofcones INTEGER, run2timeadj DOUBLE(4,4), run3time DOUBLE(4,4), run3numofcones INTEGER, run3timeadj DOUBLE(4,4), run4time DOUBLE(4,4), run4numofcones INTEGER, run4timeadj DOUBLE(4,4), FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE);";
var dropStatement_scores_skidpad = "DROP TABLE IF EXISTS TB_Scores_SkidPad";
//
var createStatement_scores_autocross = "CREATE TABLE IF NOT EXISTS TB_Scores_AutoCross (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreid INTEGER, run1time DOUBLE(4,4), run1numofcones INTEGER, run1doc INTEGER, run1timeadj DOUBLE(4,4), run2time DOUBLE(4,4), run2numofcones INTEGER, run2doc INTEGER, run2timeadj DOUBLE(4,4), run3time DOUBLE(4,4), run3numofcones INTEGER, run3doc INTEGER, run3timeadj DOUBLE(4,4), run4time DOUBLE(4,4), run4numofcones INTEGER, run4doc INTEGER, run4timeadj DOUBLE(4,4), FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE);";
var dropStatement_scores_autocross = "DROP TABLE IF EXISTS TB_Scores_AutoCross";
//
var createStatement_scores_endurance = "CREATE TABLE IF NOT EXISTS TB_Scores_Endurance (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreid INTEGER, time DOUBLE(4,4), laps INTEGER, penalities INTEGER, cones INTEGER, doc INTEGER, fuelused DOUBLE(4,4), fueltype INTEGER, FOREIGN KEY (scoreid) REFERENCES TB_Scores(id) ON DELETE CASCADE);";
var dropStatement_scores_endurance = "DROP TABLE IF EXISTS TB_Scores_Endurance";

//
// SQL DIRECTIVES - Create and Drop VIEWS --------------------------------------------------------------------------------
//
//Elenco dati vetture (tutte)
var createStatementView_cars = "CREATE VIEW IF NOT EXISTS VW_Cars AS SELECT TB_Cars.id, carno, regno, TB_Teams.id AS teamid, teamname, university, country, classid, classname, fuelid, fuelname, deliverydocdate, boxno FROM TB_Cars INNER JOIN TB_Classes ON TB_Cars.classid = TB_Classes.id INNER JOIN TB_Fuels ON TB_Cars.fuelid = TB_Fuels.id INNER JOIN TB_Teams ON TB_Cars.teamid = TB_Teams.id";
var dropStatementView_cars = "DROP VIEW IF EXISTS VW_Cars";
//
//Elenco dati esaminatori per commissione esaminatrice
//AF - Giu 2016 - Examboard is connected to a single Event
//var createStatementView_examboards2examiners = "CREATE VIEW IF NOT EXISTS VW_ExamBoards2Examiners AS SELECT TB_ExamBoards.id AS examboardid, TB_ExamBoards.examboardname, TB_ExamBoards.description, TB_ExamBoards.usecolor, TB_ExamBoards.color, IFNULL(TB_ExamBoards.eventid, -1) eventid, IFNULL(TB_Examiners.id, -1) examinerid, IFNULL (TB_Examiners.firstname,'')  firstname, IFNULL(TB_Examiners.surname, '') surname FROM TB_ExamBoards LEFT JOIN TB_ExamBoards2Examiners ON TB_ExamBoards.id = TB_ExamBoards2Examiners.examboardid LEFT JOIN TB_Examiners ON TB_Examiners.id = TB_ExamBoards2Examiners.examinerid";
var createStatementView_examboards2examiners = "CREATE VIEW IF NOT EXISTS VW_ExamBoards2Examiners AS SELECT TB_ExamBoards.id AS examboardid, TB_ExamBoards.examboardname, TB_ExamBoards.description, TB_ExamBoards.usecolor, TB_ExamBoards.color, IFNULL(TB_ExamBoards.eventid, -1) eventid, IFNULL(TB_Examiners.id, -1) examinerid, IFNULL (TB_Examiners.firstname,'')  firstname, IFNULL(TB_Examiners.surname, '') surname, IFNULL(TB_EventsNames.eventname, '') eventname FROM TB_ExamBoards LEFT JOIN TB_ExamBoards2Examiners ON TB_ExamBoards.id = TB_ExamBoards2Examiners.examboardid LEFT JOIN TB_Examiners ON TB_Examiners.id = TB_ExamBoards2Examiners.examinerid LEFT JOIN TB_Events ON TB_Examboards.eventid = TB_Events.id LEFT JOIN TB_EventsNames ON TB_EventsNames.id = TB_Events.eventnameid";
var dropStatementView_examboards2examiners = "DROP VIEW IF EXISTS VW_ExamBoards2Examiners";
//
//Elenco dati vetture per commissione esaminatrice
//AF - Giu 2016 - Examboard is connected to a single Event
var createStatementView_examboards2cars = "CREATE VIEW IF NOT EXISTS VW_Examboards2Cars AS SELECT TB_ExamBoards.id AS examboardid, TB_ExamBoards.examboardname, TB_ExamBoards.description, TB_ExamBoards.usecolor, TB_ExamBoards.color, IFNULL(TB_ExamBoards.eventid, -1) eventid,";
createStatementView_examboards2cars += " IFNULL(TB_Examboards2cars.carid, -1) carid, IFNULL (VW_Cars.carno,'') carno, IFNULL (VW_Cars.regno,'') regno, IFNULL(VW_Cars.teamid, '') teamid, IFNULL(VW_Cars.teamname, '') teamname, IFNULL(VW_Cars.university, '') university, IFNULL(VW_Cars.country, '') country,";
createStatementView_examboards2cars += " IFNULL(VW_Cars.classid, '') classid, IFNULL(VW_Cars.classname, '') classname, IFNULL(VW_Cars.fuelid, '') fuelid, IFNULL(VW_Cars.fuelname, '') fuelname,IFNULL(VW_Cars.deliverydocdate, '') deliverydocdate, IFNULL(VW_Cars.boxno, '') boxno";
createStatementView_examboards2cars += " FROM TB_ExamBoards LEFT JOIN TB_ExamBoards2Cars ON TB_ExamBoards.id = TB_ExamBoards2Cars.examboardid LEFT JOIN VW_Cars on TB_ExamBoards2Cars.carid = VW_Cars.id";
var dropStatementView_examboards2cars = "DROP VIEW IF EXISTS VW_ExamBoards2Cars";
//
//Elenco eventi con dettagli
var createStatementView_events = "CREATE VIEW IF NOT EXISTS VW_Events AS SELECT TB_Events.id, description, TB_Events.eventnameid, TB_EventsNames.eventname, TB_Events.eventtypeid, TB_EventsTypes.eventtypename, scoretypenumeric, maximumscore FROM TB_Events INNER JOIN TB_EventsNames ON TB_Events.eventnameid = TB_EventsNames.id INNER JOIN TB_EventsTypes ON TB_Events.eventtypeid = TB_EventsTypes.id";
var dropStatementView_events = "DROP VIEW IF EXISTS VW_Events";
//
//Event 2018 - Show partials scores for Presentation and Design
var createStatementView_scores_partial_design1E = "CREATE VIEW IF NOT EXISTS VW_Scores_Partial_Design1E AS ";
createStatementView_scores_partial_design1E += " SELECT scoreid, IFNULL(suspension, 0) suspension, IFNULL(framebodyaero, 0) framebodyaero,";
createStatementView_scores_partial_design1E += " IFNULL(tractivedriverecoverysystem, 0) tractivedriverecoverysystem, IFNULL(cockpitcontrolsbrakessafety, 0) cockpitcontrolsbrakessafety,";
createStatementView_scores_partial_design1E += " IFNULL(systemmanagementintegration, 0) systemmanagementintegration, IFNULL(manufacturabilityserviceability, 0) manufacturabilityserviceability,";
createStatementView_scores_partial_design1E += " IFNULL(aestheticsstyle, 0) aestheticsstyle, IFNULL(creativity, 0) creativity, IFNULL(miscellaneous, 0) miscellaneous";
createStatementView_scores_partial_design1E += " FROM TB_Scores LEFT JOIN TB_Scores_Design1E ON TB_Scores.Id = TB_Scores_Design1E.scoreid WHERE TB_Scores.Id";
var dropStatementView_scores_partial_design1E = "DROP VIEW IF EXISTS VW_Scores_Partial_Design1E";
//
var createStatementView_scores_partial_design1C3 = "CREATE VIEW IF NOT EXISTS VW_Scores_Partial_Design1C3 AS ";
createStatementView_scores_partial_design1C3 += " SELECT scoreid, IFNULL(suspension, 0) suspension, IFNULL(framebodyaero, 0) framebodyaero,";
createStatementView_scores_partial_design1C3 += " IFNULL(powertrain, 0) powertrain, IFNULL(cockpitcontrolsbrakessafety, 0) cockpitcontrolsbrakessafety,";
createStatementView_scores_partial_design1C3 += " IFNULL(systemmanagementintegration, 0) systemmanagementintegration, IFNULL(manufacturabilityserviceability, 0) manufacturabilityserviceability,";
createStatementView_scores_partial_design1C3 += " IFNULL(aestheticsstyle, 0) aestheticsstyle, IFNULL(creativity, 0) creativity, IFNULL(miscellaneous, 0) miscellaneous";
createStatementView_scores_partial_design1C3 += " FROM TB_Scores LEFT JOIN TB_Scores_Design1C3 ON TB_Scores.Id = TB_Scores_Design1C3.scoreid WHERE TB_Scores.Id";
var dropStatementView_scores_partial_design1C3 = "DROP VIEW IF EXISTS VW_Scores_Partial_Design1C3";
//
//Event 2019 - Presentation Event has been changed
var createStatementView_scores_partial_presentation = "CREATE VIEW IF NOT EXISTS VW_Scores_Partial_Presentation AS ";
createStatementView_scores_partial_presentation += " SELECT scoreid,";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
//createStatementView_scores_partial_presentation += " IFNULL(novelty0 + novelty1 + novelty2, 0)  novelty,";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
//createStatementView_scores_partial_presentation += " IFNULL(content0 + content1 + content2 + content3 + content4 + content5 + content6 + content7 + content8 + content9, 0) content,";
//FDT - ATA2024
createStatementView_scores_partial_presentation += " IFNULL(content0 + content1 + content2 + content3 + content4 + content5 + content6 , 0) content,";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
//FDT - ATA 2024
createStatementView_scores_partial_presentation += " IFNULL(finances0 + finances1 + finances2 + finances3 + finances4 + finances5 + finances6 + finances7 + finances8 + finances9 + finances10 + finances11, 0) finances,";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
//createStatementView_scores_partial_presentation += " IFNULL(deepdivetopic0 + deepdivetopic1 + deepdivetopic2 + deepdivetopic3 + deepdivetopic4, 0) deepdivetopic,";
createStatementView_scores_partial_presentation += " IFNULL(deepdivetopic0 + deepdivetopic1 + deepdivetopic2 + deepdivetopic3 , 0) deepdivetopic,";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
//createStatementView_scores_partial_presentation += " IFNULL(demonstrationanddelivery0 + demonstrationanddelivery1 + demonstrationanddelivery2 + demonstrationanddelivery3 + demonstrationanddelivery4 + demonstrationanddelivery5, 0) demonstrationanddelivery,";
//FDT - ATA2024
createStatementView_scores_partial_presentation += " IFNULL(demonstration0 + demonstration1 + demonstration2 + demonstration3 + demonstration4 + demonstration5, 0) demonstration,";
//FDT - ATA2024
createStatementView_scores_partial_presentation += " IFNULL(delivery0 + delivery1 + delivery2 + delivery3 + delivery4 + delivery5 + delivery6 + delivery7 , 0) delivery,";
//FDT - ATA2024
createStatementView_scores_partial_presentation += " IFNULL(structure0 + structure1 + structure2 + structure3 + structure4, 0) structure,";

createStatementView_scores_partial_presentation += " IFNULL(questions0 + questions1 + questions2 + questions3 + questions4 + questions5 + questions6 + questions7 , 0) questions,";
createStatementView_scores_partial_presentation += " IFNULL(generalimpression0 + generalimpression1 + generalimpression2, 0) generalimpression,";
createStatementView_scores_partial_presentation += " IFNULL(miscellaneous, 0) miscellaneous,";
//FD 2021.07.27 - ATA 2021  - Add Stage1
createStatementView_scores_partial_presentation += " IFNULL(stage1, 0) stage1, ";

//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
createStatementView_scores_partial_presentation += " IFNULL(finals, 0) finals, ";

//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
//FDT - ATA 2022 - modify Stage 2
//createStatementView_scores_partial_presentation += " IFNULL(st2businnesfigures0				+ st2businnesfigures1			+ st2businnesfigures2			+ st2businnesfigures3			+ st2businnesfigures4			+ ";
//FDT - ATA 2023 - eliminato Business Figures - INIZIO
//createStatementView_scores_partial_presentation += " IFNULL(st2businnesfigures0				+ st2businnesfigures1			+ st2businnesfigures2			+ st2businnesfigures3			+ ";
//FDT - ATA 2023 - eliminato Business Figures - FINE
//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
createStatementView_scores_partial_presentation += " IFNULL(st2finconcept0				+ st2finconcept1			+ st2finconcept2		    + st2finconcept3 + st2finconcept4 + st2finconcept5 + st2finconcept6 + st2finconcept7 + st2finconcept8 + st2finconcept9   + ";
//FDT - ATA 2023 - aggiunto Financial Concept - FINE
//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
createStatementView_scores_partial_presentation += " st2finkpis0 + st2finkpis1 + st2finkpis2 + st2finkpis3 + st2finkpis4  + ";

//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//createStatementView_scores_partial_presentation += "		st2content0						+ st2content1					+ st2content2					+ st2content3					+ st2content4					+ ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE
createStatementView_scores_partial_presentation += "		st2demonstrationanddelivery0	+ st2demonstrationanddelivery1	+ st2demonstrationanddelivery2	+ st2demonstrationanddelivery3	+ st2demonstrationanddelivery4 ";
//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//FDT - ATA 2022 - modify Stage 2
//createStatementView_scores_partial_presentation += "		st2investitors0					+ st2investitors1				+ st2investitors2				+ st2investitors3 ";
//createStatementView_scores_partial_presentation += "		st2investitors0					+ st2investitors1				+ st2investitors2 ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE
createStatementView_scores_partial_presentation += " , 0) stage2 ";
//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

createStatementView_scores_partial_presentation += " FROM TB_Scores LEFT JOIN TB_Scores_Presentation ON TB_Scores.Id = TB_Scores_Presentation.scoreid WHERE TB_Scores.Id";
var dropStatementView_scores_partial_presentation = "DROP VIEW IF EXISTS VW_Scores_Partial_Presentation";

//
// SQL DIRECTIVES - Create TRIGGERS --------------------------------------------------------------------------------------
//
// select * from sqlite_master where type = 'trigger';
var createStatementTrigger_delete_car_examboards2cars = "CREATE TRIGGER IF NOT EXISTS Delete_TB_ExamBoards2Cars AFTER DELETE ON TB_Cars FOR EACH ROW BEGIN DELETE FROM TB_ExamBoards2Cars WHERE carid = OLD.id; END"
var createStatementTrigger_delete_car_scores = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores AFTER DELETE ON TB_Cars FOR EACH ROW BEGIN DELETE FROM TB_Scores WHERE carid = OLD.id; END"
var createStatementTrigger_delete_car_scores_design1E = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Design1E_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Design1E WHERE scoreid = OLD.id; END"
var createStatementTrigger_delete_car_scores_design1C3 = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Design1C3_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Design1C3 WHERE scoreid = OLD.id; END"
var createStatementTrigger_delete_car_scores_presentation = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Presentation_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Presentation WHERE scoreid = OLD.id; END"
var createStatementTrigger_delete_car_scores_cost = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Cost_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Cost_2015 WHERE scoreid = OLD.id; END"
var createStatementTrigger_delete_car_scores_acceleration = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Acceleration_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Acceleration WHERE scoreid = OLD.id; END"
var createStatementTrigger_delete_car_scores_skidpad = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Skidpad_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Skidpad WHERE scoreid = OLD.id; END"
var createStatementTrigger_delete_car_scores_autocross = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Autocross_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Autocross WHERE scoreid = OLD.id; END"
var createStatementTrigger_delete_car_scores_endurance = "CREATE TRIGGER IF NOT EXISTS Delete_TB_Scores_Endurance_Trigger AFTER DELETE ON TB_Scores FOR EACH ROW BEGIN DELETE FROM TB_Scores_Endurance WHERE scoreid = OLD.id; END"

//
// SQL DIRECTIVES - OTHER Statements ------------------------------------------------------------------------------------------
//
// Elenco tabelle e viste x versioni ------------------------------------------------------------------------------------------
var selectStatement_versions = "SELECT * FROM TB_Versions WHERE version = ?";
var insertStatement_versions = "INSERT INTO TB_Versions (version, versiondate) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM TB_Versions WHERE version = ?)";
var selectAllStatement_tables_views = "SELECT type || ' IF EXISTS ' || name || ' ' AS dropstatement FROM sqlite_master WHERE (type='table' OR type='view') AND (name NOT LIKE '%sqlite_sequence%' AND name NOT LIKE '%webkitdatabaseinfotable%' AND name NOT LIKE 'TB_Versions')";

// TB_Fuels (elenco alimentazioni) --------------------------------------------------------------------------------------------
var selectAllStatement_fuels = "SELECT * FROM TB_Fuels";
var selectStatement_fuels = "SELECT * FROM TB_Fuels WHERE fuelname = ?";
var insertStatement_fuels = "INSERT INTO TB_Fuels (fuelname) SELECT (?) WHERE NOT EXISTS (SELECT 1 FROM TB_Fuels WHERE fuelname = ?)";
var updateStatement_fuels = "UPDATE TB_Fuels SET fuelname = ? WHERE id = ?";
var deleteStatement_fuels = "DELETE FROM TB_Fuels WHERE id = ?";

// TB_Classes (elenco marca vetture) --------------------------------------------------------------------------------------------
var selectAllStatement_classes = "SELECT * FROM TB_Classes";
var selectStatement_classes = "SELECT * FROM TB_Classes WHERE classname = ?";
var insertStatement_classes = "INSERT INTO TB_Classes (classname) SELECT (?) WHERE NOT EXISTS (SELECT 1 FROM TB_Classes WHERE classname = ?)";
var updateStatement_classes = "UPDATE TB_Classes SET classname = ? WHERE id = ?";
var deleteStatement_classes = "DELETE FROM TB_Classes WHERE id = ?";

// TB_Cars (vetture) --------------------------------------------------------------------------------------------------------
//Car can be deleted if no score records found - WARNING !!! - Since dynamic events don't calculate givenscore, so i check for other values
//var selectAllStatement_cars = "SELECT * FROM (SELECT *, 0 AS readonly FROM VW_Cars WHERE NOT EXISTS (SELECT * FROM TB_ExamBoards2Cars WHERE VW_Cars.id = TB_ExamBoards2Cars.carid) UNION SELECT *, 1 AS readonly FROM VW_Cars WHERE EXISTS (SELECT * FROM TB_ExamBoards2Cars WHERE VW_Cars.id = TB_ExamBoards2Cars.carid))";
var selectAllStatement_cars_clause2union = " SELECT * FROM TB_Scores "
selectAllStatement_cars_clause2union += " LEFT JOIN	TB_Scores_Acceleration ON TB_Scores.id = TB_Scores_Acceleration.scoreid"
selectAllStatement_cars_clause2union += " LEFT JOIN	TB_Scores_Skidpad ON TB_Scores.id = TB_Scores_Skidpad.scoreid"
selectAllStatement_cars_clause2union += " LEFT JOIN	TB_Scores_Autocross ON TB_Scores.id = TB_Scores_Autocross.scoreid"
selectAllStatement_cars_clause2union += " LEFT JOIN	TB_Scores_Endurance ON TB_Scores.id = TB_Scores_Endurance.scoreid"
selectAllStatement_cars_clause2union += " WHERE VW_Cars.id = TB_Scores.carid "
selectAllStatement_cars_clause2union += " AND (  (TB_Scores_Acceleration.run1timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Acceleration.run2timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Acceleration.run3timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Acceleration.run4timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Skidpad.run1timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Skidpad.run2timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Skidpad.run3timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Skidpad.run4timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Autocross.run1timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Autocross.run2timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Autocross.run3timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Autocross.run4timeadj > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores_Endurance.Time > 0) "
selectAllStatement_cars_clause2union += " OR (TB_Scores.score > 0) )"

var selectAllStatement_cars = "SELECT * FROM ("
selectAllStatement_cars += " SELECT *, 0 AS readonly FROM VW_Cars WHERE NOT EXISTS (" + selectAllStatement_cars_clause2union + " )"
selectAllStatement_cars += " UNION "
selectAllStatement_cars += " SELECT *, 1 AS readonly FROM VW_Cars WHERE EXISTS (" + selectAllStatement_cars_clause2union + " )"
selectAllStatement_cars += " )"

var insertStatement_cars = "INSERT INTO TB_Cars (carno, regno, teamid, classid, fuelid, deliverydocdate, boxno) VALUES (?, ?, ?, ?, ?, ?, ?)";
var updateStatement_cars = "UPDATE TB_Cars SET carno = ?, regno = ?, teamid = ?, classid = ?, fuelid = ?, deliverydocdate = ?, boxno = ? WHERE id = ?";
var deleteStatement_cars = "DELETE FROM TB_Cars WHERE id = ?";

// TB_Teams (squadre) -------------------------------------------------------------------------------------------------------
var selectAllStatement_teams = "SELECT * FROM (SELECT *, 0 AS readonly FROM TB_Teams WHERE NOT EXISTS (SELECT * FROM TB_Cars WHERE TB_Teams.id = TB_Cars.teamid) UNION SELECT *, 1 AS readonly FROM TB_Teams WHERE EXISTS (SELECT * FROM TB_Cars WHERE TB_Teams.id = TB_Cars.teamid))";
var selectStatement_teams = "SELECT * FROM TB_Teams WHERE teamname = ? AND university = ? AND country = ?";
var insertStatement_teams = "INSERT INTO TB_Teams (teamname, university, country) VALUES (?, ?, ?)";
var updateStatement_teams = "UPDATE TB_Teams SET teamname = ?, university = ? , country = ? WHERE id = ?";
var deleteStatement_teams = "DELETE FROM TB_Teams WHERE id = ?";

// TB_Examiners (giudici) ------------------------------------------------------------------------------------------------------
var selectAllStatement_examiners = "SELECT * FROM (SELECT *, 0 AS readonly FROM TB_Examiners WHERE NOT EXISTS (SELECT * FROM TB_ExamBoards2Examiners WHERE TB_Examiners.id = TB_ExamBoards2Examiners.examinerid) UNION SELECT *, 1 AS readonly FROM TB_Examiners WHERE EXISTS (SELECT * FROM TB_ExamBoards2Examiners WHERE TB_Examiners.id = TB_ExamBoards2Examiners.examinerid))";
var selectStatement_examiners = "SELECT * FROM TB_Examiners WHERE firstname = ? AND surname = ? ";
var insertStatement_examiners = "INSERT INTO TB_Examiners (firstname, surname, phone) VALUES (?, ?, ?)";
var updateStatement_examiners = "UPDATE TB_Examiners SET firstname = ? , surname = ? , phone = ? WHERE id = ?";
var deleteStatement_examiners = "DELETE FROM TB_Examiners WHERE id = ?";

// TB_ExamBoards (commissioni esaminatrici) ------------------------------------------------------------------------------------
//AF - Giu 2016 - Examboard is connected to a single Event
var selectAllStatement_examboards = "SELECT * FROM TB_ExamBoards";
var selectStatement_examboards = "SELECT * FROM TB_ExamBoards WHERE examboardname = ? ";
var insertStatement_examboards = "INSERT INTO TB_ExamBoards (examboardname, description, usecolor, color, eventid) VALUES (?, ?, ?, ?, ?)";
var updateStatement_examboards = "UPDATE TB_ExamBoards SET examboardname = ?, description = ?, usecolor = ?, color = ?, eventid = ? WHERE id = ?";
var deleteStatement_examboards = "DELETE FROM TB_ExamBoards WHERE id = ?";

// TB_ExamBoards2Examiners (legame commissioni esaminatrici/giuduci) ------------------------------------------------------------
var selectAllStatement_examboards2examiners = "SELECT * FROM VW_ExamBoards2Examiners ORDER BY examboardid";
var selectStatement_examboards2examiners = "SELECT * FROM VW_ExamBoards2Examiners WHERE examboardid = ?";
var insertStatement_examboards2examiners = "INSERT OR IGNORE INTO TB_ExamBoards2Examiners (examboardid, examinerid) VALUES (?,?)"
var deleteStatement_examboards2examiners = "DELETE FROM TB_ExamBoards2Examiners WHERE examboardid = ? AND examinerid = ?";
//Elenco dati esaminatori per commissione esaminatrice (quelli assegnati e quelli 'liberi')
var selectStatement_examboards2examiners_availableOnly = "SELECT id, firstname, surname, phone FROM TB_Examiners WHERE id NOT IN (SELECT examinerid FROM TB_ExamBoards2Examiners) UNION ";
selectStatement_examboards2examiners_availableOnly += "SELECT id, firstname, surname, phone FROM TB_Examiners INNER JOIN TB_ExamBoards2Examiners ON TB_ExamBoards2Examiners.examboardid = ? AND TB_ExamBoards2Examiners.examinerid = TB_Examiners.id";
//Elenco id di tutte le commissioni
var selectStatement_examboards2examiners_all_examboards_id = "SELECT DISTINCT examboardid FROM VW_ExamBoards2Examiners";

// TB_ExamBoards2Cars (legame commissioni esaminatrici/vetture) -----------------------------------------------------------------
var selectAllStatement_examboards2cars = "SELECT * FROM VW_Examboards2Cars ORDER BY examboardid";
var selectStatement_examboards2cars = "SELECT * FROM VW_Examboards2Cars WHERE examboardid = ?";
var insertStatement_examboards2cars = "INSERT OR IGNORE INTO TB_ExamBoards2Cars (examboardid, carid) VALUES (?,?)"
var deleteStatement_examboards2cars = "DELETE FROM TB_ExamBoards2Cars WHERE examboardid = ? AND carid = ?";
//Elenco dati vetture per commissione esaminatrice (quelle assegnate e quelle 'libere')
var selectStatement_examboards2cars_availableOnly = "SELECT id, carno, regno, teamid, teamname, university, country, classid, classname, fuelid, fuelname, deliverydocdate, boxno FROM VW_Cars ";
//A car can be assigned to more than an Examboard - req.Ciadamidaro Set 2015
//selectStatement_examboards2cars_availableOnly += " WHERE id NOT IN (SELECT carid FROM TB_ExamBoards2Cars) ";
selectStatement_examboards2cars_availableOnly += " UNION SELECT id, carno, regno, teamid, teamname, university, country, classid, classname, fuelid, fuelname, deliverydocdate, boxno FROM VW_Cars ";
selectStatement_examboards2cars_availableOnly += " INNER JOIN TB_ExamBoards2Cars ON TB_ExamBoards2Cars.examboardid = ? AND TB_ExamBoards2Cars.carid = VW_Cars.id";

// TB_EventsTypes (tipologia prove) -----------------------------------------------------------------------------------------
var selectAllStatement_eventstypes = "SELECT * FROM TB_EventsTypes";
var selectStatement_eventstypes = "SELECT * FROM TB_EventsTypes WHERE eventtypename = ?";
var insertStatement_eventstypes = "INSERT INTO TB_EventsTypes (eventtypename) SELECT (?) WHERE NOT EXISTS (SELECT 1 FROM TB_EventsTypes WHERE eventtypename = ?)";
var updateStatement_eventstypes = "UPDATE TB_EventsTypes SET eventtypename = ? WHERE id = ?";
var deleteStatement_eventstypes = "DELETE FROM TB_EventsTypes WHERE id = ?";

// TB_EventsNames (nome prove) ----------------------------------------------------------------------------------------------
var selectAllStatement_eventsnames = "SELECT * FROM TB_EventsNames";
var selectStatement_eventsnames = "SELECT * FROM TB_EventsNames WHERE eventname = ?";
var selectStatement_eventsnames_bytype = "SELECT * FROM TB_EventsNames WHERE eventtypeid = ?";
var insertStatement_eventsnames = "INSERT INTO TB_EventsNames (eventname, eventtypeid) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM TB_EventsNames WHERE eventname = ?)";
var updateStatement_eventsnames = "UPDATE TB_EventsNames SET eventname = ?, eventtypeid = ? WHERE id = ?";
var deleteStatement_eventsnames = "DELETE FROM TB_EventsNames WHERE id = ?";

// TB_Events (elenco prove) -------------------------------------------------------------------------------------------------
var selectAllStatement_events = "SELECT *, 0 AS readonly FROM VW_Events WHERE NOT EXISTS (SELECT * FROM TB_Scores WHERE VW_Events.id = TB_Scores.eventid) UNION SELECT *, 1 AS readonly FROM VW_Events WHERE EXISTS (SELECT * FROM TB_Scores WHERE VW_Events.id = TB_Scores.eventid)";
var insertStatement_events = "INSERT INTO TB_Events (eventtypeid, eventnameid, description, scoretypenumeric, maximumscore) VALUES (?, ?, ?, ?, ?)";
var updateStatement_events = "UPDATE TB_Events SET eventtypeid = ?, eventnameid = ?, description = ?, scoretypenumeric = ?, maximumscore = ? WHERE id = ?";
var deleteStatement_events = "DELETE FROM TB_Events WHERE id = ?";

// TB_Scores (punteggi) -----------------------------------------------------------------------------------------------------
var selectAllStatement_scores_cars_classes = "SELECT DISTINCT classid, classname, VW_Events.id AS eventid, description, eventnameid, eventname, eventtypeid, eventtypename, MAX(score) AS score FROM VW_Cars LEFT JOIN VW_Events LEFT JOIN TB_Scores ON TB_Scores.carid = VW_Cars.id AND TB_Scores.eventid = VW_Events.id WHERE VW_Events.id IN (SELECT eventid FROM TB_ExamBoards) GROUP BY classid, classname, VW_Events.id, description, eventnameid, eventname, eventtypeid, eventtypename ORDER BY classname, eventtypename";
var selectAllStatement_scores = "SELECT VW_Events.id AS eventid, VW_Events.description as description, VW_Events.eventtypeid AS eventtypeid, VW_Events.eventtypename AS eventtypename, VW_Events.eventnameid AS eventnameid, VW_Events.eventname AS eventname, VW_Events.scoretypenumeric AS scoretypenumeric, VW_Events.maximumscore AS maximumscore, ";
selectAllStatement_scores += " VW_Cars.id AS carid, VW_Cars.carno AS carno, VW_Cars.regno AS regno, VW_Cars.teamid AS teamid, VW_Cars.teamname AS teamname, VW_Cars.university AS university, VW_Cars.country AS country, VW_Cars.classid AS classid, VW_Cars.classname AS classname, VW_Cars.fuelid AS fuelid, VW_Cars.fuelname AS fuelname, VW_Cars.deliverydocdate AS deliverydocdate, VW_Cars.boxno AS boxno, ";
selectAllStatement_scores += " IFNULL(TB_Scores.score, 0) AS score, IFNULL(TB_Scores.penalityscore, 0) AS penalityscore, IFNULL(TB_Scores.penalitynotes, '') AS penalitynotes, IFNULL(TB_Scores.correctedscore, 0) AS correctedscore ";
selectAllStatement_scores += " , IFNULL(TB_Scores.id, -1) AS scoreid, ";
selectAllStatement_scores += " CASE";
selectAllStatement_scores += " WHEN vw_events.eventname LIKE '%DESIGN%' AND  VW_Cars.classname IN ('1C', '3') THEN 'ScoresByCarDesign1C3.html' ";
selectAllStatement_scores += " WHEN VW_Events.eventname LIKE '%DESIGN%' AND  VW_Cars.classname IN ('1E') THEN 'ScoresByCarDesign1E.html' ";
selectAllStatement_scores += " WHEN VW_Events.eventname LIKE '%PRESENTATION%' AND  VW_Cars.classname IN ('1C', '3', '1E') THEN 'ScoresByCarPresentation.html' ";
selectAllStatement_scores += " WHEN VW_Events.eventname LIKE '%COST%' AND  VW_Cars.classname IN ('1C', '3', '1E') THEN 'ScoresByCarCost.html' ";
selectAllStatement_scores += " WHEN VW_Events.eventname LIKE '%ACCELERATION%' AND  VW_Cars.classname IN ('1C', '3', '1E') THEN 'ScoresByCarAcceleration.html' ";
selectAllStatement_scores += " WHEN VW_Events.eventname LIKE '%SKID%' AND  VW_Cars.classname IN ('1C', '3', '1E') THEN 'ScoresByCarSkidPad.html' ";
selectAllStatement_scores += " WHEN VW_Events.eventname LIKE '%AUTO%' AND  VW_Cars.classname IN ('1C', '3', '1E') THEN 'ScoresByCarAutoCross.html' ";
selectAllStatement_scores += " WHEN VW_Events.eventname LIKE '%ENDURANCE%' AND  VW_Cars.classname IN ('1C', '3', '1E') THEN 'ScoresByCarEndurance.html' ";
selectAllStatement_scores += " ELSE '' END as pagetojump ";
//selectAllStatement_scores += " FROM VW_Cars  ";
//selectAllStatement_scores += " LEFT JOIN VW_Events ON VW_Events.id = TB_Scores.eventid ";
//selectAllStatement_scores += " LEFT JOIN TB_Scores ON VW_Cars.id = TB_Scores.carid ";
//selectAllStatement_scores += " WHERE VW_Cars.classid = ? AND VW_Events.id = ? ";
selectAllStatement_scores += " FROM VW_CARS, VW_Events";
selectAllStatement_scores += " LEFT JOIN TB_Scores ON VW_Cars.id = TB_Scores.carid AND VW_Events.id = TB_Scores.eventid ";
selectAllStatement_scores += " WHERE VW_Cars.classid = ? AND VW_Events.id = ? ";

var selectStatement_scores_eventdetail = "SELECT TB_Classes.classname AS classname, VW_Events.eventname AS eventname, VW_Events.description AS description, VW_Events.eventtypename AS eventtypename FROM TB_Classes, VW_Events WHERE TB_Classes.id = ? AND VW_Events.id = ?";

var insertStatement_scores = "INSERT INTO TB_Scores (eventid, carid, score, penalityscore, penalitynotes, correctedscore) VALUES (?, ?, ?, ?, ?, ?)";

var updateStatement_scores = "UPDATE TB_Scores SET score = ?, penalityscore = ?, penalitynotes = ?, correctedscore = ? WHERE eventid = ? AND carid = ?";

var deleteStatement_scores = "DELETE FROM TB_Scores WHERE eventid = ? AND carid = ?";

var updateStatement_scores_score_byid = "UPDATE TB_Scores SET score = ? WHERE id = ?";

// TB_ScoresDesign1E (punteggi) --------------------------------------------------------------------------------------------
var selectStatement_scores_design1E_all = "SELECT TB_Scores_Design1E.id, scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, carid, eventid, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes FROM TB_Scores_Design1E INNER JOIN TB_Scores on TB_Scores_Design1E.scoreid = TB_Scores.id";

var selectStatement_scores_design1E = "SELECT id, scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes FROM TB_Scores_Design1E WHERE scoreid = ?";
var insertStatement_scores_design1E = "INSERT INTO TB_Scores_Design1E (scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement_scores_design1E = "UPDATE TB_Scores_Design1E SET suspension = ?, framebodyaero = ?, tractivedriverecoverysystem = ?, cockpitcontrolsbrakessafety = ?, systemmanagementintegration = ?, manufacturabilityserviceability = ?, aestheticsstyle = ?, creativity = ?, carweight = ?, suspensionnotes = ?, framebodyaeronotes = ?, tractivedriverecoverysystemnotes = ?, cockpitcontrolsbrakessafetynotes = ?, systemmanagementintegrationnotes = ?, manufacturabilityserviceabilitynotes = ?, aestheticsstylenotes = ?, creativitynotes = ?, miscellaneous = ?, miscellaneousnotes = ? WHERE scoreid = ?";
var deleteStatement_scores_design1E = "DELETE FROM TB_Scores_Design1E WHERE scoreid = ?";

// TB_ScoresDesign1C3 (punteggi) -------------------------------------------------------------------------------------------
var selectStatement_scores_design1C3_all = "SELECT TB_Scores_Design1C3.id, scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, carid, eventid, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes FROM TB_Scores_Design1C3 INNER JOIN TB_Scores on TB_Scores_Design1C3.scoreid = TB_Scores.id";
var selectStatement_scores_design1C3 = "SELECT id, scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes FROM TB_Scores_Design1C3 WHERE scoreid = ?";
var insertStatement_scores_design1C3 = "INSERT INTO TB_Scores_Design1C3 (scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement_scores_design1C3 = "UPDATE TB_Scores_Design1C3 SET suspension = ?, framebodyaero = ?, powertrain = ?, cockpitcontrolsbrakessafety = ?, systemmanagementintegration = ?, manufacturabilityserviceability = ?, aestheticsstyle = ?, creativity = ?, carweight = ?, suspensionnotes = ?, framebodyaeronotes = ?, powertrainnotes = ?, cockpitcontrolsbrakessafetynotes = ?, systemmanagementintegrationnotes = ?, manufacturabilityserviceabilitynotes = ?, aestheticsstylenotes = ?, creativitynotes = ?, miscellaneous = ?, miscellaneousnotes = ? WHERE scoreid = ?";
var deleteStatement_scores_design1C3 = "DELETE FROM TB_Scores_Design1C3 WHERE scoreid = ?";

// TB_ScoresPresentation (punteggi)
//Event 2019 - Presentation Event has been changed
var selectStatement_scores_presentation_all = "SELECT ";

selectStatement_scores_presentation_all += "TB_Scores_Presentation.id, scoreid, ";
//FDT - ATA 2023 - modifiche stage3
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
//selectStatement_scores_presentation_all += "novelty0, ";
//selectStatement_scores_presentation_all += "novelty1, ";
//selectStatement_scores_presentation_all += "novelty2, ";
//selectStatement_scores_presentation_all += "noveltynotes, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
selectStatement_scores_presentation_all += "content0, ";
selectStatement_scores_presentation_all += "content1, ";
selectStatement_scores_presentation_all += "content2, ";
selectStatement_scores_presentation_all += "content3, ";
selectStatement_scores_presentation_all += "content4, ";
selectStatement_scores_presentation_all += "content5, ";
selectStatement_scores_presentation_all += "content6, ";
//FDT - ATA2024
//selectStatement_scores_presentation_all += "content7, ";
//selectStatement_scores_presentation_all += "content8, ";
//selectStatement_scores_presentation_all += "content9, ";
selectStatement_scores_presentation_all += "contentnotes, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
//FDT - ATA 2024
selectStatement_scores_presentation_all += "finances0, finances1, finances2, finances3, finances4, finances5, finances6, finances7, finances8, finances9, finances10, finances11, financesnotes, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
selectStatement_scores_presentation_all += "deepdivetopic0, ";
selectStatement_scores_presentation_all += "deepdivetopic1, ";
selectStatement_scores_presentation_all += "deepdivetopic2, ";
selectStatement_scores_presentation_all += "deepdivetopic3, ";
//selectStatement_scores_presentation_all += "deepdivetopic4, ";
selectStatement_scores_presentation_all += "deepdivetopicnotes, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
selectStatement_scores_presentation_all += "demonstration0, ";
selectStatement_scores_presentation_all += "demonstration1, ";
selectStatement_scores_presentation_all += "demonstration2, ";
selectStatement_scores_presentation_all += "demonstration3, ";
//FDT - ATA2024
selectStatement_scores_presentation_all += "demonstration4, ";
selectStatement_scores_presentation_all += "demonstration5, ";
//selectStatement_scores_presentation_all += "demonstrationanddelivery4, ";
//selectStatement_scores_presentation_all += "demonstrationanddelivery5, ";
selectStatement_scores_presentation_all += "demonstrationnotes, ";

selectStatement_scores_presentation_all += "structure0, "
selectStatement_scores_presentation_all += "structure1, "
selectStatement_scores_presentation_all += "structure2, "
selectStatement_scores_presentation_all += "structure3, "
selectStatement_scores_presentation_all += "structure4, "
//FDT - ATA2024
//selectStatement_scores_presentation_all += "structure5, "
selectStatement_scores_presentation_all += "structurenotes, ";

selectStatement_scores_presentation_all += "delivery0, ";
selectStatement_scores_presentation_all += "delivery1, ";
selectStatement_scores_presentation_all += "delivery2, ";
selectStatement_scores_presentation_all += "delivery3, ";
selectStatement_scores_presentation_all += "delivery4, ";
selectStatement_scores_presentation_all += "delivery5, ";
selectStatement_scores_presentation_all += "delivery6, ";
selectStatement_scores_presentation_all += "delivery7, ";
//FDT - ATA2024
//selectStatement_scores_presentation_all += "delivery8, ";
//selectStatement_scores_presentation_all += "delivery9, ";
selectStatement_scores_presentation_all += "deliverynotes, ";

selectStatement_scores_presentation_all += "questions0, ";
selectStatement_scores_presentation_all += "questions1, ";
selectStatement_scores_presentation_all += "questions2, ";
selectStatement_scores_presentation_all += "questions3, ";
selectStatement_scores_presentation_all += "questions4, ";
selectStatement_scores_presentation_all += "questions5, ";
selectStatement_scores_presentation_all += "questions6, ";
selectStatement_scores_presentation_all += "questions7, ";
//selectStatement_scores_presentation_all += "questions8, ";
//selectStatement_scores_presentation_all += "questions9, ";
selectStatement_scores_presentation_all += "questionsnotes, ";

selectStatement_scores_presentation_all += "generalimpression0, ";
selectStatement_scores_presentation_all += "generalimpression1, ";
selectStatement_scores_presentation_all += "generalimpression2, ";
selectStatement_scores_presentation_all += "generalimpressionnotes, ";

selectStatement_scores_presentation_all += "miscellaneous, ";
selectStatement_scores_presentation_all += "miscellaneousnotes, ";


//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
//FDT - ATA 2023 - eliminato Business Figures - INIZIO
//selectStatement_scores_presentation_all += " st2businnesfigures0, ";
//selectStatement_scores_presentation_all += " st2businnesfigures1, ";
//selectStatement_scores_presentation_all += " st2businnesfigures2, ";
//selectStatement_scores_presentation_all += " st2businnesfigures3, ";
////FDT - ATA 2022 - modify Stage 2
////selectStatement_scores_presentation_all += " st2businnesfigures4, ";
//selectStatement_scores_presentation_all += " st2businnesfiguresnotes, ";
//FDT - ATA 2023 - eliminato Business Figures - FINE

//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
selectStatement_scores_presentation_all += " st2finconcept0, ";
selectStatement_scores_presentation_all += " st2finconcept1, ";
selectStatement_scores_presentation_all += " st2finconcept2, ";
selectStatement_scores_presentation_all += " st2finconcept3, ";
selectStatement_scores_presentation_all += " st2finconcept4, ";
selectStatement_scores_presentation_all += " st2finconcept5, ";
selectStatement_scores_presentation_all += " st2finconcept6, ";
selectStatement_scores_presentation_all += " st2finconcept7, ";
selectStatement_scores_presentation_all += " st2finconcept8, ";
selectStatement_scores_presentation_all += " st2finconcept9, ";

selectStatement_scores_presentation_all += " st2finconceptnotes, ";
//FDT - ATA 2023 - aggiunto Financial Concept - FINE
//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
selectStatement_scores_presentation_all += " st2finkpis0, ";
selectStatement_scores_presentation_all += " st2finkpis1, ";
selectStatement_scores_presentation_all += " st2finkpis2, ";
selectStatement_scores_presentation_all += " st2finkpis3, ";
selectStatement_scores_presentation_all += " st2finkpis4, ";
selectStatement_scores_presentation_all += " st2finkpisnotes, ";
//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE

//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//selectStatement_scores_presentation_all += " st2content0, ";
//selectStatement_scores_presentation_all += " st2content1, ";
//selectStatement_scores_presentation_all += " st2content2, ";
//selectStatement_scores_presentation_all += " st2content3, ";
//selectStatement_scores_presentation_all += " st2content4, ";
//selectStatement_scores_presentation_all += " st2contentnotes, ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE

selectStatement_scores_presentation_all += " st2demonstrationanddelivery0, ";
selectStatement_scores_presentation_all += " st2demonstrationanddelivery1, ";
selectStatement_scores_presentation_all += " st2demonstrationanddelivery2, ";
selectStatement_scores_presentation_all += " st2demonstrationanddelivery3, ";
selectStatement_scores_presentation_all += " st2demonstrationanddelivery4, ";
selectStatement_scores_presentation_all += " st2demonstrationanddeliverynotes, ";

//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//selectStatement_scores_presentation_all += " st2investitors0, ";
//selectStatement_scores_presentation_all += " st2investitors1, ";
//selectStatement_scores_presentation_all += " st2investitors2, ";
////FDT - ATA 2022 - modify Stage 2
////selectStatement_scores_presentation_all += " st2investitors3, ";
//selectStatement_scores_presentation_all += " st2investitorsnotes, ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE
//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

selectStatement_scores_presentation_all += "presentationnotes, ";

selectStatement_scores_presentation_all += "carid, eventid, ";

//FD 2021.07.27 - ATA 2021  - Add Stage1
selectStatement_scores_presentation_all += "stage1, ";

//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
selectStatement_scores_presentation_all += "finals ";

selectStatement_scores_presentation_all += "FROM TB_Scores_Presentation INNER JOIN TB_Scores on TB_Scores_Presentation.scoreid = TB_Scores.id";

var selectStatement_scores_presentation = "SELECT id, scoreid, ";
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
//selectStatement_scores_presentation += "novelty0, novelty1, novelty2, noveltynotes, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
//selectStatement_scores_presentation += "content0, content1, content2, content3, content4, content5, content6, content7, content8, content9, contentnotes, ";
//FDT - ATA2024
selectStatement_scores_presentation += "content0, content1, content2, content3, content4, content5, content6, contentnotes, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
//FDT - ATA 2024
selectStatement_scores_presentation += "finances0, finances1, finances2, finances3, finances4, finances5, finances6, finances7, finances8, finances9, finances10, finances11, financesnotes, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
//selectStatement_scores_presentation += "deepdivetopic0, deepdivetopic1, deepdivetopic2, deepdivetopic3, deepdivetopic4, deepdivetopicnotes, ";
selectStatement_scores_presentation += "deepdivetopic0, deepdivetopic1, deepdivetopic2, deepdivetopic3, deepdivetopicnotes, ";
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
//FDT - ATA2024
selectStatement_scores_presentation += "demonstration0, demonstration1, demonstration2, demonstration3, demonstration4, demonstration5, demonstrationnotes, ";
//FDT - ATA2024
selectStatement_scores_presentation += "delivery0, delivery1, delivery2, delivery3, delivery4, delivery5, delivery6, delivery7, deliverynotes, ";
//FDT - ATA2024
selectStatement_scores_presentation += "structure0, structure1, structure2, structure3, structure4, structurenotes, ";
selectStatement_scores_presentation += "questions0, questions1, questions2, questions3, questions4, questions5, questions6, questions7, questionsnotes, ";
selectStatement_scores_presentation += "generalimpression0, generalimpression1, generalimpression2, generalimpressionnotes, ";
selectStatement_scores_presentation += "miscellaneous, miscellaneousnotes, ";

//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
//FDT - ATA 2023 - eliminato Business Figures - INIZIO
//selectStatement_scores_presentation += " st2businnesfigures0, ";
//selectStatement_scores_presentation += " st2businnesfigures1, ";
//selectStatement_scores_presentation += " st2businnesfigures2, ";
//selectStatement_scores_presentation += " st2businnesfigures3, ";
////FDT - ATA 2022 - modify Stage 2
////selectStatement_scores_presentation += " st2businnesfigures4, ";
//selectStatement_scores_presentation += " st2businnesfiguresnotes, ";
//FDT - ATA 2023 - eliminato Business Figures - INIZIO

//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
selectStatement_scores_presentation += " st2finconcept0, ";
selectStatement_scores_presentation += " st2finconcept1, ";
selectStatement_scores_presentation += " st2finconcept2, ";
selectStatement_scores_presentation += " st2finconcept3, ";
selectStatement_scores_presentation += " st2finconcept4, ";
selectStatement_scores_presentation += " st2finconcept5, ";
selectStatement_scores_presentation += " st2finconcept6, ";
selectStatement_scores_presentation += " st2finconcept7, ";
selectStatement_scores_presentation += " st2finconcept8, ";
selectStatement_scores_presentation += " st2finconcept9, ";
selectStatement_scores_presentation += " st2finconceptnotes, ";
//FDT - ATA 2023 - aggiunto Financial Concept - FINE
//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
selectStatement_scores_presentation += " st2finkpis0, ";
selectStatement_scores_presentation += " st2finkpis1, ";
selectStatement_scores_presentation += " st2finkpis2, ";
selectStatement_scores_presentation += " st2finkpis3, ";
selectStatement_scores_presentation += " st2finkpis4, ";
selectStatement_scores_presentation += " st2finkpisnotes, ";
//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE

//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//selectStatement_scores_presentation += " st2content0, ";
//selectStatement_scores_presentation += " st2content1, ";
//selectStatement_scores_presentation += " st2content2, ";
//selectStatement_scores_presentation += " st2content3, ";
//selectStatement_scores_presentation += " st2content4, ";
//selectStatement_scores_presentation += " st2contentnotes, ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE

selectStatement_scores_presentation += " st2demonstrationanddelivery0, ";
selectStatement_scores_presentation += " st2demonstrationanddelivery1, ";
selectStatement_scores_presentation += " st2demonstrationanddelivery2, ";
selectStatement_scores_presentation += " st2demonstrationanddelivery3, ";
selectStatement_scores_presentation += " st2demonstrationanddelivery4, ";
selectStatement_scores_presentation += " st2demonstrationanddeliverynotes, ";

//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
//selectStatement_scores_presentation += " st2investitors0, ";
//selectStatement_scores_presentation += " st2investitors1, ";
//selectStatement_scores_presentation += " st2investitors2, ";
////FDT - ATA 2022 - modify Stage 2
////selectStatement_scores_presentation += " st2investitors3, ";
//selectStatement_scores_presentation += " st2investitorsnotes, ";
//FDT - ATA 2023 - eliminato Content e Investors - FINE
//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

selectStatement_scores_presentation += "presentationnotes,  ";

//FD 2021.07.27 - ATA 2021  - Add Stage1
selectStatement_scores_presentation += "stage1, ";

//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
selectStatement_scores_presentation += "finals ";

selectStatement_scores_presentation += "FROM TB_Scores_Presentation WHERE scoreid = ?";

//FD 2021.07.27 - ATA 2021  - Add Stage1
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
//var insertStatement_scores_presentation = "INSERT INTO TB_Scores_Presentation VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var insertStatement_scores_presentation = "INSERT INTO TB_Scores_Presentation VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


var updateStatement_scores_presentation = "UPDATE TB_Scores_Presentation SET ";
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
//updateStatement_scores_presentation += "novelty0 = ?, novelty1 = ?, novelty2 = ?, noveltynotes = ?, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
//updateStatement_scores_presentation += "content0 = ?, content1 = ?, content2 = ?, content3 = ?, content4 = ?, content5 = ?, content6 = ?, content7 = ?, content8 = ?, content9 = ?, contentnotes = ?, ";
//FDT - ATA2024
updateStatement_scores_presentation += "content0 = ?, content1 = ?, content2 = ?, content3 = ?, content4 = ?, content5 = ?, content6 = ?, contentnotes = ?, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
//FDT - ATA 2024
updateStatement_scores_presentation += "finances0 = ?, finances1 = ?, finances2 = ?, finances3 = ?, finances4 = ?, finances5 = ?, finances6 = ?, finances7 = ?, finances8 = ?, finances9 = ?, finances10 = ?, finances11 = ?, financesnotes = ?, ";

//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
//updateStatement_scores_presentation += "deepdivetopic0 = ?, deepdivetopic1 = ?, deepdivetopic2 = ?, deepdivetopic3 = ?, deepdivetopic4 = ?, deepdivetopicnotes = ?, ";
updateStatement_scores_presentation += "deepdivetopic0 = ?, deepdivetopic1 = ?, deepdivetopic2 = ?, deepdivetopic3 = ?, deepdivetopicnotes = ?, ";
//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
//updateStatement_scores_presentation += "demonstrationanddelivery0 = ?, demonstrationanddelivery1 = ?, demonstrationanddelivery2 = ?, demonstrationanddelivery3 = ?, demonstrationanddelivery4 = ?, demonstrationanddelivery5 = ?,demonstrationanddeliverynotes = ?, ";
//FDT - ATA2024
updateStatement_scores_presentation += "demonstration0 = ?, demonstration1 = ?, demonstration2 = ?, demonstration3 = ?, demonstration4 = ?, demonstration5 = ?, demonstrationnotes = ?, ";
//FDT - ATA2024
updateStatement_scores_presentation += "structure0 = ?, structure1 = ?, structure2 = ?, structure3 = ?, structure4 = ?, structurenotes = ?, ";
//FDT - ATA2024
updateStatement_scores_presentation += "delivery0 = ?, delivery1 = ?, delivery2 = ?, delivery3 = ?, delivery4 = ?, delivery5 = ?, delivery6 = ?, delivery7 = ?, deliverynotes = ?, ";
updateStatement_scores_presentation += "questions0 = ?, questions1 = ?, questions2 = ?, questions3 = ?, questions4 = ?, questions5 = ?, questions6 = ?, questions7 = ?, questionsnotes = ?, ";

updateStatement_scores_presentation += "generalimpression0 = ?, generalimpression1 = ?, generalimpression2 = ?, generalimpressionnotes = ?, ";
updateStatement_scores_presentation += "miscellaneous = ?, miscellaneousnotes = ?, ";

//FDT - ATA 2023 - eliminato Business Figures, Content - INIZIO
//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
//updateStatement_scores_presentation += " st2businnesfigures0 = ?, ";
//updateStatement_scores_presentation += " st2businnesfigures1 = ?, ";
//updateStatement_scores_presentation += " st2businnesfigures2 = ?, ";
//updateStatement_scores_presentation += " st2businnesfigures3 = ?, ";
////FDT - ATA 2022 - modify Stage 2
////updateStatement_scores_presentation += " st2businnesfigures4 = ?, ";
//updateStatement_scores_presentation += " st2businnesfiguresnotes = ?, ";

//updateStatement_scores_presentation += " st2content0 = ?, ";
//updateStatement_scores_presentation += " st2content1 = ?, ";
//updateStatement_scores_presentation += " st2content2 = ?, ";
//updateStatement_scores_presentation += " st2content3 = ?, ";
//updateStatement_scores_presentation += " st2content4 = ?, ";
//updateStatement_scores_presentation += " st2contentnotes = ?, ";
//FDT - ATA 2023 - eliminato Business Figures, Content - FINE

//FDT - ATA 2023 - aggiunto Financial Concept, Financial KPIs & insights - INIZIO
updateStatement_scores_presentation += " st2finconcept0 = ?, ";
updateStatement_scores_presentation += " st2finconcept1 = ?, ";
updateStatement_scores_presentation += " st2finconcept2 = ?, ";
updateStatement_scores_presentation += " st2finconcept3 = ?, ";
updateStatement_scores_presentation += " st2finconcept4 = ?, ";
updateStatement_scores_presentation += " st2finconcept5 = ?, ";
updateStatement_scores_presentation += " st2finconcept6 = ?, ";
updateStatement_scores_presentation += " st2finconcept7 = ?, ";
updateStatement_scores_presentation += " st2finconcept8 = ?, ";
updateStatement_scores_presentation += " st2finconcept9 = ?, ";
updateStatement_scores_presentation += " st2finconceptnotes = ?, ";

updateStatement_scores_presentation += " st2finkpis0 = ?, ";
updateStatement_scores_presentation += " st2finkpis1 = ?, ";
updateStatement_scores_presentation += " st2finkpis2 = ?, ";
updateStatement_scores_presentation += " st2finkpis3 = ?, ";
updateStatement_scores_presentation += " st2finkpis4 = ?, ";
updateStatement_scores_presentation += " st2finkpisnotes = ?, ";

//FDT - ATA 2023 - aggiunto Financial Concept, Financial KPIs & insights - FINE

updateStatement_scores_presentation += " st2demonstrationanddelivery0 = ?, ";
updateStatement_scores_presentation += " st2demonstrationanddelivery1 = ?, ";
updateStatement_scores_presentation += " st2demonstrationanddelivery2 = ?, ";
updateStatement_scores_presentation += " st2demonstrationanddelivery3 = ?, ";
updateStatement_scores_presentation += " st2demonstrationanddelivery4 = ?, ";
updateStatement_scores_presentation += " st2demonstrationanddeliverynotes = ?, ";

//FDT - ATA 2023 - eliminato  Investors - INIZIO
//updateStatement_scores_presentation += " st2investitors0 = ?, ";
//updateStatement_scores_presentation += " st2investitors1 = ?, ";
//updateStatement_scores_presentation += " st2investitors2 = ?, ";
////FDT - ATA 2022 - modify Stage 2
////updateStatement_scores_presentation += " st2investitors3 = ?, ";
//updateStatement_scores_presentation += " st2investitorsnotes  = ?, ";
//FDT - ATA 2023 - eliminato  Investors - FINE

//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

updateStatement_scores_presentation += "presentationnotes = ?, ";

//FD 2021.07.27 - ATA 2021  - Add Stage1
updateStatement_scores_presentation += "stage1 = ?, "

//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
updateStatement_scores_presentation += "finals = ? "

updateStatement_scores_presentation += "WHERE scoreid = ?";

var deleteStatement_scores_presentation = "DELETE FROM TB_Scores_Presentation WHERE scoreid = ?";

// TB_Scores_Cost (punteggi)
var selectStatement_scores_Cost_all = "SELECT TB_Scores_Cost_2015.id,LowestCost,Accuracy,EventDay,Presentation,Penalties,carid,eventid,Notes FROM TB_Scores_Cost_2015 INNER JOIN TB_Scores on TB_Scores_Cost_2015.scoreid = TB_Scores.id";
var selectStatement_scores_Cost = "SELECT id,  LowestCost, Accuracy,EventDay ,Presentation,Penalties,TotalAchivedPoints, NormalizedScore, Notes FROM TB_Scores_Cost_2015 WHERE scoreid = ?";
var insertStatement_scores_Cost = "INSERT INTO TB_Scores_Cost_2015 ( LowestCost, Accuracy,EventDay ,Presentation,Penalties,TotalAchivedPoints,  Notes, scoreid )  VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement_scores_Cost = "UPDATE TB_Scores_Cost_2015 SET LowestCost = ?, Accuracy = ?, EventDay = ?, Presentation = ?, Penalties = ?, TotalAchivedPoints = ?, Notes = ? WHERE scoreid = ?";
var deleteStatement_scores_Cost = "DELETE FROM TB_Scores_Cost_2015 WHERE scoreid = ?";

// TB_ScoresAcceleration (punteggi)
var selectStatement_scores_acceleration_all = "SELECT TB_Scores_Acceleration.id, scoreid, ";
selectStatement_scores_acceleration_all += " run1time, run1numofcones, run1timeadj, run2time, run2numofcones, run2timeadj,";
selectStatement_scores_acceleration_all += " run3time, run3numofcones, run3timeadj,	run4time, run4numofcones, run4timeadj, carid, eventid";
selectStatement_scores_acceleration_all += " FROM TB_Scores_Acceleration INNER JOIN TB_Scores on TB_Scores_Acceleration.scoreid = TB_Scores.id";
var selectStatement_scores_acceleration = "SELECT id, scoreid, ";
selectStatement_scores_acceleration += " run1time, run1numofcones, run1timeadj, run2time, run2numofcones, run2timeadj,";
selectStatement_scores_acceleration += " run3time, run3numofcones, run3timeadj,	run4time, run4numofcones, run4timeadj";
selectStatement_scores_acceleration += " FROM TB_Scores_Acceleration WHERE scoreid = ?";
var insertStatement_scores_acceleration = "INSERT INTO TB_Scores_Acceleration VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement_scores_acceleration = "UPDATE TB_Scores_Acceleration SET "
updateStatement_scores_acceleration += " run1time = ?, run1numofcones = ?, run1timeadj = ?, run2time = ?, run2numofcones = ?, run2timeadj = ?,"
updateStatement_scores_acceleration += " run3time = ?, run3numofcones = ?, run3timeadj = ?, run4time = ?, run4numofcones = ?, run4timeadj = ? WHERE scoreid = ?";
var deleteStatement_scores_acceleration = "DELETE FROM TB_Scores_Acceleration WHERE scoreid = ?";

// TB_ScoresSkidPad (punteggi)
var selectStatement_scores_skidpad_all = "SELECT TB_Scores_SkidPad.id, scoreid, ";
selectStatement_scores_skidpad_all += " run1time, run1numofcones, run1timeadj, run2time, run2numofcones, run2timeadj,";
selectStatement_scores_skidpad_all += " run3time, run3numofcones, run3timeadj,	run4time, run4numofcones, run4timeadj, carid, eventid";
selectStatement_scores_skidpad_all += " FROM TB_Scores_SkidPad INNER JOIN TB_Scores on TB_Scores_SkidPad.scoreid = TB_Scores.id";
var selectStatement_scores_skidpad = "SELECT id, scoreid, ";
selectStatement_scores_skidpad += " run1time, run1numofcones, run1timeadj, run2time, run2numofcones, run2timeadj,";
selectStatement_scores_skidpad += " run3time, run3numofcones, run3timeadj,	run4time, run4numofcones, run4timeadj";
selectStatement_scores_skidpad += " FROM TB_Scores_SkidPad WHERE scoreid = ?";
var insertStatement_scores_skidpad = "INSERT INTO TB_Scores_SkidPad VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement_scores_skidpad = "UPDATE TB_Scores_SkidPad SET "
updateStatement_scores_skidpad += " run1time = ?, run1numofcones = ?, run1timeadj = ?, run2time = ?, run2numofcones = ?, run2timeadj = ?,"
updateStatement_scores_skidpad += " run3time = ?, run3numofcones = ?, run3timeadj = ?, run4time = ?, run4numofcones = ?, run4timeadj = ? WHERE scoreid = ?";
var deleteStatement_scores_skidpad = "DELETE FROM TB_Scores_SkidPad WHERE scoreid = ?";

// TB_ScoresAutocross (punteggi)
var selectStatement_scores_autocross_all = "SELECT TB_Scores_AutoCross.id, scoreid, ";
selectStatement_scores_autocross_all += " run1time, run1numofcones, run1doc, run1timeadj, run2time, run2numofcones, run2doc, run2timeadj,";
selectStatement_scores_autocross_all += " run3time, run3numofcones, run3doc, run3timeadj, run4time, run4numofcones, run4doc, run4timeadj, carid, eventid";
selectStatement_scores_autocross_all += " FROM TB_Scores_AutoCross INNER JOIN TB_Scores on TB_Scores_AutoCross.scoreid = TB_Scores.id";
var selectStatement_scores_autocross = "SELECT id, scoreid, ";
selectStatement_scores_autocross += " run1time, run1numofcones, run1doc, run1timeadj, run2time, run2numofcones, run2doc, run2timeadj,";
selectStatement_scores_autocross += " run3time, run3numofcones, run3doc, run3timeadj, run4time, run4numofcones, run4doc, run4timeadj";
selectStatement_scores_autocross += " FROM TB_Scores_AutoCross WHERE scoreid = ?";
var insertStatement_scores_autocross = "INSERT INTO TB_Scores_AutoCross VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement_scores_autocross = "UPDATE TB_Scores_AutoCross SET "
updateStatement_scores_autocross += " run1time = ?, run1numofcones = ?, run1doc = ?, run1timeadj = ?, run2time = ?, run2numofcones = ?, run2doc = ?, run2timeadj = ?,"
updateStatement_scores_autocross += " run3time = ?, run3numofcones = ?, run3doc = ?, run3timeadj = ?, run4time = ?, run4numofcones = ?, run4doc = ?, run4timeadj = ? WHERE scoreid = ?";
var deleteStatement_scores_autocross = "DELETE FROM TB_Scores_AutoCross WHERE scoreid = ?";

// TB_ScoresEndurance (punteggi)
var selectStatement_scores_endurance_all = "SELECT TB_Scores_Endurance.id, scoreid, ";
selectStatement_scores_endurance_all += " time, laps, penalities, cones, doc, fuelused, fueltype, carid, eventid";
selectStatement_scores_endurance_all += " FROM TB_Scores_Endurance INNER JOIN TB_Scores on TB_Scores_Endurance.scoreid = TB_Scores.id";
var selectStatement_scores_endurance = "SELECT id, scoreid, ";
selectStatement_scores_endurance += " time, laps, penalities, cones, doc, fuelused, fueltype";
selectStatement_scores_endurance += " FROM TB_Scores_Endurance WHERE scoreid = ?";
var insertStatement_scores_endurance = "INSERT INTO TB_Scores_Endurance VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement_scores_endurance = "UPDATE TB_Scores_Endurance SET "
updateStatement_scores_endurance += " time = ?, laps = ?, penalities = ?, cones = ?, doc = ?, fuelused = ?, fueltype = ?";
updateStatement_scores_endurance += " WHERE scoreid = ?";
var deleteStatement_scores_endurance = "DELETE FROM TB_Scores_Endurance WHERE scoreid = ?";

// -----------------------------------------------------------------------------------------------------------------------
// COMMON FUNCTIONS ------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function initDatabaseToLastVersion() {
	if (isATablet()) {
        try {
            ////FDT TODO - test sql lite
            //if (!window.sqlitePlugin.openDatabase) {
            if (!window.openDatabase) { // Check browser is supported SQLite or not.
                //FDT - ATA 2024 - commento l'avviso che provoca solo confiusione: openDataBase non è più supportato
                //ataToast("Databases are not supported in this browser.", 4000);
                //db = openDatabase("FormulaATA", "2.0", "Formula ATA", 2 * 1024 * 1024); 
                //createTable_versions();
			}
            else {

                //db = window.sqlitePlugin.openDatabase({ name: 'FormulaATA', location: 'default' });

				createTable_versions();
			}

		}
		catch (e) {
			if (e == 2) {
				// Version number mismatch. 
				console.log("initDatabaseToLastVersion : Invalid database version.");
			} else {
				console.log("initDatabaseToLastVersion : Unknown error " + e + ".");
			}
			return;
		}
	}
	else {
	}
}

function initDatabase() {
	try {
		if (!window.openDatabase) { // Check browser is supported SQLite or not.
			ataToast("Databases are not supported in this browser.", 4000);
		}
		else {
			//createTable_versions();               
			createTable_fuels();
			createTable_classes();
			createTable_cars();
			createTable_teams();
			createTable_examiners();
			createTable_examboards();
			createTable_examboards2examiners();
			createTable_examboards2cars();
			createTable_eventstypes();
			createTable_eventsnames();
			createTable_events();

			createTable_scores();
			createTable_scores_design1E();
            createTable_scores_design1C3();
			createTable_scores_presentation();
			createTable_scores_cost();
			createTable_scores_acceleration();
			createTable_scores_skidpad();
			createTable_scores_autocross();
			createTable_scores_endurance();

			//Event 2018 - Show partials scores for Presentation and Design
			createView_scores_partial_design1E();
			createView_scores_partial_design1C3();
			createView_scores_partial_presentation();

			createView_cars();
			createView_examboards2examiners();
			createView_examboards2cars();
			createView_events();

			createTrigger_delete_car_examboards2cars();
			createTrigger_delete_car_scores();
			createTrigger_delete_car_scores_design1E();
			createTrigger_delete_car_scores_design1C3();
			createTrigger_delete_car_scores_presentation();
			createTrigger_delete_car_scores_cost();
			createTrigger_delete_car_scores_acceleration();
			createTrigger_delete_car_scores_skidpad();
			createTrigger_delete_car_scores_autocross();
			createTrigger_delete_car_scores_endurance();
		}

	}
	catch (e) {
		if (e == 2) {
			// Version number mismatch. 
			console.log("initDatabase : Invalid database version.");
		} else {
			console.log("initDatabase : Unknown error " + e + ".");
		}
		return;
	}
}

function onError(tx, error) {
	//alert(error.message);
    ataToast(error.message, 4000);
    console.log("Errore: ", error.message)
}

function foo() {
	//does nothing
}

// -----------------------------------------------------------------------------------------------------------------------
// VERSIONS FUNCTIONS ----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_versions() {
	console.log('createTable_versions');

	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_versions,
            [],
            function (tx, result) {
            	loadRecord_version();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_versions() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_versions,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function loadRecord_version() {
	console.log('loadRecord_version');
	db.transaction(function (tx) {
		tx.executeSql(
            selectStatement_versions,
            [dbCurrentVersion],
            function (tx, result) {
            	dataset_versions = result.rows;
            	if (dataset_versions.length == 0) {
            		console.log('loadRecord_version : insertRecords_versions');
            		//New DB has been created, so drop all tables and views and re-create DB
            		var dNow = new Date();
            		var twoDigitMonth = ((dNow.getMonth().length + 1) == 1) ? (dNow.getMonth() + 1) : '0' + (dNow.getMonth() + 1);
            		var versionDate = dNow.getDate() + '.' + twoDigitMonth + '.' + dNow.getFullYear();
            		insertRecords_versions(dbCurrentVersion, versionDate);
            	}
            	else {
            		//Just load DB
            		initDatabase();
            	}
            }
        );
	});
}

function insertRecords_versions(version, versiondate) {
	db.transaction(function (tx) {
		tx.executeSql(
            insertStatement_versions,
            [version, versiondate, version],
            function (tx, result) {
            	//drop all tables and views and re-create DB
            	dropAll_versions();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

var arOfTablesAndViews = [];

function dropAll_versions() {
	console.log('dropAll_versions : ' + selectAllStatement_tables_views);

	db.transaction(function (tx) {
		tx.executeSql(
            selectAllStatement_tables_views,
            [],
            function (tx, result) {
            	//drop all tables and views and re-create DB
            	dataset_versions = result.rows;
            	for (var i = 0; i < dataset_versions.length; i++) {

            		var item = dataset_versions.item(i);
            		arOfTablesAndViews.push(item['dropstatement'].toString().toUpperCase());

            		console.log('dropAll_versions : ' + item['dropstatement'].toString().toUpperCase());
            	}
            	dropAll_versions_step2();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropAll_versions_step2() {

	console.log('dropAll_versions_step2 : just entered ' + arOfTablesAndViews.join(' '));
	console.log('dropAll_versions_step2 : arOfTablesAndViews.length ' + arOfTablesAndViews.length);

	if (arOfTablesAndViews.length == 0) {
		console.log('dropAll_versions_step2 : arOfTablesAndViews.length IS ZERO, call initDatabase');
		initDatabase();
		return;
	}

	console.log('dropAll_versions_step2 : before jQuery.each');

	jQuery.each(arOfTablesAndViews, function (index, item) {
		arOfTablesAndViews = jQuery.grep(arOfTablesAndViews, function (value) {
			return value != item;
		});

		console.log('dropAll_versions_step2 : item ' + item);
		console.log('dropAll_versions_step2 : after  jQuery.each ' + arOfTablesAndViews.join(' '));

		db.transaction(function (tx) {
			tx.executeSql(
                'DROP ' + item,
                [],
                function (tx, result) {
                	dropAll_versions_step2();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});

		dropAll_versions_step2();
	});
}

// -----------------------------------------------------------------------------------------------------------------------
// FUELS FUNCTIONS -------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_fuels() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_fuels,
            [],
            function (tx, result) {
            	insertRecords_fuels();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_fuels() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_fuels,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecords_fuels() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(insertStatement_fuels, ["98RON", "98RON"]);
			tx.executeSql(insertStatement_fuels, ["E85", "E85"]);
			tx.executeSql(insertStatement_fuels, ["Electric", "Electric"]);
		});
	}
	else {
		WSInsertFuel('98RON');
		WSInsertFuel('E85');
		WSInsertFuel('Electric');
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// CLASSES FUNCTIONS -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_classes() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_classes,
            [],
            function (tx, result) {
            	insertRecords_classes();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_classes() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_classes,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecords_classes() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(insertStatement_classes, ["1C", "1C"]);
			tx.executeSql(insertStatement_classes, ["1E", "1E"]);
			tx.executeSql(insertStatement_classes, ["3", "3"]);
		});
	}
	else {
		WS_insertRecords_classes('1C');
		WS_insertRecords_classes('1E');
		WS_insertRecords_classes('3');
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// CARS ------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_cars,
            [],
            function (tx, result) {
            	showRecords_cars();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function createView_cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementView_cars,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_cars,
            [],
            function (tx, result) {
            	showRecords_cars();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropView_cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatementView_cars,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecord_cars() {
	var carno = $("#carno").val().toString();
	var regno = $("#regno").val().toString();
	var teamid = $("#teamid").val().toString();
	var classid = $("#classid").val().toString();
	var fuelid = $("#fuelid").val().toString();
	var deliverydocdate = $("#deliverydocdate").val().toString();
	var boxno = $("#boxno").val().toString();

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_cars,
                [carno, regno, teamid, classid, fuelid, deliverydocdate, boxno],
                function (tx, result) {
                	loadAndReset_cars();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_insertRecord_cars(carno, regno, teamid, classid, fuelid, deliverydocdate, boxno);
	}
}

function deleteRecord_cars(i) {
	if (isATablet()) {
		var item = dataset_cars.item(i);
		var iddelete = item['id'].toString();

		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_cars,
                [iddelete],
                function (tx, result) {
                	ataToast("The item has been successfully deleted", 4000);
                	showRecords_cars();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		var item = dataset_cars[i];
		var iddelete = item.Id.toString();
		WS_deleteRecord_cars(iddelete);
	}

	resetForm_cars();
}

function updateRecord_cars() {
	var carno = $("#carno").val().toString();
	var regno = $("#regno").val().toString();
	var teamid = $("#teamid").val().toString();
	var classid = $("#classid").val().toString();
	var fuelid = $("#fuelid").val().toString();
	var deliverydocdate = $("#deliverydocdate").val().toString();
	var boxno = $("#boxno").val().toString();

	var id = $("#id").val();

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_cars,
                [carno, regno, teamid, classid, fuelid, deliverydocdate, boxno, Number(id)],
                function (tx, result) {
                	loadAndReset_cars();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_updateRecord_cars(id, carno, regno, teamid, classid, fuelid, deliverydocdate, boxno);
	}
}

function loadRecord_cars(i) {

	if (isATablet()) {
		var item = dataset_cars.item(i);

		$("#carno").val((item['carno']).toString());
		$("#regno").val((item['regno']).toString());
		$("#teamid").val((item['teamid']).toString());
		$("#classid").val((item['classid']).toString());
		$("#fuelid").val((item['fuelid']).toString());

		if (deliveryDocDateParsed != null) {
			$("#deliverydocdate").val((item['deliverydocdate']).toString());
			datepickerSetValue("#deliverydocdate", $("#deliverydocdate").val());
		}

		$("#boxno").val((item['boxno']).toString());

		$("#id").val((item['id']).toString());
	}
	else {

		var item = dataset_cars[i];
		var deliveryDocDateParsed = datefyJSON(item['deliverydocdate']);

		$("#carno").val(item.Carno.toString());
		$("#regno").val(item.Regno.toString());
		$("#teamid").val(item.Team.Id.toString());
		$("#classid").val(item.Class.Id.toString());
		$("#fuelid").val(item.Fuel.Id.toString());

		if (deliveryDocDateParsed != null) {
			$("#deliverydocdate").val(deliveryDocDateParsed.toString());
			datepickerSetValue("#deliverydocdate", $("#deliverydocdate").val());
		}

		$("#boxno").val(item.BoxNo.toString());

		$("#id").val(item.Id.toString());
	}

	//Refresh selects otherwise does not work!
	$('#classid').material_select();
	$('#fuelid').material_select();
	$('#teamid').material_select();
}

function resetForm_cars() {
	$("#carno").val("");
	$("#regno").val("");
	$("#teamid").val("");
	$("#classid").val("");
	$("#fuelid").val("");

	$("#deliverydocdate").val("");
	datepickerSetValue("#deliverydocdate", $("#deliverydocdate").val());

	$("#boxno").val("");

	$("#id").val("");

	showRecords_cars_classes();
	showRecords_cars_fuels();
	showRecords_cars_teams();
}

function loadAndReset_cars() {
	resetForm_cars();
	showRecords_cars();
}

function showRecords_cars() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_cars + sessionStorage.filterByCars,
                [],
                function (tx, result) {
                	waitON();
                	$("#tbodyCars").html('');

                	dataset_cars = result.rows;

                	for (var i = 0; i < dataset_cars.length; i++) {

                		var item = dataset_cars.item(i);

                		var text2Append = '';

                		//Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                		var trClassName = '';
                		if (isAnElectricCar(item['fuelname'])) {
                			trClassName = " class='electric' ";
                		}
                		else {
                			trClassName = " class='not-electric' ";
                		}

                		text2Append += '<tr' + trClassName + '>';

                		text2Append += '<td align="right">';
                		text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                		var isReadonly = (item['readonly'] == 0) ? ' ata-green' : ' gray disabled ';
                		text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="if (!$(this).hasClass(&#39;disabled&#39;)) {deleteRecord(' + i + ');} return false;"><i class="mdi mdi-delete"></i></a>';
                		text2Append += '</td>';

                		text2Append += '<td>' + item['carno'].toString() + '&nbsp;</td>';
                		text2Append += '<td>' + item['teamname'].toString() + '&nbsp;</td>';
                		text2Append += '<td>' + item['university'].toString() + '&nbsp;</td>';
                		text2Append += '<td>' + item['country'].toString() + '&nbsp;</td>';
                		text2Append += '<td>' + item['classname'].toString() + '&nbsp;</td>';
                		text2Append += '<td>' + item['fuelname'].toString() + '&nbsp;</td>';
                		text2Append += '<td>' + item['deliverydocdate'].toString() + '&nbsp;</td>';
                		text2Append += '<td>' + item['boxno'].toString() + '&nbsp;</td>';

                		text2Append += '</tr>';

                		$("#tbodyCars").append(text2Append);
                	}
                	$("#tCars").stupidtable();
                	waitOFF();
                }
            );
		});
	}
	else {
		if (sessionStorage.filterByCars.length > 0) {
			var carno = $("#searchcarno").val();
			//var regno = $("#searchregno").val();
			var regno = "";
			var teamid = $("#searchteamid").val();
			var classid = $("#searchclassid").val();
			var fuelid = $("#searchfuelid").val();
			var deliverydocdate = $("#searchdeliverydocdate").val();
			var boxno = $("#searchboxno").val();
			WS_showRecords_cars_byfilters(carno, regno, teamid, classid, fuelid, deliverydocdate, boxno);
		}
		else {
			WS_showRecords_cars();
		}
	}
}

function showRecords_cars_classes(ooId) {
	ooId = (typeof ooId != 'undefined' ? ooId : 'classid');
	var firstOption = (typeof ooId != 'undefined' ? 'Class' : 'Select a Class');

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_classes + ' ORDER BY classname',
                [],
                function (tx, result) {
                	dataset_classes = result.rows;

                	$('#' + ooId).empty();

                	$('#' + ooId).append($('<option>', { value: '', text: firstOption }));

                	for (var i = 0; i < dataset_classes.length; i++) {
                		var item = dataset_classes.item(i);
                		$('#' + ooId).append($('<option>', { value: item['id'], text: item['classname'] }));
                	}

                	$('#' + ooId).material_select();

                }
            );
		});
	}
	else {
		WS_showRecords_cars_classes(ooId);
	}
}

function showRecords_cars_fuels(ooId) {
	ooId = (typeof ooId != 'undefined' ? ooId : 'fuelid');
	var firstOption = (typeof ooId != 'undefined' ? 'Fuel' : 'Select a Fuel');

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_fuels + ' ORDER BY fuelname',
                [],
                function (tx, result) {
                	dataset_fuels = result.rows;

                	$('#' + ooId).empty();

                	$('#' + ooId).append($('<option>', { value: '', text: firstOption }));

                	for (var i = 0; i < dataset_fuels.length; i++) {
                		var item = dataset_fuels.item(i);
                		$('#' + ooId).append($('<option>', { value: item['id'], text: item['fuelname'] }));
                	}

                	$('#' + ooId).material_select();

                }
            );
		});
	}
	else {
		WS_showRecords_cars_fuels(ooId);
	}
}

function showRecords_cars_teams(ooId) {
	if (isATablet()) {
		ooId = (typeof ooId != 'undefined' ? ooId : 'teamid');
		var firstOption = (typeof ooId != 'undefined' ? 'Team' : 'Select a Team');

		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_teams + ' ORDER BY teamname',
                [],
                function (tx, result) {
                	dataset_teams = result.rows;

                	$('#' + ooId).empty();

                	$('#' + ooId).append($('<option>', { value: '', text: firstOption }));

                	for (var i = 0; i < dataset_teams.length; i++) {
                		var item = dataset_teams.item(i);
                		$('#' + ooId).append($('<option>', { value: item['id'], text: item['teamname'] }));
                	}

                	$('#' + ooId).material_select();

                }
            );
		});
	}
	else {
		WS_showRecords_cars_teams(ooId);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// TEAMS FUNCTIONS -------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_teams() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_teams,
            [],
            function (tx, result) {
            	showRecords_teams();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_teams() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_teams,
            [],
            function (tx, result) {
            	showRecords_teams();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function insertRecord_teams() {
	var teamname = $("#teamname").val().toString();
	var university = $("#university").val().toString();
	var country = $("#country").val().toString();

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_teams,
                [teamname, university, country],
                function (tx, result) {
                	loadAndReset_teams();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_insertRecord_teams(teamname, university, country);
	}
}

function deleteRecord_teams(i) {
	if (isATablet()) {
		var item = dataset_teams.item(i);
		var iddelete = item['id'].toString();

		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_teams,
                [iddelete],
                function (tx, result) {
                	ataToast("The item has been successfully deleted", 4000);
                	showRecords_teams();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		var item = dataset_teams[i];
		var iddelete = item.Id.toString();
		WS_deleteRecord_teams(iddelete);
	}

	resetForm_teams();
}

function updateRecord_teams() {
	var teamname = $("#teamname").val().toString();
	var university = $("#university").val().toString();
	var country = $("#country").val().toString();

	var id = $("#id").val();

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_teams,
                [teamname, university, country, Number(id)],
                function (tx, result) {
                	loadAndReset_teams();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_updateRecord_teams(id, teamname, university, country);
	}

}

function loadRecord_teams(i) {
	if (isATablet()) {
		var item = dataset_teams.item(i);

		$("#teamname").val((item['teamname']).toString());
		$("#university").val((item['university']).toString());
		$("#country").val((item['country']).toString());

		$("#id").val((item['id']).toString());
	}
	else {
		var item = dataset_teams[i];

		$("#teamname").val((item.Name).toString());
		$("#university").val((item.University).toString());
		$("#country").val((item.Country).toString());

		$("#id").val((item.Id).toString());
	}
}

function resetForm_teams() {
	$("#teamname").val("");
	$("#university").val("");
	$("#country").val("");

	$("#id").val("");
}

function loadAndReset_teams() {
	resetForm_teams();
	showRecords_teams();
}

function showRecords_teams() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_teams,
                [],
                function (tx, result) {
                	waitON();
                	$("#tbodyTeams").html('');

                	dataset_teams = result.rows;

                	for (var i = 0; i < dataset_teams.length; i++) {

                		var item = dataset_teams.item(i);

                		var text2Append = '';

                		text2Append += '<tr>';

                		text2Append += '<td align="right">';
                		text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                		var isReadonly = (item['readonly'] == 0) ? ' ata-green' : ' gray disabled ';
                		text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="if (!$(this).hasClass(&#39;disabled&#39;)) {deleteRecord(' + i + ');} return false;"><i class="mdi mdi-delete"></i></a>';
                		text2Append += '</td>';

                		text2Append += '<td>' + item['teamname'] + '</td>';
                		text2Append += '<td>' + item['university'] + '</td>';
                		text2Append += '<td>' + item['country'] + '</td>';

                		text2Append += '</tr>';

                		$("#tbodyTeams").append(text2Append);
                	}
                	$('#tTeam').stupidtable();
                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_teams();
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// EXAMINERS -------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_examiners() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_examiners,
            [],
            function (tx, result) {
            	showRecords_examiners();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_examiners() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_examiners,
            [],
            function (tx, result) {
            	showRecords_examiners();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function insertRecord_examiners() {
	var firstname = $("#firstname").val().toString();
	var surname = $("#surname").val().toString();
	var phone = $("#phone").val().toString();

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_examiners,
                [firstname, surname, phone],
                function (tx, result) {
                	loadAndReset_examiners();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_insertRecord_examiners(firstname, surname, phone);
	}
}

function deleteRecord_examiners(i) {
	if (isATablet()) {
		var item = dataset_examiners.item(i);
		var iddelete = item['id'].toString();

		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_examiners,
                [iddelete],
                function (tx, result) {
                	ataToast("The item has been successfully deleted", 4000);
                	showRecords_examiners();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		var item = dataset_examiners[i];
		var iddelete = item.Id.toString();
		WS_deleteRecord_examiners(iddelete);
	}
	resetForm_examiners();
}

function updateRecord_examiners() {
	var firstname = $("#firstname").val().toString();
	var surname = $("#surname").val().toString();
	var phone = $("#phone").val().toString();

	var id = $("#id").val();

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_examiners,
                [firstname, surname, phone, Number(id)],
                function (tx, result) {
                	loadAndReset_examiners();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_updateRecord_examiners(id, firstname, surname, phone);
	}
}

function loadRecord_examiners(i) {
	if (isATablet()) {
		var item = dataset_examiners.item(i);

		$("#firstname").val((item['firstname']).toString());
		$("#surname").val((item['surname']).toString());
		$("#phone").val((item['phone']).toString());

		$("#id").val((item['id']).toString());
	}
	else {
		var item = dataset_examiners[i];

		$("#firstname").val((item.FirstName).toString());
		$("#surname").val((item.Surname).toString());
		$("#phone").val((item.Phone).toString());

		$("#id").val((item.Id).toString());
	}
}

function resetForm_examiners() {
	$("#firstname").val("");
	$("#surname").val("");
	$("#phone").val("");

	$("#id").val("");
}

function loadAndReset_examiners() {
	resetForm_examiners();
	showRecords_examiners();
}

function showRecords_examiners() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_examiners,
                [],
                function (tx, result) {
                	waitON();
                	$("#tbodyExaminers").html('');

                	dataset_examiners = result.rows;

                	for (var i = 0; i < dataset_examiners.length; i++) {

                		var item = dataset_examiners.item(i);

                		var text2Append = '';

                		text2Append += '<tr>';

                		text2Append += '<td align="right">';
                		text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                		var isReadonly = (item['readonly'] == 0) ? ' ata-green' : ' gray disabled ';
                		text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="if (!$(this).hasClass(&#39;disabled&#39;)) {deleteRecord(' + i + ');} return false"><i class="mdi mdi-delete"></i></a>';
                		text2Append += '</td>';

                		text2Append += '<td>' + item['firstname'] + '</td>';
                		text2Append += '<td>' + item['surname'] + '</td>';
                		text2Append += '<td>' + item['phone'] + '</td>';

                		text2Append += '</tr>';

                		$("#tbodyExaminers").append(text2Append);
                	}
                	$('#tExaminers').stupidtable();
                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_examiners();
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// EXAMBOARDS ------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_examboards() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_examboards,
            [],
            function (tx, result) {
            	showRecords_examboards();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_examboards() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_examboards,
            [],
            function (tx, result) {
            	showRecords_examboards();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function insertRecord_examboards() {
	var examboardname = $("#examboardname").val().toString();
	var description = $("#description").val().toString();
	var usecolor = $("#usecolor").prop('checked');
	var color = $("#color").val().toString();

	//AF - Giu 2016 - Examboard is connected to a single Event
	var eventid = $("#eventid").val().toString();

	usecolor = Number(usecolor);

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_examboards,
                [examboardname, description, usecolor, color, eventid],
                function (tx, result) {
                	loadAndReset_examboards();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_insertRecord_examboards(examboardname, description, usecolor, color, eventid);
	}
}

function deleteRecord_examboards() {
	var idddelete = $("#id2Edit").val();
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_examboards,
                [iddelete],
                function (tx, result) {
                	ataToast("The item has been successfully deleted", 4000);
                	showRecords_examboards();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_deleteRecord_examboards(idddelete);
	}

	resetForm_examboards();
}

function updateRecord_examboards() {
	var examboardname = $("#examboardname").val().toString();
	var description = $("#description").val().toString();
	var usecolor = $("#usecolor").prop('checked');
	var color = $("#color").val().toString();

	//AF - Giu 2016 - Examboard is connected to a single Event
	var eventid = $("#eventid").val().toString();

	var id = $("#id").val();

	usecolor = Number(usecolor);

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_examboards,
                [examboardname, description, usecolor, color, eventid, Number(id)],
                function (tx, result) {
                	loadAndReset_examboards();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_updateRecord_examboards(id, examboardname, description, usecolor, color, eventid);
	}
}

function loadRecord_examboards(item) {
	//AF - Giu 2016 - Examboard is connected to a single Event
	var eventid;

	if (isATablet()) {
		$("#examboardname").val((item['examboardname']).toString());
		$("#description").val((item['description']).toString());
		$("#usecolor").prop('checked', Boolean(item['usecolor']));
		$("#color").val((item['color']).toString());
		$("#eventid").val((item['eventid']).toString());

		$("#id").val((item['examboardid']).toString());
		eventid = item['eventid'];
	}
	else {
		$("#examboardname").val((item.Name).toString());
		$("#description").val((item.Description).toString());
		$("#usecolor").prop('checked', Boolean(item.IsColorUsed));
		$("#color").val((item.Color).toString());
		$("#eventid").val((item.Event.Id).toString());

		$("#id").val((item.Id).toString());
		eventid = item.Event.Id;
	}

	//Refresh selects otherwise does not work!
	showRecords_examboards_events(eventid.toString());
}

function resetForm_examboards() {
	$("#examboardname").val("");
	$("#description").val("");
	$("#usecolor").val("");
	$("#color").val("#ffffff");

	//AF - Giu 2016 - Examboard is connected to a single Event
	$("#eventid").val("");

	$("#id").val("");
}

function loadAndReset_examboards() {
	resetForm_examboards();
	showRecords_examboards();
}

function showRecords_examboards() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_examboards2examiners,
                [],
                function (tx, result) {
                	waitON();
                	$("#tbodyExamBoards").html('');

                	dataset_examboards = result.rows;

                	var currentExamBoard = '';

                	if (dataset_examboards.length > 0) {
                		$("#tbodyExamBoards").append('<tr><td><ul class="collection" id="ulCollection">');
                		$("#tbodyExamBoards").append('</ul></td><tr>');

                		for (var i = 0; i < dataset_examboards.length; i++) {

                			var item = dataset_examboards.item(i);
                			var lineId = item['examboardid'].toString();

                			if (currentExamBoard.toString() != item['examboardid'].toString()) {
                				$("#ulCollection").append('<li class="collection-item avatar autoheight" id="li' + lineId + '">');
                				$("#ulCollection").append('</li>');

                				$("#li" + lineId).append('<i class="mdi mdi-gavel circle ata-red"></i>');
                				$("#li" + lineId).append('<span class="title ata-green-text">' + item['examboardname'].toString() + '</span>&nbsp;-&nbsp;');
                				$("#li" + lineId).append('<span class="title ata-green-text">' + item['description'].toString() + '</span>');

                				//AF - Giu 2016 - Examboard is connected to a single Event
                				var img = '<br/><i class="mdi mdi-timer amber-text"></i>&nbsp;';
                				$("#li" + lineId).append(img + '<span class="title amber-text">' + item['eventname'].toString() + '</span>');

                				$("#li" + lineId).append('<p id="p' + lineId + '">');

                				$("#li" + lineId).append('</p>');
                				$("#li" + lineId).append('<p id="pp' + lineId + '">');

                				$("#li" + lineId).append('</p>');
                				$("#li" + lineId).append('<a href="#!" class="secondary-content secondary-content btn-floating ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>');

                				currentExamBoard = item['examboardid'].toString();
                			}

                			if ((item['firstname'].toString().length > 0) || (item['surname'].toString().length > 0)) {
                				var img = '<i class="mdi-action-assignment-ind"></i>&nbsp;';
                				$("#p" + lineId).append(img + item['firstname'] + '&nbsp;' + item['surname'].bold() + '&nbsp;&nbsp;');
                			}
                		}
                		//Visualizzare solo i giudici e non le auto - req.Ciadamidaro Set 2015
                		//showRecords_examboards_cars_step1();
                	}
                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_examboards();
	}
}

function showRecords_examboards_cars_step1() {
	db.transaction(function (tx) {
		tx.executeSql(
            selectStatement_examboards2examiners_all_examboards_id,
            [],
            function (tx, result) {
            	var dataset_examboards_distinct = result.rows;
            	for (var i = 0; i < dataset_examboards_distinct.length; i++) {

            		var item = dataset_examboards_distinct.item(i);
            		var lineId = item['examboardid'].toString();
            		showRecords_examboards_cars_step2(lineId);
            	}
            }
        );
	});
}

function showRecords_examboards_cars_step2(examboardid) {
	db.transaction(function (tx) {
		tx.executeSql(
            selectStatement_examboards2cars,
            [examboardid],
            function (tx, result) {
            	dataset_examboards2cars = result.rows;

            	if (dataset_examboards2cars.length > 0) {
            		var img = '<i class="mdi-maps-directions-car"></i>&nbsp;';
            		var string2append = '';

            		for (var i = 0; i < dataset_examboards2cars.length; i++) {
            			var item = dataset_examboards2cars.item(i);

            			if (item['carno'].toString().length > 0) {
            				string2append += img;
            				string2append += item['carno'].toString().bold() + '&nbsp;';
            				//string2append += item['regno'].toString().bold() + '&nbsp;';
            				string2append += item['teamname'].toString().bold() + '&nbsp;';
            				string2append += item['university'].toString() + '&nbsp;';
            				//string2append += item['classname'].toString() + '&nbsp;';
            				//string2append += item['fuelname'].toString() + '&nbsp;';
            				//string2append += item['boxno'].toString();
            			}
            		}
            		$("#pp" + examboardid).append(string2append);
            	}
            }
        );
	});
}

//Function for retrieve data from Database, shows records as listbox
//AF - Giu 2016 - Examboard is connected to a single Event
function showRecords_examboards_events(preselectedValue) {
	preselectedValue = (typeof preselectedValue != 'undefined' ? preselectedValue : '');

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_events + ' ORDER BY eventname',
                [],
                function (tx, result) {
                	dataset_eventstypes = result.rows;

                	$('#eventid').empty();

                	$('#eventid').append($('<option>', { value: '', text: 'Select an Event' }));

                	for (var i = 0; i < dataset_eventstypes.length; i++) {
                		var item = dataset_eventstypes.item(i);
                		$('#eventid').append($('<option>', { value: item['id'], text: item['eventname'] }));
                	}

                	if (preselectedValue.length > 0) {
                		$('#eventid').val(preselectedValue.toString());
                	}
                	$('#eventid').material_select();
                }
            );
		});
	}
	else {
		WS_showRecords_examboards_events(preselectedValue);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// EXAMBOARDS2EXAMINERS --------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_examboards2examiners() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_examboards2examiners,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_examboards2examiners() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_examboards2examiners,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function createView_examboards2examiners() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementView_examboards2examiners,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropView_examboards2examiners() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatementView_examboards2examiners,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecord_examboards2examiners(examboardid, examinerid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_examboards2examiners,
                [examboardid, examinerid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_insertRecord_examboards2examiners(examboardid, examinerid);
	}
}

function deleteRecord_examboards2examiners(examboardid, examinerid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_examboards2examiners,
                [examboardid, examinerid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_examboards2examiners(examboardid, examinerid);
	}
}

function showRecords_examboards2examiners(item) {
	if (isATablet()) {
		var examboardid = (item['examboardid']).toString();

		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_examboards2examiners_availableOnly,
                [examboardid],
                function (tx, result) {
                	$("#tbodyExamBoards2Examiners").html('');

                	dataset_examiners = result.rows;

                	for (var i = 0; i < dataset_examiners.length; i++) {

                		var item = dataset_examiners.item(i);
                		var examinerid = (item['id']).toString();

                		var linkcheck = '';

                		linkcheck += '<tr>';
                		linkcheck += '<td>';
                		linkcheck += '<input type="checkbox" class="filled-in" id="chkExaminer' + examinerid + '" name="chkExaminer" onclick="checkExaminer(this);" value="' + examinerid + '" />';
                		linkcheck += '<label for="chkExaminer' + examinerid + '">&nbsp;</label>';
                		linkcheck += '</td>';

                		linkcheck += '<td>' + item['firstname'] + '</td>';
                		linkcheck += '<td>' + item['surname'] + '</td>';

                		linkcheck += '</tr>';

                		$("#tbodyExamBoards2Examiners").append(linkcheck);
                	}
                }
            );
		});

		//Check cars assigned to selected Team
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_examboards2examiners,
                [examboardid],
                function (tx, result) {
                	dataset_examboards2examiners = result.rows;

                	for (var i = 0; i < dataset_examboards2examiners.length; i++) {

                		var item = dataset_examboards2examiners.item(i);
                		var examinerid = (item['examinerid']).toString();

                		$('#chkExaminer' + examinerid).prop('checked', true);
                	}
                }
            );
		});
	}
	else {
		var examboardid = (item.Id).toString();
		WS_showRecords_examboards2examiners(examboardid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// EXAMBOARDS2CARS -------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_examboards2cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_examboards2cars,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_examboards2cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_examboards2cars,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function createView_examboards2cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementView_examboards2cars,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropView_examboards2cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatementView_examboards2cars,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecord_examboards2cars(examboardid, carid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_examboards2cars,
                [examboardid, carid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_insertRecord_examboards2cars(examboardid, carid);
	}
}

function deleteRecord_examboards2cars(examboardid, carid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_examboards2cars,
                [examboardid, carid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_examboards2cars(examboardid, carid);
	}
}

function showRecords_examboards2cars(item) {
	if (isATablet()) {
		var examboardid = (item['examboardid']).toString();

		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_examboards2cars_availableOnly,          //selectAllStatement_cars
                [examboardid],
                function (tx, result) {
                	$("#tbodyExamBoards2Cars").html('');

                	dataset_cars = result.rows;

                	for (var i = 0; i < dataset_cars.length; i++) {

                		var item = dataset_cars.item(i);
                		var carid = (item['id']).toString();

                		var linkcheck = '';

                		//Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                		var trClassName = '';
                		if (isAnElectricCar(item['fuelname'])) {
                			trClassName = " class='electric' ";
                		}
                		else {
                			trClassName = " class='not-electric' ";
                		}

                		linkcheck += '<tr' + trClassName + '>';

                		linkcheck += '<td>';
                		linkcheck += '<input type="checkbox" class="filled-in" id="chkCar' + carid + '" name="chkCar" onclick="checkCar(this);" value="' + carid + '" />';
                		linkcheck += '<label for="chkCar' + carid + '">&nbsp;</label>';
                		linkcheck += '</td>';

                		linkcheck += '<td>' + item['carno'] + '</td>';
                		//linkcheck += '<td>' + item['regno'] + '</td>';
                		linkcheck += '<td>' + item['teamname'] + '</td>';
                		linkcheck += '<td>' + item['university'] + '</td>';
                		linkcheck += '<td>' + item['classname'] + '</td>';
                		linkcheck += '<td>' + item['fuelname'] + '</td>';
                		linkcheck += '<td>' + item['deliverydocdate'] + '</td>';
                		linkcheck += '<td>' + item['boxno'] + '</td>';

                		linkcheck += '</tr>';

                		$("#tbodyExamBoards2Cars").append(linkcheck);
                	}
                }
            );
		});

		//Check cars assigned to selected Team
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_examboards2cars,
                [examboardid],
                function (tx, result) {
                	dataset_examboards2cars = result.rows;

                	for (var i = 0; i < dataset_examboards2cars.length; i++) {

                		var item = dataset_examboards2cars.item(i);
                		var carid = (item['carid']).toString();

                		$('#chkCar' + carid).prop('checked', true);
                	}
                }
            );
		});
	}
	else {
		var examboardid = (item.Id).toString();
		WS_showRecords_examboards2cars(examboardid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// EVENTSTYPES FUNCTIONS -------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_eventstypes() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_eventstypes,
            [],
            function (tx, result) {
            	insertRecords_eventstypes();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_eventstypes() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_eventstypes,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecords_eventstypes() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(insertStatement_eventstypes, ["Dynamic Test", "Dynamic Test"]);
			tx.executeSql(insertStatement_eventstypes, ["Static Test", "Static Test"]);
		});
	}
	else {
		WS_insertRecords_eventstypes("Dynamic Test");
		WS_insertRecords_eventstypes("Static Test");
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// EVENTSNAMES FUNCTIONS -------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_eventsnames() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_eventsnames,
            [],
            function (tx, result) {
            	insertRecords_eventsnames();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_eventsnames() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_eventsnames,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecords_eventsnames() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(insertStatement_eventsnames, ["Presentation", "2", "Presentation"]);
			tx.executeSql(insertStatement_eventsnames, ["Cost", "2", "Cost"]);
			tx.executeSql(insertStatement_eventsnames, ["Design", "2", "Design"]);
			tx.executeSql(insertStatement_eventsnames, ["Acceleration", "1", "Acceleration"]);
			tx.executeSql(insertStatement_eventsnames, ["Skid Pad", "1", "Skid Pad"]);
			tx.executeSql(insertStatement_eventsnames, ["AutoCross", "1", "Autocross"]);
			tx.executeSql(insertStatement_eventsnames, ["Endurance", "1", "Endurance"]);
		});
	}
	else {
		WS_insertRecords_eventsnames("Presentation", "2");
		WS_insertRecords_eventsnames("Cost", "2");
		WS_insertRecords_eventsnames("Design", "2");
		WS_insertRecords_eventsnames("Acceleration", "1");
		WS_insertRecords_eventsnames("Skid Pad", "1");
		WS_insertRecords_eventsnames("Autocross", "1");
		WS_insertRecords_eventsnames("Endurance", "1");
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// EVENTS ----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_events() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_events,
            [],
            function (tx, result) {
            	showRecords_events();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function createView_events() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementView_events,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_events() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_events,
            [],
            function (tx, result) {
            	showRecords_events();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropView_events() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatementView_events,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecord_events() {
	var eventtypeid = $("#eventtype").val().toString();
	var eventnameid = $("#eventname").val().toString();
	var description = $("#description").val().toString();
	var scoretypenumeric = $("#scoretypenumeric").prop('checked');
	var maximumscore = $("#maximumscore").val().toString();

	maximumscore = (Boolean(scoretypenumeric)) ? maximumscore : 0;
	scoretypenumeric = Number(scoretypenumeric);

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_events,
                [eventtypeid, eventnameid, description, scoretypenumeric, maximumscore],
                function (tx, result) {
                	endurance_otherFields_update();
                	loadAndReset_events();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_insertRecord_events(eventtypeid, eventnameid, description, scoretypenumeric, maximumscore);
	}
}

function deleteRecord_events(i) {
	if (isATablet()) {
		var item = dataset_events.item(i);
		var iddelete = item['id'].toString();

		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_events,
                [iddelete],
                function (tx, result) {
                	ataToast("The item has been successfully deleted", 4000);
                	showRecords_events();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		var item = dataset_events[i];
		var iddelete = item.Id.toString();
		WS_deleteRecord_events(iddelete);
	}

	resetForm_events();
}

function updateRecord_events() {
	var eventtypeid = $("#eventtype").val().toString();
	var eventnameid = $("#eventname").val().toString();
	var description = $("#description").val().toString();
	var scoretypenumeric = $("#scoretypenumeric").prop('checked');
	var maximumscore = $("#maximumscore").val().toString();

	var id = $("#id").val();

	maximumscore = (Boolean(scoretypenumeric)) ? maximumscore : 0;
	scoretypenumeric = Number(scoretypenumeric);

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_events,
                [eventtypeid, eventnameid, description, scoretypenumeric, maximumscore, Number(id)],
                function (tx, result) {
                	endurance_otherFields_update();
                	loadAndReset_events();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_updateRecord_events(id, eventtypeid, eventnameid, description, scoretypenumeric, maximumscore);
	}
}

function loadRecord_events(i) {
	if (isATablet()) {
		var item = dataset_events.item(i);

		$("#eventtype").val((item['eventtypeid']).toString());
		$("#eventname").val((item['eventnameid']).toString());
		$("#description").val((item['description']).toString());
		$("#scoretypenumeric").prop('checked', Boolean(item['scoretypenumeric']));
		$("#maximumscore").val((item['maximumscore']).toString());

		$("#id").val((item['id']).toString());

		scoretypenumeric_changed();

		//Refresh selects otherwise does not work!
		$('#eventtype').material_select();

		//Preselect the assigned event name
		showRecords_events_eventsnames((item['eventnameid']).toString());
	}
	else {
		var item = dataset_events[i];

		$("#eventtype").val((item.EventType.Id).toString());
		$("#eventname").val((item.EventName.Id).toString());
		$("#description").val((item.Description).toString());
		$("#scoretypenumeric").prop('checked', Boolean(item.IsScoreNumeric));
		$("#maximumscore").val((item.MaximumScore).toString());

		$("#id").val((item.Id).toString());

		scoretypenumeric_changed();

		//Refresh selects otherwise does not work!
		$('#eventtype').material_select();

		//Preselect the assigned event name
		showRecords_events_eventsnames((item.EventName.Id).toString());
	}
}

function resetForm_events() {
	$("#eventtype").val("");
	$("#eventname").val("");
	$("#description").val("");
	$("#scoretypenumeric").val("");
	$("#maximumscore").val("");

	$("#id").val("");

	//Refresh lists
	showRecords_events_eventstypes();
	showRecords_events_eventsnames();
}

function loadAndReset_events() {
	resetForm_events();
	showRecords_events();
}

function showRecords_events() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_events,
                [],
                function (tx, result) {
                	waitON();
                	$("#tbodyEvents").html('');

                	dataset_events = result.rows;

                	for (var i = 0; i < dataset_events.length; i++) {

                		var item = dataset_events.item(i);

                		var text2Append = '';

                		text2Append += '<tr>';

                		text2Append += '<td>';
                		text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                		var isReadonly = (item['readonly'] == 0) ? ' ata-green' : ' gray disabled ';
                		text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="deleteRecord(' + i + ');"><i class="mdi mdi-delete"></i></a>';
                		text2Append += '</td>';

                		text2Append += '<td>' + item['eventtypename'] + '</td>';
                		text2Append += '<td>' + item['eventname'] + '</td>';
                		text2Append += '<td>' + item['description'] + '</td>';

                		var scoreType = (Boolean(item['scoretypenumeric'])) ? 'Numeric (pt.)' : 'Timing (secs)';
                		text2Append += '<td>' + scoreType + '</td>';

                		var maximumscore = item['maximumscore'];
                		if (Number(maximumscore == 0))
                			text2Append += '<td>-</td>';
                		else
                			text2Append += '<td>' + item['maximumscore'] + '&nbsp;pt.</td>';

                		text2Append += '</tr>';

                		$("#tbodyEvents").append(text2Append);
                	}
                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_events();
	}
}

//Function for retrieve data from Database, shows records as listbox
function showRecords_events_eventstypes() {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_eventstypes + ' ORDER BY eventtypename',
                [],
                function (tx, result) {
                	dataset_eventstypes = result.rows;

                	$('#eventtype').empty();

                	$('#eventtype').append($('<option>', { value: '', text: 'Select an Event Type' }));

                	for (var i = 0; i < dataset_eventstypes.length; i++) {
                		var item = dataset_eventstypes.item(i);
                		$('#eventtype').append($('<option>', { value: item['id'], text: item['eventtypename'] }));
                	}

                	$('#eventtype').material_select();

                }
            );
		});
	}
	else {
		WS_showRecords_events_eventstypes();
	}
}

//Function for retrieve data from Database, shows records as listbox
function showRecords_events_eventsnames(preselectedValue) {
	preselectedValue = (typeof preselectedValue != 'undefined' ? preselectedValue : '');

	var eventtypeid = $('#eventtype').val();

	if ((eventtypeid != null) && (eventtypeid != '')) {
		if (isATablet()) {
			db.transaction(function (tx) {
				tx.executeSql(
                    selectStatement_eventsnames_bytype,
                    [eventtypeid],
                    function (tx, result) {
                    	dataset_eventsnames = result.rows;

                    	$('#eventname').empty();
                    	$('#eventname').append($('<option>', { value: '', text: 'Select an Event Name' }));

                    	for (var i = 0; i < dataset_eventsnames.length; i++) {
                    		var item = dataset_eventsnames.item(i);
                    		$('#eventname').append($('<option>', { value: item['id'], text: item['eventname'] }));
                    	}

                    	$('#eventname').removeAttr('disabled');
                    	$('#eventname').material_select();

                    	if (preselectedValue.length > 0) {
                    		$('#eventname').val(preselectedValue);
                    		$('#eventname').material_select();
                    	}

                    	if (typeof (endurance_otherFields) == "function") {
                    		endurance_otherFields();
                    	}
                    }
                );
			});
		}
		else {
			WS_showRecords_events_eventsnames(eventtypeid, preselectedValue);
		}
	}
	else {
		$('#eventname').empty();
		$('#eventname').append($('<option>', { value: '', text: 'Select an Event Name' }));
		$('#eventname').attr('disabled', 'disabled');
		$('#eventname').material_select();

		if (typeof (endurance_otherFields) == "function") {
			endurance_otherFields();
		}
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES ----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function showRecords_scores_cars_classes(preselectedClass) {
	preselectedClass = (typeof preselectedClass != 'undefined' ? preselectedClass : '');
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_scores_cars_classes,
                [],
                function (tx, result) {
                	waitON();
                	$("#divScores_cars_classes").html('');

                	dataset_scores_cars_classes = result.rows;

                	var currentClass = '';
                	var currentClassInside = '';

                	var text2append = '';

                	if (dataset_scores_cars_classes.length > 0) {
                		text2append = '<ul class="collapsible" data-collapsible="accordion">';

                		for (var i = 0; i < dataset_scores_cars_classes.length; i++) {
                			var item = dataset_scores_cars_classes.item(i);
                			var lineId = item['classid'].toString();

                			if (currentClass.toString() != lineId.toString()) {

                				var active = (lineId == preselectedClass) ? ' active ' : '';

                				//New car class
                				text2append += '<li>';
                				text2append += '<div class="collapsible-header ata-red white-text' + active + '"><i class="mdi mdi-car"></i>CLASS ' + item['classname'].toString() + '</div>';
                				text2append += '<div class="collapsible-body">';
                				text2append += '<div class="collection">';

                				currentClassInside = item['classid'].toString();
                			}

                			var eventtypeInside = '';
                			var colorCounter = 0;
                			var color = 0;

                			for (var j = i; j < dataset_scores_cars_classes.length; j++) {
                				var itemInside = dataset_scores_cars_classes.item(j);
                				var lineIdInside = itemInside['classid'].toString();

                				if (eventtypeInside != itemInside['eventtypeid'].toString()) {
                					//Event has been changed, so change the color
                					eventtypeInside = itemInside['eventtypeid'].toString();
                					colorCounter++;
                				}

                				if (currentClassInside.toString() == lineIdInside.toString()) {
                					//Same class, different event, add new line
                					var eventid = itemInside['eventid'].toString();
                					var description = itemInside['description'].toString();
                					var eventnameid = itemInside['eventnameid'].toString();
                					var eventname = itemInside['eventname'].toString();
                					var eventtypeid = itemInside['eventtypeid'].toString();
                					var eventtypename = itemInside['eventtypename'].toString();

                					var lineText = eventname.toString().bold() + ' ' + description;
                					color = (colorCounter % 2 == 0) ? ' ata-green-text' : ' ata-red-text';
                					var scorePresent = (parseFloat(itemInside['score']) > 0) ? '<span class="badge"><i class="small mdi mdi-poll" title="Scores available"></i></span>' : '';
                					text2append += '<a href="#!" class="collection-item ' + color + '" onclick="editRecord(' + currentClassInside + ', ' + eventid + ');"><i class="mdi mdi-timer"></i>&nbsp;' + lineText + '</i>' + scorePresent + '</a>';
                					i++;
                				}
                				else {
                					i = --j;
                					break;
                				}
                			}

                			if (currentClass.toString() != lineId.toString()) {
                				//Class changes, close the item
                				text2append += ' </div>';
                				text2append += '</div>';
                				text2append += '</li>';
                			}

                			currentClass = lineId;
                		}
                		text2append += '</ul>';
                		$("#divScores_cars_classes").append(text2append);

                		$('.collapsible').collapsible({
                			accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                		});
                	}
                	else {
                		text2append = '';
                		text2append += '<div class="container">';
                		text2append += '<h5 class="ata-green-text">Assign Scores</h5>';
                		text2append += '<h6 class="ata-green-text">Assign or View Scores</h6>';
                		text2append += '<hr>'
                		text2append += '<div class="row"><div class="col s12 m12 l12">'
                		text2append += '<h6 class="ata-red-text">Warning</h6>';
                		text2append += '<p>No data found. Did you download Teams and Cars for the selected Exam Board?</p>';
                		text2append += '</div></div></div>';
                		$("#divScores_cars_classes").append(text2append);
                	}
                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_cars_classes(preselectedClass);
	}
}

function showRecords_scores() {
	var classid = sessionStorage.scores_classid;
	var eventid = sessionStorage.scores_eventid;

	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_scores,
                [classid, eventid],
                function (tx, result) {
                	waitON();
                	$("#tbodyScores").html('');

                	dataset_scores_bycar = result.rows;

                	//Event 2018 - Show partials scores for Presentation and Design
                	//Will contains scores list ids
                	var scoresidlist = new Array();

                	for (var i = 0; i < dataset_scores_bycar.length; i++) {
                		var item = dataset_scores_bycar.item(i);

                		var lineId = '_' + item['carid'];

                		var editParameters = item['classid'] + ',' + item['eventid'] + ',' + item['carid'] + ',' + item['scoreid'] + ',\'' + item['pagetojump'] + '\'' + ',' + item['maximumscore'] + ',' + item['score'] + ',' + item['carno'] + ',' + item['fuelid'];

                		var text2Append = '';

                		//Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                		var trClassName = '';
                		if (isAnElectricCar(item['fuelname'])) {
                			trClassName = " class='electric' ";
                		}
                		else {
                			trClassName = " class='not-electric' ";
                		}

                		//Event 2018 - Show partials scores for Presentation and Design
                		//I give to row an attribute to easily find it if i have to add partial scores
                		trDataScoreId = " data-scoreid ='" + item['scoreid'] + "' ";
                		text2Append += '<tr' + trClassName + trDataScoreId + '>';

                		text2Append += '<td align="right">';
                		text2Append += '<input type="hidden" id="scoreid2Edit" value="' + item['scoreid'] + ' "/>';
                		text2Append += '<a class="btn-floating waves-effect waves-light ata-green" id="iframe" onclick="editRecord(' + editParameters + ');" href="#"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                		text2Append += '</td>';

                		text2Append += '<td>' + item['carno'] + '</td>';
                		text2Append += '<td>' + item['teamname'] + '</td>';
                		text2Append += '<td>' + item['university'] + '</td>';
                		var totScore = item['score']
                		if (totScore > 0)
                			text2Append += '<td class="bold">' + item['score'] + '</td>';
                		else
                			text2Append += '<td class="bold"> 0 </td>';

                		//var score = item['score'];

                		//text2Append += '<td><div class="input-field" col s1>';
                		//text2Append += score;
                		//text2Append += '</div></td>';

                		text2Append += '</tr>';

                		$("#tbodyScores").append(text2Append);

                		//Event 2018 - Show partials scores for Presentation and Design
                		//Add score to list
                		scoresidlist.push(item['scoreid']);
                	}
                	waitOFF();

                	//Event 2018 - Show partials scores for Presentation and Design
                	//For all rows add partial scores (for the involved events)
                	if (item['pagetojump'].indexOf(TypeOfEventByName.Presentation.name) != -1)
                		showRecords_scores_presentation_partial(scoresidlist.join(","));
                	if ((item['pagetojump'].indexOf(TypeOfEventByName.Design.name) != -1) && (item['pagetojump'].indexOf('1C3') != -1))
                		showRecords_scores_design1C3_partial(scoresidlist.join(","));
                	if ((item['pagetojump'].indexOf(TypeOfEventByName.Design.name) != -1) && (item['pagetojump'].indexOf('1E') != -1))
                		showRecords_scores_design1E_partial(scoresidlist.join(","));
                }
            );
		});
	}
	else {
		WS_showRecords_scores(classid, eventid);
	}
}

function insertMultipleRecord_scores(multipleScores2Insert) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                "INSERT INTO TB_Scores (eventid, carid, score, penalityscore, penalitynotes, correctedscore) VALUES " + multipleScores2Insert,
                [],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_insertMultipleRecord_scores(multipleScores2Insert);
	}
}

function updateMultipleRecord_scores_cars(cars2Update) {
	$.each(cars2Update, function (carid, records) {
		$.each(records, function (ix, record) {
			if (isATablet()) {
				db.transaction(function (tx) {
					tx.executeSql(
                        'UPDATE TB_Cars SET fuelid = ?, deliverydocdate = ?, boxno = ? WHERE id = ?',
                        [record.fuelid, record.deliverydocdate, record.boxno, record.carid],
                        function (tx, result) {
                        	showRecords_scores();
                        },
                        function (tx, result) {
                        	onError(tx, result);
                        }
                    );
				});
			}
			else {
				WS_updateRecord_cars_scores(record.carid, record.fuelid, record.deliverydocdate, record.boxno);
			}
		});
	});
}

function insertRecord_scores(eventid, carid, score, penalityscore, penalitynotes, correctedscore) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                insertStatement_scores,
                [eventid, carid, score, penalityscore, penalitynotes, correctedscore],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_insertRecord_scores(eventid, carid, score, penalityscore, penalitynotes, correctedscore);
	}
}

function deleteRecord_scores(eventid, carid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores,
                [eventid, carid],
                function (tx, result) {
                	showRecords_scores();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_deleteRecord_scores(eventid, carid);
	}
}

function updateRecord_scores(eventid, carid, score, penalityscore, penalitynotes, correctedscore) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores,
                [score, penalityscore, penalitynotes, correctedscore, Number(eventid), Number(carid)],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_updateRecord_scores(eventid, carid, score, penalityscore, penalitynotes, correctedscore);
	}
}

function showRecords_scores_eventdetails(classid, eventid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_eventdetail,
                [classid, eventid],
                function (tx, result) {
                	if (result.rows.length > 0) {
                		var item = result.rows.item(0);

                		$('#classname').val(item['classname']);
                		$('#eventtypename').val(item['eventtypename']);
                		$('#eventname').val(item['eventname']);
                		$('#description').val(item['description']);
                		$('#classname-spn').html(item['classname']);
                		$('#eventtypename-spn').html(item['eventtypename']);
                		$('#eventname-spn').html(item['eventname']);
                		$('#description-spn').html(item['description']);
                	}
                }
            );
		});
	}
	else {
		WS_showRecords_scores_eventdetails(classid, eventid);
	}
}

function showRecords_scores_cars_fuels(carid, fuelid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectAllStatement_fuels + ' ORDER BY fuelname',
                [],
                function (tx, result) {
                	dataset_fuels = result.rows;

                	$('#fuelid_' + carid).empty();

                	$('#fuelid_' + carid).append($('<option>', { value: '', text: 'Select a Fuel' }));

                	for (var i = 0; i < dataset_fuels.length; i++) {
                		var item = dataset_fuels.item(i);
                		$('#fuelid_' + carid).append($('<option>', { value: item['id'], text: item['fuelname'] }));
                	}

                	$('#fuelid_' + carid).val(fuelid);
                	$('#fuelid_' + carid).material_select();

                }
            );
		});
	}
	else {
		WS_showRecords_scores_cars_fuels(carid, fuelid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES DESIGN 1E ------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores_design1E() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores_design1E,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores_design1E() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores_design1E,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

//Event 2018 - Show partials scores for Presentation and Design
function createView_scores_partial_design1E() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementView_scores_partial_design1E,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function dropView_scores_partial_design1E() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatementView_scores_partial_design1E,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createView_scores_partial_design1C3() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementView_scores_partial_design1C3,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function dropView_scores_partial_design1C3() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatementView_scores_partial_design1C3,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createView_scores_partial_presentation() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementView_scores_partial_presentation,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function dropView_scores_partial_presentation() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatementView_scores_partial_presentation,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}


//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function insertRecord_scores_design1E(eventid, carid, scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
	if (isATablet()) {
		var givenscore = parseFloat(suspension) + parseFloat(framebodyaero) + parseFloat(tractivedriverecoverysystem) + parseFloat(cockpitcontrolsbrakessafety) + parseFloat(systemmanagementintegration) + parseFloat(manufacturabilityserviceability) + parseFloat(aestheticsstyle) + parseFloat(creativity) + parseFloat(miscellaneous);

		if (Number(scoreid) == -1) {
			db.transaction(function (tx) {
				//Insert Score First
				tx.executeSql(
                    "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, givenscore],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				//Now insert details
				tx.executeSql(
                    "INSERT INTO TB_Scores_Design1E (scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes)  VALUES( (SELECT MAX(id) FROM TB_Scores), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
		}
		else {
			db.transaction(function (tx) {
				tx.executeSql(
                    insertStatement_scores_design1E,
                    [scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				tx.executeSql(
                    "UPDATE TB_Scores SET score = ? WHERE id = ?",
                    [givenscore, scoreid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
        }
        backToScores();
	}
	else {
		WS_insertRecord_scores_design1E(eventid, carid, scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes);
	}
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function updateRecord_scores_design1E(scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
	if (isATablet()) {

		var givenscore = parseFloat(suspension) + parseFloat(framebodyaero) + parseFloat(tractivedriverecoverysystem) + parseFloat(cockpitcontrolsbrakessafety) + parseFloat(systemmanagementintegration) + parseFloat(manufacturabilityserviceability) + parseFloat(aestheticsstyle) + parseFloat(creativity) + parseFloat(miscellaneous);

		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores_design1E,
                [suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes, Number(scoreid)],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );

			tx.executeSql(
                "UPDATE TB_Scores SET score = ? WHERE id = ?",
                [givenscore, scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
        });
        backToScores();
	}
	else {
		WS_updateRecord_scores_design1E(scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes);
	}
}

function deleteRecord_scores_design1E(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_design1E,
                [scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_scores_design1E(scoreid);
	}
}

function showRecords_scores_design1E(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_design1E,
                [scoreid],
                function (tx, result) {
                	waitON();

                	dataset_scores_design1E = result.rows;

                	var id = -1;
                	var scoreid = -1;
                	var suspension = 0;
                	var framebodyaero = 0;
                	var tractivedriverecoverysystem = 0;
                	var cockpitcontrolsbrakessafety = 0;
                	var systemmanagementintegration = 0;
                	var manufacturabilityserviceability = 0;
                	var aestheticsstyle = 0;
                	var creativity = 0;
                	var carweight = 0;

                	var suspensionnotes = '';
                	var framebodyaeronotes = '';
                	var tractivedriverecoverysystemnotes = '';
                	var cockpitcontrolsbrakessafetynotes = '';
                	var systemmanagementintegrationnotes = '';
                	var manufacturabilityserviceabilitynotes = '';
                	var aestheticsstylenotes = '';
                	var creativitynotes = '';

                	var miscellaneous = 0;
                	var miscellaneousnotes = '';

                	if (dataset_scores_design1E.length) {
                		var item = dataset_scores_design1E.item(0);

                		id = item['id'];
                		scoreid = item['scoreid'];
                		suspension = item['suspension'];
                		framebodyaero = item['framebodyaero'];
                		tractivedriverecoverysystem = item['tractivedriverecoverysystem'];
                		cockpitcontrolsbrakessafety = item['cockpitcontrolsbrakessafety'];
                		systemmanagementintegration = item['systemmanagementintegration'];
                		manufacturabilityserviceability = item['manufacturabilityserviceability'];
                		aestheticsstyle = item['aestheticsstyle'];
                		creativity = item['creativity'];
                		carweight = item['carweight'];

                		suspensionnotes = item['suspensionnotes'];
                		framebodyaeronotes = item['framebodyaeronotes'];
                		tractivedriverecoverysystemnotes = item['tractivedriverecoverysystemnotes'];
                		cockpitcontrolsbrakessafetynotes = item['cockpitcontrolsbrakessafetynotes'];
                		systemmanagementintegrationnotes = item['systemmanagementintegrationnotes'];
                		manufacturabilityserviceabilitynotes = item['manufacturabilityserviceabilitynotes'];
                		aestheticsstylenotes = item['aestheticsstylenotes'];
                		creativitynotes = item['creativitynotes'];

                		miscellaneous = item['miscellaneous'];
                		miscellaneousnotes = item['miscellaneousnotes'];
                	}

                	$("#id").val(id);
                	$("#scoreid").val(scoreid);
                	$("#suspension").val(suspension);
                	$("#framebody").val(framebodyaero);
                	$("#tractive").val(tractivedriverecoverysystem);
                	$("#cockpit").val(cockpitcontrolsbrakessafety);
                	$("#systemmanag").val(systemmanagementintegration);
                	$("#manufact").val(manufacturabilityserviceability);
                	$("#aesthetics").val(aestheticsstyle);
                	$("#creativity").val(creativity);
                	$("#carweight").val(carweight);

                	$("#suspensionnotes").val(suspensionnotes);
                	$("#framebodynotes").val(framebodyaeronotes);
                	$("#tractivenotes").val(tractivedriverecoverysystemnotes);
                	$("#cockpitnotes").val(cockpitcontrolsbrakessafetynotes);
                	$("#systemmanagnotes").val(systemmanagementintegrationnotes);
                	$("#manufactnotes").val(manufacturabilityserviceabilitynotes);
                	$("#aestheticsnotes").val(aestheticsstylenotes);
                	$("#creativitynotes").val(creativitynotes);

                	$("#miscellaneous").val(miscellaneous);
                	$("#miscellaneousnotes").val(miscellaneousnotes);

                	//Event 2017 - Display partial totals on section title
                	$("#suspensionBadge").html(suspension);
                	$("#framebodyBadge").html(framebodyaero);
                	$("#tractiveBadge").html(tractivedriverecoverysystem);
                	$("#cockpitBadge").html(cockpitcontrolsbrakessafety);
                	$("#systemmanagBadge").html(systemmanagementintegration);
                	$("#manufactBadge").html(manufacturabilityserviceability);
                	$("#aestheticsBadge").html(aestheticsstyle);
                	$("#creativityBadge").html(creativity);
                	$("#miscellaneousBadge").html(miscellaneous);

                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_design1E(scoreid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES DESIGN 1C3 -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores_design1C3() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores_design1C3,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores_design1C3() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores_design1C3,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function insertRecord_scores_design1C3(eventid, carid, scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
	if (isATablet()) {
		var givenscore = parseFloat(suspension) + parseFloat(framebodyaero) + parseFloat(powertrain) + parseFloat(cockpitcontrolsbrakessafety) + parseFloat(systemmanagementintegration) + parseFloat(manufacturabilityserviceability) + parseFloat(aestheticsstyle) + parseFloat(creativity) + parseFloat(miscellaneous);

		if (Number(scoreid) == -1) {
			db.transaction(function (tx) {
				//Insert Score First
				tx.executeSql(
                    "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, givenscore],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				//Now insert details
				tx.executeSql(
                    "INSERT INTO TB_Scores_Design1C3 (scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes)  VALUES( (SELECT MAX(id) FROM TB_Scores), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
		}
		else {
			db.transaction(function (tx) {
				tx.executeSql(
                    insertStatement_scores_design1C3,
                    [scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				tx.executeSql(
                    "UPDATE TB_Scores SET score = ? WHERE id = ?",
                    [givenscore, scoreid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
        }
        backToScores();
	}
	else {
		WS_insertRecord_scores_design1C3(eventid, carid, scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes);
	}
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function updateRecord_scores_design1C3(scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
	if (isATablet()) {

		var givenscore = parseFloat(suspension) + parseFloat(framebodyaero) + parseFloat(powertrain) + parseFloat(cockpitcontrolsbrakessafety) + parseFloat(systemmanagementintegration) + parseFloat(manufacturabilityserviceability) + parseFloat(aestheticsstyle) + parseFloat(creativity) + parseFloat(miscellaneous);

		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores_design1C3,
                [suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes, Number(scoreid)],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );

			tx.executeSql(
                "UPDATE TB_Scores SET score = ? WHERE id = ?",
                [givenscore, scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
        backToScores();
	}
	else {
		WS_updateRecord_scores_design1C3(scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes);
	}
}

function deleteRecord_scores_design1C3(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_design1C3,
                [scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_scores_design1C3(scoreid);
	}
}

function showRecords_scores_design1C3(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_design1C3,
                [scoreid],
                function (tx, result) {
                	waitON();

                	dataset_scores_design1C3 = result.rows;

                	var id = -1;
                	var scoreid = -1;
                	var suspension = 0;
                	var framebodyaero = 0;
                	var powertrain = 0;
                	var cockpitcontrolsbrakessafety = 0;
                	var systemmanagementintegration = 0;
                	var manufacturabilityserviceability = 0;
                	var aestheticsstyle = 0;
                	var creativity = 0;
                	var carweight = 0;

                	var suspensionnotes = '';
                	var framebodyaeronotes = '';
                	var powertrainnotes = '';
                	var cockpitcontrolsbrakessafetynotes = '';
                	var systemmanagementintegrationnotes = '';
                	var manufacturabilityserviceabilitynotes = '';
                	var aestheticsstylenotes = '';
                	var creativitynotes = '';

                	var miscellaneous = 0;
                	var miscellaneousnotes = '';

                	if (dataset_scores_design1C3.length) {
                		var item = dataset_scores_design1C3.item(0);

                		id = item['id'];
                		scoreid = item['scoreid'];
                		suspension = item['suspension'];
                		framebodyaero = item['framebodyaero'];
                		powertrain = item['powertrain'];
                		cockpitcontrolsbrakessafety = item['cockpitcontrolsbrakessafety'];
                		systemmanagementintegration = item['systemmanagementintegration'];
                		manufacturabilityserviceability = item['manufacturabilityserviceability'];
                		aestheticsstyle = item['aestheticsstyle'];
                		creativity = item['creativity'];
                		carweight = item['carweight'];

                		suspensionnotes = item['suspensionnotes'];
                		framebodyaeronotes = item['framebodyaeronotes'];
                		powertrainnotes = item['powertrainnotes'];
                		cockpitcontrolsbrakessafetynotes = item['cockpitcontrolsbrakessafetynotes'];
                		systemmanagementintegrationnotes = item['systemmanagementintegrationnotes'];
                		manufacturabilityserviceabilitynotes = item['manufacturabilityserviceabilitynotes'];
                		aestheticsstylenotes = item['aestheticsstylenotes'];
                		creativitynotes = item['creativitynotes'];

                		miscellaneous = item['miscellaneous'];
                		miscellaneousnotes = item['miscellaneousnotes'];
                	}

                	$("#id").val(id);
                	$("#scoreid").val(scoreid);
                	$("#suspension").val(suspension);
                	$("#framebody").val(framebodyaero);
                	$("#powertrain").val(powertrain);
                	$("#cockpit").val(cockpitcontrolsbrakessafety);
                	$("#systemmanag").val(systemmanagementintegration);
                	$("#manufact").val(manufacturabilityserviceability);
                	$("#aesthetics").val(aestheticsstyle);
                	$("#creativity").val(creativity);
                	$("#carweight").val(carweight);

                	$("#suspensionnotes").val(suspensionnotes);
                	$("#framebodynotes").val(framebodyaeronotes);
                	$("#powertrainnotes").val(powertrainnotes);
                	$("#cockpitnotes").val(cockpitcontrolsbrakessafetynotes);
                	$("#systemmanagnotes").val(systemmanagementintegrationnotes);
                	$("#manufactnotes").val(manufacturabilityserviceabilitynotes);
                	$("#aestheticsnotes").val(aestheticsstylenotes);
                	$("#creativitynotes").val(creativitynotes);

                	$("#miscellaneous").val(miscellaneous);
                	$("#miscellaneousnotes").val(miscellaneousnotes);

                	//Event 2017 - Display partial totals on section title
                	$("#suspensionBadge").html(suspension);
                	$("#framebodyBadge").html(framebodyaero);
                	$("#powertrainBadge").html(powertrain);
                	$("#cockpitBadge").html(cockpitcontrolsbrakessafety);
                	$("#systemmanagBadge").html(systemmanagementintegration);
                	$("#manufactBadge").html(manufacturabilityserviceability);
                	$("#aestheticsBadge").html(aestheticsstyle);
                	$("#creativityBadge").html(creativity);
                	$("#miscellaneousBadge").html(miscellaneous);

                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_design1C3(scoreid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES PRESENTATION ---------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores_presentation() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores_presentation,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores_presentation() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores_presentation,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//so get the value from the Scores table
//Event 2019 - Presentation Event has been changed
function showRecords_scores_presentation(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_presentation,
                [scoreid],
                function (tx, result) {
                	waitON();

                	dataset_scores_presentation = result.rows;

                	if (dataset_scores_presentation.length) {
                		var item = dataset_scores_presentation.item(0);

                		scoreP.id = item['id'];
                		scoreP.scoreid = item['scoreid'];

                		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                		//$.each(scoreP.st2Content, function (index, value) {
                		//	scoreP.st2Content[index] = item['st2content' + index];
                		//});
                        //      scoreP.st2ContentNotes = item['st2contentnotes'];
                        //FDT - ATA 2023 - eliminato Content e Investors - FINE

                        //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                		//$.each(scoreP.st2BusinnesFigures, function (index, value) {
                		//	scoreP.st2BusinnesFigures[index] = item['st2businnesfigures' + index];
                		//});
                        //scoreP.st2BusinnesFiguresNotes = item['st2businnesfiguresnotes'];
                        //FDT - ATA 2023 - eliminato Business Figures - FINE

                        //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                        $.each(scoreP.st2FinConcept, function (index, value) {
                            scoreP.st2FinConcept[index] = item['st2finconcept' + index];
                        });
                        scoreP.st2FinConceptNotes = item['st2finconceptnotes'];
	                    //FDT - ATA 2023 - aggiunto Financial Concept - FINE

                        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                        $.each(scoreP.st2FinKPIs, function (index, value) {
                            scoreP.st2FinKPIs[index] = item['st2finkpis' + index];
                        });
                        scoreP.st2FinKPIsNotes = item['st2finkpisnotes'];
	                    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE

                		$.each(scoreP.st2DemonstrationAndDelivery, function (index, value) {
                			scoreP.st2DemonstrationAndDelivery[index] = item['st2demonstrationanddelivery' + index];
                		});
                		scoreP.st2DemonstrationAndDeliveryNotes = item['st2demonstrationanddeliverynotes'];

                        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                		//$.each(scoreP.st2Investitors, function (index, value) {
                		//	scoreP.st2Investitors[index] = item['st2investitors' + index];
                		//});
                        //      scoreP.st2InvestitorsNotes = item['st2investitorsnotes'];
                        //FDT - ATA 2023 - eliminato Content e Investors - FINE
                		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END


                		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                		//$.each(scoreP.executiveSummary, function (index, value) {
                		//	scoreP.executiveSummary[index] = item['executivesummary' + index];
                		//});
                		//scoreP.executiveSummaryNotes = item['executivesummarynotes'];

                        //FDT - ATA 2023 - modifiche stage3
                		//$.each(scoreP.novelty, function (index, value) {
                		//	scoreP.novelty[index] = item['novelty' + index];
                		//});
                		//scoreP.noveltyNotes = item['noveltynotes'];

                		$.each(scoreP.content, function (index, value) {
                			scoreP.content[index] = item['content' + index];
                		});
                		scoreP.contentNotes = item['contentnotes'];

                		$.each(scoreP.finances, function (index, value) {
                			scoreP.finances[index] = item['finances' + index];
                		});
                		scoreP.financesNotes = item['financesnotes'];

                		$.each(scoreP.deepDiveTopic, function (index, value) {
                			scoreP.deepDiveTopic[index] = item['deepdivetopic' + index];
                		});
                		scoreP.deepDiveTopicNotes = item['deepdivetopicnotes'];

                		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
                		$.each(scoreP.demonstration, function (index, value) {
                			scoreP.demonstration[index] = item['demonstration' + index];
                		});
                		scoreP.demonstrationNotes = item['demonstrationnotes'];
                        
                		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
                		$.each(scoreP.structure, function (index, value) {
                			scoreP.structure[index] = item['structure' + index];
                		});
                		scoreP.structureNotes = item['structurenotes'];

                		$.each(scoreP.delivery, function (index, value) {
                			scoreP.delivery[index] = item['delivery' + index];
                		});
                		scoreP.deliveryNotes = item['deliverynotes'];

                		$.each(scoreP.questions, function (index, value) {
                			scoreP.questions[index] = item['questions' + index];
                		});
                		scoreP.questionsNotes = item['questionsnotes'];

                		$.each(scoreP.generalImpression, function (index, value) {
                			scoreP.generalImpression[index] = item['generalimpression' + index];
                		});
                		scoreP.generalImpressionNotes = item['generalimpressionnotes'];

                		scoreP.miscellaneous = item['miscellaneous'];
                		scoreP.miscellaneousNotes = item['miscellaneousnotes'];

                		scoreP.presentationNotes = item['presentationnotes'];

                		//FD 2021.07.27 - ATA 2021  - Add Stage1
                		scoreP.stage1 = item['stage1'];

                		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                		scoreP.finals = item['finals'];
                	}

                	$("#id").val(scoreP.id);
                	$("#scoreid").val(scoreP.scoreid);

                	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
                    //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                    //BUSINESSFIGURES
                	//$.each(scoreP.st2BusinnesFigures, function (index, value) {
                	//	$("#chkst2BusinessFigures" + index).prop('checked', (parseFloat(value) > 0));
                	//	scoreP.totalSt2BusinnesFigures += parseFloat(value);
                	//});
                	//$("#totalSt2BusinessFigures").val(scoreP.totalSt2BusinnesFigures);
                	//$("#totalSt2BusinnesFiguresBadge").html(scoreP.totalSt2BusinnesFigures);
                    //$('#st2businessFiguresNotes').val(scoreP.st2BusinnesFiguresNotes);
                    //FDT - ATA 2023 - eliminato Business Figures - FINE

                    //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                    $.each(scoreP.st2FinConcept, function (index, value) {
                        $("#chkSt2FinConcept" + index).prop('checked', (parseFloat(value) > 0));
                        scoreP.totalSt2FinConcept += parseFloat(value);
                    });
                    $("#totalSt2FinConcept").val(scoreP.totalSt2FinConcept);
                    $("#totalSt2FinConceptBadge").html(scoreP.totalSt2FinConcept);                    
                    $('#st2FinConceptNotes').val(scoreP.st2FinConceptNotes);
                    
	                //FDT - ATA 2023 - aggiunto Financial Concept - FINE

                    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                    $.each(scoreP.st2FinKPIs, function (index, value) {
                        $("#chkSt2FinKPIs" + index).prop('checked', (parseFloat(value) > 0));
                        scoreP.totalSt2FinKPIs += parseFloat(value);
                    });
                    $("#totalSt2FinKPIs").val(scoreP.totalSt2FinKPIs);
                    $("#totalSt2FinKPIsBadge").html(scoreP.totalSt2FinKPIs);
                    $('#st2FinKPIsNotes').val(scoreP.st2FinKPIsNotes);
                    
	                //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE

                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                    //CONTENT
                	//$.each(scoreP.st2Content, function (index, value) {
                	//	$("#chkSt2Content" + index).prop('checked', (parseFloat(value) > 0));
                	//	scoreP.totalSt2Content += parseFloat(value);
                	//});
                	//$("#totalSt2Content").val(scoreP.totalSt2Content);
                	//$("#totalSt2ContentBadge").html(scoreP.totalSt2Content);
                    //   $('#st2contentNotes').val(scoreP.st2ContentNotes);
                    //FDT - ATA 2023 - eliminato Content e Investors - FINE

                	//DEMONSTRATIONANSDELIVERY
                	$.each(scoreP.st2DemonstrationAndDelivery, function (index, value) {
                		$("#chkSt2DemonstrationAndDelivery" + index).prop('checked', (parseFloat(value) > 0));
                		scoreP.totalSt2DemonstrationAndDelivery += parseFloat(value);
                	});
                	$("#totalSt2DemonstrationAndDelivery").val(scoreP.totalSt2DemonstrationAndDelivery);
                	$("#totalSt2DemonstrationAndDeliveryBadge").html(scoreP.totalSt2DemonstrationAndDelivery);
                	$('#st2demonstrationAndDeliveryNotes').val(scoreP.st2DemonstrationAndDeliveryNotes);

                	//INVESTITORS
                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                	//$.each(scoreP.st2Investitors, function (index, value) {
                	//	$("#chkSt2Investitors" + index).prop('checked', (parseFloat($("#chkSt2Investitors" + index).prop('value')) == parseFloat(value)));
                	//	scoreP.totalSt2Investitors += parseFloat(value);
                	//});
                	//$("#totalSt2Investitors").val(scoreP.totalSt2Investitors);
                	//$("#totalSt2InvestitorsBadge").html(scoreP.totalSt2Investitors);
                    //   $('#st2investitorsNotes').val(scoreP.st2InvestitorsNotes);
                    //FDT - ATA 2023 - eliminato Content e Investors - FINE
                	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

                	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                	//$.each(scoreP.executiveSummary, function (index, value) {
                	//	$("#chkExecutiveSummary" + index).prop('checked', (parseFloat(value) > 0));
                	//	scoreP.totalExecutiveSummary += parseFloat(value);
                	//});
                	//$("#totalExecutiveSummary").val(scoreP.totalExecutiveSummary);
                	//$('#executiveSummaryNotes').val(scoreP.executiveSummaryNotes);
                	////Event 2017 - Display partial totals on section title
                	//$("#totalExecutiveSummaryBadge").html(scoreP.totalExecutiveSummary);

                    //FDT - ATA 2023 - modifiche stage3
                	//$.each(scoreP.novelty, function (index, value) {
                	//	$("#chkNovelty" + index).prop('checked', (parseFloat(value) > 0));
                	//	scoreP.totalNovelty += parseFloat(value);
                	//});
                	//$("#totalNovelty").val(scoreP.totalNovelty);
                	//$('#noveltyNotes').val(scoreP.noveltyNotes);
                	//Event 2017 - Display partial totals on section title
                	//$("#totalNoveltyBadge").html(scoreP.totalNovelty);

                	$.each(scoreP.content, function (index, value) {
                		$("#chkContent" + index).prop('checked', (parseFloat(value) > 0));
                		scoreP.totalContent += parseFloat(value);
                	});
                	$("#totalContent").val(scoreP.totalContent);
                	$('#contentNotes').val(scoreP.contentNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalContentBadge").html(scoreP.totalContent);

                	$.each(scoreP.finances, function (index, value) {
                		//Some of these items are radio buttons and some values could be 0 
                		//I cannot test "value > 0" but "value equals to input value" to check the input correctly even when is set to 0
                		//$("#chkFinances" + index).prop('checked', (parseFloat(value) > 0));
                		$("#chkFinances" + index).prop('checked', (parseFloat($("#chkFinances" + index).prop('value')) == parseFloat(value)));
                		scoreP.totalFinances += parseFloat(value);
                	});
                	$("#totalFinances").val(scoreP.totalFinances);
                	$('#financesNotes').val(scoreP.financesNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalFinancesBadge").html(scoreP.totalFinances);

                	$.each(scoreP.deepDiveTopic, function (index, value) {
                		$("#chkDeepDiveTopic" + index).prop('checked', (parseFloat(value) > 0));
                		scoreP.totalDeepDiveTopic += parseFloat(value);
                	});
                	$("#totalDeepDiveTopic").val(scoreP.totalDeepDiveTopic);
                	$('#deepDiveTopicNotes').val(scoreP.deepDiveTopicNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalDeepDiveTopicBadge").html(scoreP.totalDeepDiveTopic);

                	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
                	$.each(scoreP.demonstration, function (index, value) {
                		//Some of these items are radio buttons and some values could be 0 
                		//I cannot test "value > 0" but "value equals to input value" to check the input correctly even when is set to 0
                		//$("#chkQuestions" + index).prop('checked', (parseFloat(value) > 0));
                		$("#chkDemonstration" + index).prop('checked', (parseFloat($("#chkDemonstration" + index).prop('value')) == parseFloat(value)));
                		scoreP.totalDemonstration += parseFloat(value);
                	});
                	$("#totalDemonstration").val(scoreP.totalDemonstration);
                	$('#demonstrationNotes').val(scoreP.demonstrationNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalDemonstrationBadge").html(scoreP.totalDemonstration);

                	$.each(scoreP.structure, function (index, value) {
                		$("#chkStructure" + index).prop('checked', (parseFloat(value) > 0));
                		scoreP.totalStructure += parseFloat(value);
                	});
                	$("#totalStructure").val(scoreP.totalStructure);
                	$('#structureNotes').val(scoreP.structureNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalStructureBadge").html(scoreP.totalStructure);

                	$.each(scoreP.delivery, function (index, value) {
                		$("#chkDelivery" + index).prop('checked', (parseFloat(value) > 0));
                		scoreP.totalDelivery += parseFloat(value);
                	});
                	$("#totalDelivery").val(scoreP.totalDelivery);
                	$('#deliveryNotes').val(scoreP.deliveryNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalDeliveryBadge").html(scoreP.totalDelivery);

                	$.each(scoreP.questions, function (index, value) {
                		//Some of these items are radio buttons and some values could be 0 
                		//I cannot test "value > 0" but "value equals to input value" to check the input correctly even when is set to 0
                		//$("#chkQuestions" + index).prop('checked', (parseFloat(value) > 0));
                		$("#chkQuestions" + index).prop('checked', (parseFloat($("#chkQuestions" + index).prop('value')) == parseFloat(value)));
                		scoreP.totalQuestions += parseFloat(value);
                	});
                	$("#totalQuestions").val(scoreP.totalQuestions);
                	$('#questionsNotes').val(scoreP.questionsNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalQuestionsBadge").html(scoreP.totalQuestions);

                	$.each(scoreP.generalImpression, function (index, value) {
                		$("#chkGeneralImpression" + index).prop('checked', (parseFloat(value) > 0));
                		scoreP.totalGeneralImpression += parseFloat(value);
                	});
                	$("#totalGeneralImpression").val(scoreP.totalGeneralImpression);
                	$('#generalImpressionNotes').val(scoreP.generalImpressionNotes);
                	//Event 2017 - Display partial totals on section title
                	$("#totalGeneralImpressionBadge").html(scoreP.totalGeneralImpression);

                	$("#miscellaneous").val(scoreP.miscellaneous);
                	$("#miscellaneousNotes").val(scoreP.miscellaneousNotes);
                	$("#miscellaneousBadge").html(scoreP.miscellaneous);

                	//FD 2021.07.27 - ATA 2021  - Add Stage1 - BEGIN
                	$("#stage1").val(scoreP.stage1);
                	$("#stage1Badge").html(scoreP.stage1);
                	//FD 2021.07.27 - ATA 2021  - Add Stage1 - END

                	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3> - BEGIN
                	$("#finals").val(scoreP.finals);
                	$("#finalsBadge").html(scoreP.finals);
                	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3> - END

                	$("#presentationNotes").val(scoreP.presentationNotes);

                    //FDT - ATA2023 - modifiche stage3
                	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                	//scoreP.totalPresentation = Number(parseFloat(scoreP.totalNovelty)) ? parseFloat(scoreP.totalNovelty) : 0;
                	scoreP.totalPresentation += Number(parseFloat(scoreP.totalContent)) ? parseFloat(scoreP.totalContent) : 0;
                	scoreP.totalPresentation += Number(parseFloat(scoreP.totalFinances)) ? parseFloat(scoreP.totalFinances) : 0;
                	scoreP.totalPresentation += Number(parseFloat(scoreP.totalDeepDiveTopic)) ? parseFloat(scoreP.totalDeepDiveTopic) : 0;

                	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
                	scoreP.totalPresentation += Number(parseFloat(scoreP.totalDemonstration)) ? parseFloat(scoreP.totalDemonstration) : 0;

                	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
                	//scoreP.totalPresentation += Number(parseFloat(scoreP.totalDemonstrationAndStructure))	? parseFloat(scoreP.totalDemonstrationAndStructure)		: 0;
                    scoreP.totalPresentation += Number(parseFloat(scoreP.totalDelivery)) ? parseFloat(scoreP.totalDelivery) : 0;
                    scoreP.totalPresentation += Number(parseFloat(scoreP.totalStructure)) ? parseFloat(scoreP.totalStructure) : 0;
                	scoreP.totalPresentation += Number(parseFloat(scoreP.totalQuestions)) ? parseFloat(scoreP.totalQuestions) : 0;
                	scoreP.totalPresentation += Number(parseFloat(scoreP.totalGeneralImpression)) ? parseFloat(scoreP.totalGeneralImpression) : 0;
                	scoreP.totalPresentation += Number(parseFloat(scoreP.miscellaneous)) ? parseFloat(scoreP.miscellaneous) : 0;

                	//FD 2021.07.27 - ATA 2021  - Add Stage1 - BEGIN
                	scoreP.totalPresentation += Number(parseFloat(scoreP.stage1)) ? parseFloat(scoreP.stage1) : 0;

                	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                	//scoreP.totalPresentation += Number(parseFloat(scoreP.finals)) ? parseFloat(scoreP.finals) : 0;

                	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
                    //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                	//scoreP.totalPresentation += Number(parseFloat(scoreP.totalSt2BusinnesFigures)) ? parseFloat(scoreP.totalSt2BusinnesFigures) : 0;
                    //FDT - ATA 2023 - eliminato Business Figures - FINE
                    //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                    scoreP.totalPresentation += Number(parseFloat(scoreP.totalSt2FinConcept)) ? parseFloat(scoreP.totalSt2FinConcept) : 0;
	                //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                    scoreP.totalPresentation += Number(parseFloat(scoreP.totalSt2FinKPIs)) ? parseFloat(scoreP.totalSt2FinKPIs) : 0;
	                //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                    //scoreP.totalPresentation += Number(parseFloat(scoreP.totalSt2Content)) ? parseFloat(scoreP.totalSt2Content) : 0;
                    //FDT - ATA 2023 - eliminato Content e Investors - FINE
                	scoreP.totalPresentation += Number(parseFloat(scoreP.totalSt2DemonstrationAndDelivery)) ? parseFloat(scoreP.totalSt2DemonstrationAndDelivery) : 0;
                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                    //scoreP.totalPresentation += Number(parseFloat(scoreP.totalSt2Investitors)) ? parseFloat(scoreP.totalSt2Investitors) : 0;
                    //FDT - ATA 2023 - eliminato Content e Investors - FINE
                	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

                	$("#totalPresentation").val(scoreP.totalPresentation);
                	$("#chiptotalpoints").text('  TOTAL POINTS : ' + scoreP.totalPresentation + '  ').css({ 'font-weight': 'bold' });

                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_presentation(scoreid, scoreP);
	}
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total given as parameter
//Event 2019 - Presentation Event has been changed
function insertRecord_scores_presentation(eventid, carid, scoreP) {
	if (isATablet()) {
		//CALCOLO DEI VARI TOTALI
		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
        //FDT - ATA 2023 - eliminato Business Figures - INIZIO
        //scoreP.totalSt2BusinnesFigures = scoreP.Total(scoreP.st2BusinnesFigures);
        //FDT - ATA 2023 - eliminato Business Figures - FINE
        //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
        scoreP.totalSt2FinConcept = scoreP.Total(scoreP.st2FinConcept);
	    //FDT - ATA 2023 - aggiunto Financial Concept - FINE
        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
        scoreP.totalSt2FinKPIs = scoreP.Total(scoreP.st2FinKPIs);
	    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
        //scoreP.totalSt2Content = scoreP.Total(scoreP.st2Content);
        //FDT - ATA 2023 - eliminato Content e Investors - FINE
        scoreP.totalSt2DemonstrationAndDelivery = scoreP.Total(scoreP.st2DemonstrationAndDelivery);
        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
        //scoreP.totalSt2Investitors = scoreP.Total(scoreP.st2Investitors);
        //FDT - ATA 2023 - eliminato Content e Investors - FINE
		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
		//scoreP.totalExecutiveSummary = scoreP.Total(scoreP.executiveSummary);
		//scoreP.totalNovelty = scoreP.Total(scoreP.novelty);
		scoreP.totalContent = scoreP.Total(scoreP.content);
		scoreP.totalFinances = scoreP.Total(scoreP.finances);
		scoreP.totalDeepDiveTopic = scoreP.Total(scoreP.deepDiveTopic);

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
		//scoreP.totalDemonstrationAndStructure	= scoreP.Total(scoreP.demonstrationAndStructure);

        scoreP.totalDelivery = scoreP.Total(scoreP.delivery);
        scoreP.totalStructure = scoreP.Total(scoreP.structure);
		scoreP.totalQuestions = scoreP.Total(scoreP.questions);
		scoreP.totalGeneralImpression = scoreP.Total(scoreP.generalImpression);

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
		scoreP.totalDemonstration = scoreP.Total(scoreP.totalDemonstration);

		//FD 2021.07.27 - ATA 2021  - Add Stage1
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
		//scoreP.totalPresentation = scoreP.Total(
		//	scoreP.totalExecutiveSummary, scoreP.totalNovelty, scoreP.totalContent,
		//	scoreP.totalFinances, scoreP.totalDeepDiveTopic, scoreP.totalDemonstrationAndStructure,
		//	scoreP.totalDelivery, scoreP.totalQuestions, scoreP.totalGeneralImpression, scoreP.miscellaneous, scoreP.stage1
		//);

		//Se sono vuoti metto 0
		if (scoreP.miscellaneous == "")
			scoreP.miscellaneous = 0;

		//SE sono vuoti metto 0
		if (scoreP.stage1 == "")
			scoreP.stage1 = 0;

		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
		//SE sono vuoti metto 0
		if (scoreP.finals == "")
			scoreP.finals = 0;

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>

		//CALCOLO TOTALE DI PRESENTATION
		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
		//scoreP.totalPresentation = scoreP.Total(scoreP.stage1, scoreP.totalNovelty, scoreP.totalContent, scoreP.totalFinances, scoreP.totalDeepDiveTopic, scoreP.totalDemonstrationAndDelivery, scoreP.totalDelivery, scoreP.totalQuestions, scoreP.totalGeneralImpression, scoreP.miscellaneous);
		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
        //FDT - ATA 2023 - eliminato Business Figures, Content, Investor - aggiunto Financial Concept, Financial KPYs - INIZIO
        
        scoreP.totalPresentation = scoreP.Total(scoreP.stage1, scoreP.totalContent, scoreP.totalFinances, scoreP.totalDeepDiveTopic, scoreP.totalDemonstration, scoreP.totalDelivery, scoreP.totalStructure, scoreP.totalQuestions, scoreP.totalGeneralImpression, scoreP.miscellaneous, scoreP.totalSt2FinConcept, scoreP.totalSt2DemonstrationAndDelivery, scoreP.totalSt2FinKPIs);
        //FDT - ATA 2023 - eliminato Business Figures, Content, Investor - aggiunto Financial Concept, Financial KPYs - FINE
        //scoreP.totalPresentation = scoreP.Total(scoreP.stage1, scoreP.totalNovelty, scoreP.totalContent, scoreP.totalFinances,
		//										scoreP.totalDeepDiveTopic, scoreP.totalDemonstrationAndDelivery, scoreP.totalDelivery, scoreP.totalQuestions,
		//										scoreP.totalGeneralImpression, scoreP.miscellaneous,
		//										scoreP.totalSt2BusinnesFigures, scoreP.totalSt2Content, scoreP.totalSt2DemonstrationAndDelivery, scoreP.totalSt2Investitors,
		//										scoreP.finals);

		if (Number(scoreP.scoreid) == -1) {
			//INSERIMENTO PUNTEGGI PRESENTATION
			var SqlString = "";
			SqlString += "INSERT INTO TB_Scores_Presentation ( ";
			SqlString += "scoreid, ";
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
			//SqlString += "executivesummary0, executivesummary1, executivesummary2, executivesummary3, executivesummarynotes, ";
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
			//SqlString += "novelty0, novelty1, novelty2, noveltynotes, ";

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
			//SqlString += "content0, content1, content2, content3, content4, content5, content6, content7, content8, content9, contentnotes, ";
            //FDT - ATA2024
            SqlString += "content0, content1, content2, content3, content4, content5, content6, contentnotes, ";

            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
            //FDT - ATA 2024
            SqlString += "finances0, finances1, finances2, finances3, finances4, finances5, finances6, finances7, finances8, finances9, finances10, finances11, financesnotes, ";

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
            //SqlString += "deepdivetopic0, deepdivetopic1, deepdivetopic2, deepdivetopic3, deepdivetopic4, deepdivetopicnotes, ";
            SqlString += "deepdivetopic0, deepdivetopic1, deepdivetopic2, deepdivetopic3, deepdivetopicnotes, ";

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
			//SqlString += "demonstrationanddelivery0, demonstrationanddelivery1, demonstrationanddelivery2, demonstrationanddelivery3, demonstrationanddelivery4, demonstrationanddelivery5, demonstrationanddeliverynotes, ";
            //FDT - ATA2024
            SqlString += "demonstration0, demonstration1, demonstration2, demonstration3, demonstration4, demonstration5, demonstrationnotes, ";
            //FDT - ATA2024
            SqlString += "structure0, structure1, structure2, structure3, structure4, structurenotes, ";
            //FDT - ATA2024
            SqlString += "delivery0, delivery1, delivery2, delivery3, delivery4, delivery5, delivery6, delivery7, deliverynotes, ";
            SqlString += "questions0, questions1, questions2, questions3, questions4, questions5, questions6, questions7, questionsnotes, ";
            SqlString += "generalimpression0, generalimpression1, generalimpression2, generalimpressionnotes, ";
			SqlString += "miscellaneous, miscellaneousnotes, ";

			//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
            //FDT - ATA 2023 - eliminato Business Figures - INIZIO
            //FDT - ATA 2022 - modify Stage 2
			//SqlString += "St2BusinnesFigures0, St2BusinnesFigures1, St2BusinnesFigures2, St2BusinnesFigures3, St2BusinnesFigures4, St2BusinnesFiguresNotes, ";
            //SqlString += "St2BusinnesFigures0, St2BusinnesFigures1, St2BusinnesFigures2, St2BusinnesFigures3, St2BusinnesFiguresNotes, ";
            //FDT - ATA 2023 - eliminato Business Figures - FINE

            //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
            SqlString += "st2finconcept0, st2finconcept1, st2finconcept2, st2finconcept3, st2finconcept4, st2finconcept5, st2finconcept6, st2finconcept7, st2finconcept8, st2finconcept9, st2finconceptnotes, ";
            //FDT - ATA 2023 - aggiunto Financial Concept - FINE
            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
            SqlString += "st2finkpis0, st2finkpis1, st2finkpis2, st2finkpis3, st2finkpis4, st2finkpisnotes, ";
	        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //SqlString += "St2Content0, St2Content1, St2Content2, St2Content3, St2Content4, St2ContentNotes, ";
            //FDT - ATA 2023 - eliminato Content e Investors - FINE
            SqlString += "st2demonstrationanddelivery0, st2demonstrationanddelivery1, st2demonstrationanddelivery2, st2demonstrationanddelivery3, st2demonstrationanddelivery4, st2demonstrationanddeliverynotes, ";
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //FDT - ATA 2022 - modify Stage 2
            //SqlString += "St2Investitors0, St2Investitors1, St2Investitors2, St2Investitors3, St2InvestitorsNotes, ";
            //SqlString += "St2Investitors0, St2Investitors1, St2Investitors2, St2InvestitorsNotes, ";
            //FDT - ATA 2023 - eliminato Content e Investors - Fine
			//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

			SqlString += "presentationnotes, ";

			//FD 2021.07.27 - ATA 2021  - Add Stage1
			SqlString += "stage1, ";

			//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
			SqlString += "finals) ";

			SqlString += "VALUES( ";
			SqlString += "(SELECT MAX(id) FROM TB_Scores), ";
            //FDT - ATA 2023 - midifiche stage3
            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
			//SqlString += "?, ?, ?, ?, ";															//novelty - 4

            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
            //FDT - ATA2024
			SqlString += "?, ?, ?, ?, ?, ?, ?, ?,";										//content - 8                       (numeri e note) PER TUTTI

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
            SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ";						        //finances - 13 

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
			SqlString += "?, ?, ?, ?, ?, ";														//deepdivetopic - 5

            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
            //FDT - ATA2024
			SqlString += "?, ?, ?, ?, ?, ?, ?, ";													//Demonstration - 7

			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
			SqlString += "?, ?, ?, ?, ?, ?, ";														//structure - 6
            //FDT - ATA2024
            SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ";											//delivery) - 9
			SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ";										//questions -9
			SqlString += "?, ?, ?, ?, ";															//generalimpression - 4
			SqlString += "?, ?, ";																	//miscellaneous - 2

			//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
            //FDT - ATA 2023 - eliminato Business Figures, Content - INIZIO
            //FDT - ATA 2022 - modify Stage 2
			//SqlString += "?, ?, ?, ?, ?, ";														    //St2BusinnesFigures - 5
            //SqlString += "?, ?, ?, ?, ?, ?, ";														//St2Content - 6
            //FDT - ATA 2023 - eliminato Business Figures, Content - FINE
            //FDT - ATA 2023 - aggiunto Financial Concept, Financial kpi - INIZIO
            SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ";                                       //St2FinConcept -11
            SqlString += "?, ?, ?, ?, ?, ?, ";                                                      //St2FinKPIs - 6
            //FDT - ATA 2023 - aggiunto Financial Concept, Financial kpi - FINE
            SqlString += "?, ?, ?, ?, ?, ?, ";														//St2DemonstrationAndDeliveryNotes - 6
            //FDT - ATA 2022 - modify Stage 2
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
			//SqlString += "?, ?, ?, ?, ";															//St2Investitors - 4
            //FDT - ATA 2023 - eliminato Content e Investors - FINE
			//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

			//FD 2021.07.27 - ATA 2021  - Add Stage1
			//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
			SqlString += "?, ?, ? )";																	//presentationnotes, stage1, finals - 3

			db.transaction(function (tx) {
				//INSERT SCORE FIRST
				tx.executeSql(
                    "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, scoreP.totalPresentation],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				console.log("INSERTRECORD_SCORES_PRESENTATION - TABLET \n" + SqlString);	//DEBUG))

				//Now insert details
				//FD 2021.07.27 - ATA 2021  - Add Stage1
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
				//	
				tx.executeSql(
            		SqlString,
                    [
                        //FDT -ATA 2023 - modifiche stage3
                        //scoreP.novelty[0], scoreP.novelty[1], scoreP.novelty[2], scoreP.noveltyNotes,
                        //FDT - ATA2024
                        scoreP.content[0], scoreP.content[1], scoreP.content[2], scoreP.content[3], scoreP.content[4], scoreP.content[5], scoreP.content[6], scoreP.contentNotes,
                        //FDT - ATA 2024
                        scoreP.finances[0], scoreP.finances[1], scoreP.finances[2], scoreP.finances[3], scoreP.finances[4], scoreP.finances[5], scoreP.finances[6], scoreP.finances[7], scoreP.finances[8], scoreP.finances[9], scoreP.finances[10], scoreP.finances[11], scoreP.financesNotes,
                        scoreP.deepDiveTopic[0], scoreP.deepDiveTopic[1], scoreP.deepDiveTopic[2], scoreP.deepDiveTopic[3], scoreP.deepDiveTopicNotes,
                        //FDT - ATA2024
                        scoreP.demonstration[0], scoreP.demonstration[1], scoreP.demonstration[2], scoreP.demonstration[3], scoreP.demonstration[4], scoreP.demonstration[5], scoreP.demonstrationNotes,
                        //FDT - ATA2024
                        scoreP.structure[0], scoreP.structure[1], scoreP.structure[2], scoreP.structure[3], scoreP.structure[4], scoreP.structureNotes,
                        //FDT - ATA2024
                        scoreP.delivery[0], scoreP.delivery[1], scoreP.delivery[2], scoreP.delivery[3], scoreP.delivery[4], scoreP.delivery[5], scoreP.delivery[6], scoreP.delivery[7], scoreP.deliveryNotes,
                        scoreP.questions[0], scoreP.questions[1], scoreP.questions[2], scoreP.questions[3], scoreP.questions[4], scoreP.questions[5], scoreP.questions[6], scoreP.questions[7], scoreP.questionsNotes,
                        scoreP.generalImpression[0], scoreP.generalImpression[1], scoreP.generalImpression[2], scoreP.generalImpressionNotes,
            			scoreP.miscellaneous, scoreP.miscellaneousNotes,

                        //FDT - ATA 2022 - modify Stage 2
                        //scoreP.st2BusinnesFigures[0], scoreP.st2BusinnesFigures[1], scoreP.st2BusinnesFigures[2], scoreP.st2BusinnesFigures[3], scoreP.st2BusinnesFigures[4], scoreP.st2BusinnesFiguresNotes,
                        //FDT - ATA 2023 - eliminato Business Figures,Content - INIZIO
                        //scoreP.st2BusinnesFigures[0], scoreP.st2BusinnesFigures[1], scoreP.st2BusinnesFigures[2], scoreP.st2BusinnesFigures[3], scoreP.st2BusinnesFiguresNotes,
						//scoreP.st2Content[0], scoreP.st2Content[1], scoreP.st2Content[2], scoreP.st2Content[3], scoreP.st2Content[4], scoreP.st2ContentNotes,
                        //FDT - ATA 2023 - eliminato Business Figures, Content - FINE
                        //FDT - ATA 2023 - aggiunto Financial Concept, Financial KPIs & insights - INIZIO
                        scoreP.st2FinConcept[0], scoreP.st2FinConcept[1], scoreP.st2FinConcept[2], scoreP.st2FinConcept[3], scoreP.st2FinConcept[4], scoreP.st2FinConcept[5], scoreP.st2FinConcept[6], scoreP.st2FinConcept[7],
                        scoreP.st2FinConcept[8], scoreP.st2FinConcept[9], scoreP.st2FinConceptNotes,
                        scoreP.st2FinKPIs[0], scoreP.st2FinKPIs[1], scoreP.st2FinKPIs[2], scoreP.st2FinKPIs[3], scoreP.st2FinKPIs[4], scoreP.st2FinKPIsNotes,
                        //FDT - ATA 2023 - aggiunto Financial Concept, Financial KPIs & insights - FINE
                        scoreP.st2DemonstrationAndDelivery[0], scoreP.st2DemonstrationAndDelivery[1], scoreP.st2DemonstrationAndDelivery[2], scoreP.st2DemonstrationAndDelivery[3], scoreP.st2DemonstrationAndDelivery[4], scoreP.st2DemonstrationAndDeliveryNotes,
                        //FDT - ATA 2023 - eliminato  Investors - INIZIO
                        //FDT - ATA 2022 - modify Stage 2
                        //scoreP.st2Investitors[0], scoreP.st2Investitors[1], scoreP.st2Investitors[2], scoreP.st2Investitors[3], scoreP.st2InvestitorsNotes,
                        //scoreP.st2Investitors[0], scoreP.st2Investitors[1], scoreP.st2Investitors[2], scoreP.st2InvestitorsNotes,
                        //FDT - ATA 2023 - eliminato  Investors - FINE

            			scoreP.presentationNotes, scoreP.stage1, scoreP.finals
            		],
            		function (tx, result) { foo(); },
            		function (tx, result) { onError(tx, result); }
            	);
			});
		}
		else {
			db.transaction(function (tx) {
				//Aggiornamento punteggio totale
				tx.executeSql(
					"UPDATE TB_Scores SET score = ? WHERE id = ?",
					[scoreP.totalPresentation, scoreP.scoreid],
					function (tx, result) { foo(); },
					function (tx, result) { onError(tx, result); }
				);

                //FDT - ATA 2023 - modifiche stage3
				//Inserimento punteggio Presentation
				var SqlString = "INSERT INTO TB_Scores_Presentation VALUES( ?, ";				//scoreid - 1

				//SqlString += "?, ?, ?, ?, ";													//novelty - 4
                //FDT - ATA2024
                SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ";								        //content - 8               (numeri più le note) PER TUTTI
                //FDT - ATA 2024
                SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ";							//finances - 13
				SqlString += "?, ?, ?, ?, ?, ";												    //deepdivetopic - 5
                //FDT - ATA2024
                SqlString += "?, ?, ?, ?, ?, ?, ?, ";										    //Demonstration - 7
                SqlString += "?, ?, ?, ?, ?, ?, ";											    //structure - 6
                //FDT - ATA2024
				SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ";								        //delivery - 9
				SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ";							        	//questions - 9
				SqlString += "?, ?, ?, ?, ";													//generalimpression - 4
				SqlString += "?, ?, ";															//miscellaneous - 2

				//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
                //FDT - ATA 2023 - eliminato Business Figures, Content - INIZIO
                //FDT - ATA 2022 - modify Stage 2
				//SqlString += "?, ?, ?, ?, ?, ";												//St2BusinnesFigures - 5
                //SqlString += "?, ?, ?, ?, ?, ?, ";												//St2Content - 6
                //FDT - ATA 2023 - eliminato Business Figures, Content - FINE
                //FDT - ATA 2023 - aggiunto Financial Concept, Fin KPI - INIZIO
                SqlString += "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ";                                       //St2FinConcept -11
                SqlString += "?, ?, ?, ?, ?, ?, ";                                                      //St2FinKPIs - 6
                //FDT - ATA 2023 - aggiunto Financial Concept, Fin KPI - FINE
				SqlString += "?, ?, ?, ?, ?, ?, ";												//St2DemonstrationAndDeliveryNotes - 6
                //FDT - ATA 2022 - modify Stage 2
                //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                //SqlString += "?, ?, ?, ?, ";													//St2Investitors - 4
                //FDT - ATA 2023 - eliminato Content e Investors - FINE
				//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

				//FD 2021.07.27 - ATA 2021  - Add Stage1
				//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
				SqlString += "?, ?, ? )";															//presentationnotes + stage1 + finals - 3

				//db.transaction(function (tx) {
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
				//			
				tx.executeSql(
						insertStatement_scores_presentation
                    [
                            //FDT - ATA 2023 modifiche stage3
							scoreP.scoreid,
                            //scoreP.novelty[0], scoreP.novelty[1], scoreP.novelty[2], scoreP.noveltyNotes,
                            //FDT - ATA2024
                            scoreP.content[0], scoreP.content[1], scoreP.content[2], scoreP.content[3], scoreP.content[4], scoreP.content[5], scoreP.content[6], scoreP.contentNotes,
                            //FDT - ATA 2024
                            scoreP.finances[0], scoreP.finances[1], scoreP.finances[2], scoreP.finances[3], scoreP.finances[4], scoreP.finances[5], scoreP.finances[6], scoreP.finances[7], scoreP.finances[8], scoreP.finances[9], scoreP.finances[10], scoreP.finances[11], scoreP.financesNotes,
                            scoreP.deepDiveTopic[0], scoreP.deepDiveTopic[1], scoreP.deepDiveTopic[2], scoreP.deepDiveTopic[3], scoreP.deepDiveTopicNotes,
                            //FDT - ATA2024
                            scoreP.demonstration[0], scoreP.demonstration[1], scoreP.demonstration[2], scoreP.demonstration[3], scoreP.demonstration[4], scoreP.demonstration[5], scoreP.demonstrationNotes,
                            //FDT - ATA2024
                            scoreP.structure[0], scoreP.structure[1], scoreP.structure[2], scoreP.structure[3], scoreP.structure[4], scoreP.structureNotes,
                            //FDT - ATA2024
                            scoreP.delivery[0], scoreP.delivery[1], scoreP.delivery[2], scoreP.delivery[3], scoreP.delivery[4], scoreP.delivery[5], scoreP.delivery[6], scoreP.delivery[7], scoreP.deliveryNotes,
							scoreP.questions[0], scoreP.questions[1], scoreP.questions[2], scoreP.questions[3], scoreP.questions[4], scoreP.questions[5], scoreP.questions[6], scoreP.questions[7], scoreP.questionsNotes,
                            
							scoreP.generalImpression[0], scoreP.generalImpression[1], scoreP.generalImpression[2], scoreP.generalImpressionNotes,
							scoreP.miscellaneous, scoreP.miscellaneousNotes,

                            //FDT - ATA 2023 - eliminato Business Figures, Content - INIZIO
                            //FDT - ATA 2022 - modify Stage 2
                            //scoreP.st2BusinnesFigures[0], scoreP.st2BusinnesFigures[1], scoreP.st2BusinnesFigures[2], scoreP.st2BusinnesFigures[3], scoreP.st2BusinnesFigures[4], scoreP.st2BusinnesFiguresNotes,
                            //scoreP.st2BusinnesFigures[0], scoreP.st2BusinnesFigures[1], scoreP.st2BusinnesFigures[2], scoreP.st2BusinnesFigures[3], scoreP.st2BusinnesFiguresNotes,
							//scoreP.st2Content[0], scoreP.st2Content[1], scoreP.st2Content[2], scoreP.st2Content[3], scoreP.st2Content[4], scoreP.st2ContentNotes,
                            //FDT - ATA 2023 - eliminato Business Figures, Content - FINE

                            scoreP.st2DemonstrationAndDelivery[0], scoreP.st2DemonstrationAndDelivery[1], scoreP.st2DemonstrationAndDelivery[2], scoreP.st2DemonstrationAndDelivery[3], scoreP.st2DemonstrationAndDelivery[4], scoreP.st2DemonstrationAndDeliveryNotes,
                            //FDT - ATA 2023 - aggiunto Financial concept, Financial KPIs & insights - INIZIO
                            scoreP.st2FinConcept[0], scoreP.st2FinConcept[1], scoreP.st2FinConcept[2], scoreP.st2FinConcept[3], scoreP.st2FinConcept[4], scoreP.st2FinConcept[5], scoreP.st2FinConcept[6], scoreP.st2FinConcept[7], scoreP.st2FinConcept[8], scoreP.st2FinConcept[9], scoreP.st2FinConceptNotes,
                            scoreP.st2FinKPIs[0], scoreP.st2FinKPIs[1], scoreP.st2FinKPIs[2], scoreP.st2FinKPIs[3], scoreP.st2FinKPIs[4], scoreP.st2FinKPIsNotes,
                            //FDT - ATA 2023 - aggiunto Financial concept, Financial KPIs & insights - FINE
                            //FDT - ATA 2023 - eliminato Investors - INIZIO
                            //FDT - ATA 2022 - modify Stage 2
                            //scoreP.st2Investitors[0], scoreP.st2Investitors[1], scoreP.st2Investitors[2], scoreP.st2Investitors[3], scoreP.st2InvestitorsNotes,
                            //scoreP.st2Investitors[0], scoreP.st2Investitors[1], scoreP.st2Investitors[2], scoreP.st2InvestitorsNotes,
                            //FDT - ATA 2023 - eliminato Investors - FINE

							scoreP.presentationNotes, scoreP.stage1, scoreP.finals
				],
						function (tx, result) { foo(); },
						function (tx, result) { onError(tx, result); }
				);
			});
        }

        backToScores();
	}
	else {
		WS_insertRecord_scores_presentation(eventid, carid, scoreP);
	}
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total given as parameter
//Event 2019 - Presentation Event has been changed
function updateRecord_scores_presentation(scoreP) {
	if (isATablet()) {
		//CALCOLO DEI VARI TOTALI
		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
        //FDT - ATA 2023 - eliminato Business Figures - INIZIO
        //scoreP.totalSt2BusinnesFigures = scoreP.Total(scoreP.st2BusinnesFigures);
        //FDT - ATA 2023 - eliminato Business Figures - FINE
        //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
        scoreP.totalSt2FinConcept = scoreP.Total(scoreP.st2FinConcept);
	    //FDT - ATA 2023 - aggiunto Financial Concept - FINE
        //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
        scoreP.totalSt2FinKPIs = scoreP.Total(scoreP.st2FinKPIs);
	    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
        //scoreP.totalSt2Content = scoreP.Total(scoreP.st2Content);
        //FDT - ATA 2023 - eliminato Content e Investors - FINE
        scoreP.totalSt2DemonstrationAndDelivery = scoreP.Total(scoreP.st2DemonstrationAndDelivery);
        //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
        //scoreP.totalSt2Investitors = scoreP.Total(scoreP.st2Investitors);
        //FDT - ATA 2023 - eliminato Content e Investors - FINE
		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
		//scoreP.totalExecutiveSummary = scoreP.Total(scoreP.executiveSummary);
		//scoreP.totalNovelty = scoreP.Total(scoreP.novelty);
		scoreP.totalContent = scoreP.Total(scoreP.content);
		scoreP.totalFinances = scoreP.Total(scoreP.finances);
		scoreP.totalDeepDiveTopic = scoreP.Total(scoreP.deepDiveTopic);

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
		scoreP.totalDemonstration = scoreP.Total(scoreP.totalDemonstration);

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
		//scoreP.totalDemonstrationAndStructure	= scoreP.Total(scoreP.demonstrationAndStructure);

        scoreP.totalDelivery = scoreP.Total(scoreP.delivery);
        scoreP.totalStructure = scoreP.Total(scoreP.structure);
		scoreP.totalQuestions = scoreP.Total(scoreP.questions);
		scoreP.totalGeneralImpression = scoreP.Total(scoreP.generalImpression);

		//FD 2021.07.27 - ATA 2021  - Add Stage1
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
		//scoreP.totalPresentation = scoreP.Total(
		//	scoreP.totalExecutiveSummary, scoreP.totalNovelty, scoreP.totalContent,
		//	scoreP.totalFinances, scoreP.totalDeepDiveTopic, scoreP.totalDemonstrationAndStructure,
		//	scoreP.totalDelivery, scoreP.totalQuestions, scoreP.totalGeneralImpression, scoreP.miscellaneous, scoreP.stage1
		//);

		//Se sono vuoti metto 0
		if (scoreP.miscellaneous == "")
			scoreP.miscellaneous = 0;

		//SE sono vuoti metto 0
		if (scoreP.stage1 == "")
			scoreP.stage1 = 0;

		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
		//SE sono vuoti metto 0
		if (scoreP.finals == "")
			scoreP.finals = 0;

		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>

		//CALCOLO TOTALE DI PRESENTATION
		//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
		//scoreP.totalPresentation = scoreP.Total(scoreP.stage1, scoreP.totalNovelty, scoreP.totalContent, scoreP.totalFinances, scoreP.totalDeepDiveTopic, scoreP.totalDemonstrationAndDelivery, scoreP.totalDelivery, scoreP.totalQuestions, scoreP.totalGeneralImpression, scoreP.miscellaneous);
		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
        scoreP.totalPresentation = scoreP.Total(scoreP.stage1,
                                                //scoreP.totalNovelty,
                                                scoreP.totalContent, scoreP.totalFinances,
                                                scoreP.totalDeepDiveTopic, scoreP.totalDemonstration, scoreP.totalDelivery, scoreP.totalStructure, scoreP.totalQuestions,
                                                scoreP.totalGeneralImpression, scoreP.miscellaneous,
                                                //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                                                /*scoreP.totalSt2BusinnesFigures,*/
                                                //FDT - ATA 2023 - eliminato Business Figures - FINE
                                                //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                                                scoreP.totalSt2FinConcept,
	                                            //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                                                //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                                                scoreP.totalSt2FinKPIs,
	                                            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
                                                //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                                //scoreP.totalSt2Content,
                                                //FDT - ATA 2023 - eliminato Content e Investors - FINE
                                                scoreP.totalSt2DemonstrationAndDelivery
                                                //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                                //scoreP.totalSt2Investitors
                                                //FDT - ATA 2023 - eliminato Content e Investors - FINE
        );

		//Aggiornamento punteggio presentation
		db.transaction(function (tx) {
			//Aggiornamento punteggio globale
			tx.executeSql(
				"UPDATE TB_Scores SET score = ? WHERE id = ?",
				[scoreP.totalPresentation, scoreP.scoreid],
				function (tx, result) { foo(); },
				function (tx, result) { onError(tx, result); }
			);

			//FD 2021.07.27 - ATA 2021  - Add Stage1
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
            //FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
			tx.executeSql(
				updateStatement_scores_presentation,
				[
                    //scoreP.novelty[0], scoreP.novelty[1], scoreP.novelty[2], scoreP.noveltyNotes,
                    //FDT - ATA2024
					scoreP.content[0], scoreP.content[1], scoreP.content[2], scoreP.content[3], scoreP.content[4], scoreP.content[5], scoreP.content[6], scoreP.contentNotes,
                    //FDT - ATA 2024
                    scoreP.finances[0], scoreP.finances[1], scoreP.finances[2], scoreP.finances[3], scoreP.finances[4], scoreP.finances[5], scoreP.finances[6], scoreP.finances[7], scoreP.finances[8], scoreP.finances[9], scoreP.finances[10], scoreP.finances[11], scoreP.financesNotes,
                    scoreP.deepDiveTopic[0], scoreP.deepDiveTopic[1], scoreP.deepDiveTopic[2], scoreP.deepDiveTopic[3], scoreP.deepDiveTopicNotes,
                    //FDT - ATA2024
                    scoreP.demonstration[0], scoreP.demonstration[1], scoreP.demonstration[2], scoreP.demonstration[3], scoreP.demonstration[4], scoreP.demonstration[5], scoreP.demonstrationNotes,
                    //FDT - ATA2024
                    scoreP.structure[0], scoreP.structure[1], scoreP.structure[2], scoreP.structure[3], scoreP.structure[4], scoreP.structureNotes,
                    //FDT - ATA2024
                    scoreP.delivery[0], scoreP.delivery[1], scoreP.delivery[2], scoreP.delivery[3], scoreP.delivery[4], scoreP.delivery[5], scoreP.delivery[6], scoreP.delivery[7], scoreP.deliveryNotes,
					scoreP.questions[0], scoreP.questions[1], scoreP.questions[2], scoreP.questions[3], scoreP.questions[4], scoreP.questions[5], scoreP.questions[6], scoreP.questions[7], scoreP.questionsNotes,
                    
					scoreP.generalImpression[0], scoreP.generalImpression[1], scoreP.generalImpression[2], scoreP.generalImpressionNotes,
					scoreP.miscellaneous, scoreP.miscellaneousNotes,

                    //FDT - ATA 2022 - modify Stage 2
                    //scoreP.st2BusinnesFigures[0], scoreP.st2BusinnesFigures[1], scoreP.st2BusinnesFigures[2], scoreP.st2BusinnesFigures[3], scoreP.st2BusinnesFigures[4], scoreP.st2BusinnesFiguresNotes,
                    //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                    //scoreP.st2BusinnesFigures[0], scoreP.st2BusinnesFigures[1], scoreP.st2BusinnesFigures[2], scoreP.st2BusinnesFigures[3], scoreP.st2BusinnesFiguresNotes,
                    //FDT - ATA 2023 - eliminato Business Figures - FINE
                    //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                    scoreP.st2FinConcept[0], scoreP.st2FinConcept[1], scoreP.st2FinConcept[2], scoreP.st2FinConcept[3],
                    scoreP.st2FinConcept[4], scoreP.st2FinConcept[5], scoreP.st2FinConcept[6], scoreP.st2FinConcept[7], scoreP.st2FinConcept[8], scoreP.st2FinConcept[9],
                    scoreP.st2FinConceptNotes,
                    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                    scoreP.st2FinKPIs[0], scoreP.st2FinKPIs[1], scoreP.st2FinKPIs[2], scoreP.st2FinKPIs[3], scoreP.st2FinKPIs[4],
                    scoreP.st2FinKPIsNotes,
	                //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	                //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                    //scoreP.st2Content[0], scoreP.st2Content[1], scoreP.st2Content[2], scoreP.st2Content[3], scoreP.st2Content[4], scoreP.st2ContentNotes,
                    //FDT - ATA 2023 - eliminato Content e Investors - FINE
                    scoreP.st2DemonstrationAndDelivery[0], scoreP.st2DemonstrationAndDelivery[1], scoreP.st2DemonstrationAndDelivery[2], scoreP.st2DemonstrationAndDelivery[3], scoreP.st2DemonstrationAndDelivery[4], scoreP.st2DemonstrationAndDeliveryNotes,
                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                    //FDT - ATA 2022 - modify Stage 2
                    //scoreP.st2Investitors[0], scoreP.st2Investitors[1], scoreP.st2Investitors[2], scoreP.st2Investitors[3], scoreP.st2InvestitorsNotes,
                    //scoreP.st2Investitors[0], scoreP.st2Investitors[1], scoreP.st2Investitors[2], scoreP.st2InvestitorsNotes,
                    //FDT - ATA 2023 - eliminato Content e Investors - FINE

					scoreP.presentationNotes,
					scoreP.stage1,
					scoreP.finals,
					Number(scoreP.scoreid)
				],
				function (tx, result) { foo(); },
				function (tx, result) {
					onError(tx, result);
				}
			);
        });

        backToScores();
	}
	else {
		WS_updateRecord_scores_presentation(scoreP);
	}
}

function deleteRecord_scores_presentation(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_presentation,
                [scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_scores_presentation(scoreid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES COST ---------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

function createTable_scores_cost() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scoresCost,
            [],
            function (tx, result) {
            	foo();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function dropTable_scores_cost() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scoresCost,
            [],
            function (tx, result) {
            	foo();
            },
            function (tx, result) {
            	onError(tx, result);
            }
        );
	});
}

function insertRecord_scores_cost(eventid, carid, scoreid, LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes) {
	if (isATablet()) {

		var TotalAchivedPoints = parseFloat(LowestCost) + parseFloat(Accuracy) + parseFloat(EventDay) + parseFloat(Presentation) - parseFloat(Penalties);

		if (Number(scoreid) == -1) {
			db.transaction(function (tx) {
				tx.executeSql(
                   "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, TotalAchivedPoints],
                    function (tx, result) {
                    	//Now insert details
                    	foo();
                    },
                    function (tx, result) {
                    	onError(tx, result);
                    }
                );
				tx.executeSql(
                          "INSERT INTO TB_Scores_Cost_2015 (LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes,TotalAchivedPoints,  scoreid )  VALUES(?, ?, ?, ?, ?, ?, ?,(SELECT MAX(id) FROM TB_Scores))",
                           [LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes, TotalAchivedPoints],
                           function (tx, result) {
                           	foo();
                           },
                           function (tx, result) {
                           	onError(tx, result);
                           }
                       );
			});
		}
		else {
			db.transaction(function (tx) {
				var TotalAchivedPoints = parseFloat(LowestCost) + parseFloat(Accuracy) + parseFloat(EventDay) + parseFloat(Presentation) - parseFloat(Penalties);
				tx.executeSql(
                    insertStatement_scores_Cost,
                    [LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes, TotalAchivedPoints, scoreid],
                    function (tx, result) {
                    	foo();
                    },
                    function (tx, result) {
                    	onError(tx, result);
                    }
                );
			});
        }
        backToScores();
	}
	else {
		WS_insertRecord_scores_cost(eventid, carid, scoreid, LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes);
	}
}

function updateRecord_scores_cost(scoreid, LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes) {
	if (isATablet()) {
		var TotalAchivedPoints = parseFloat(LowestCost) + parseFloat(Accuracy) + parseFloat(EventDay) + parseFloat(Presentation) - parseFloat(Penalties);
		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores_Cost,
                [LowestCost, Accuracy, EventDay, Presentation, Penalties, TotalAchivedPoints, Notes, scoreid],
                function (tx, result) {
                	foo();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
			tx.executeSql(
              "UPDATE TB_Scores SET score = ? WHERE id = ?",
              [TotalAchivedPoints, scoreid],
              function (tx, result) {
              	foo();
              },
              function (tx, result) {
              	onError(tx, result);
              }
          );

        });
        backToScores();
	}
	else {
		WS_updateRecord_scores_cost(scoreid, LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes);
	}
}

function deleteRecord_scores_cost(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_Cost,
                [scoreid],
                function (tx, result) {
                	foo();
                },
                function (tx, result) {
                	onError(tx, result);
                }
            );
		});
	}
	else {
		WS_deleteRecord_scores_cost(scoreid);
	}
}

function showRecords_scores_cost(scoreid) {

	if (isATablet()) {
		console.log(scoreid);
		console.log(selectStatement_scores_Cost);

		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_Cost,
                [scoreid],
                function (tx, result) {

                	waitON();

                	dataset_scores_Cost = result.rows;

                	var id = -1;
                	var scoreid = -1;
                	var CostBeforAddendum = 0;
                	var AddendumeAdjustment = 0;
                	var VisualInspection = 0;
                	var EventDay = 0;
                	var Penalities = 0;
                	var DelayPenalities = 0;
                	var Notes = "";

                	if (dataset_scores_Cost.length) {

                		var item = dataset_scores_Cost.item(0);


                		var LowestCost = $("#LowestCost").val();
                		var Accuracy = $("#Accuracy").val();
                		var EventDay = $("#EventDay").val();
                		var Presentation = $("#Presentation").val();
                		var Penalties = $("#Penalties").val();
                		var Notes = $("#Notes").val();

                		$("#id").val(item['Id']);
                		$("#scoreid").val(item['ScoreId']);
                		$("#LowestCost").val(item['LowestCost']);
                		$("#Accuracy").val(item['Accuracy']);
                		$("#EventDay").val(item['EventDay']);
                		$("#Presentation").val(item['Presentation']);
                		$("#Penalties").val(item['Penalties']);
                		$("#Notes").val(item['Notes']);

                		//$("#lbl_CostBeforAddendum").addClass("active");
                		//$("#lbl_AddendumeAdjustment").addClass("active");
                		//$("#lbl_VisualInspection").addClass("active");
                		//$("#lbl_EventDay").addClass("active");
                		//$("#lbl_Penalities").addClass("active");
                		//$("#lbl_DelayPenalities").addClass("active");
                		//$("#lbl_Notes").addClass("active");
                	}
                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_cost(scoreid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES ACCELERATION ---------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores_acceleration() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores_acceleration,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores_acceleration() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores_acceleration,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function calculate_scores_acceleration_adj(time, cones) {
	//How to calculate AdjTime
	//=IF(F6<>0;F6+G6*2;"DNA")
	//F6 : Time
	//G6 : Cones

	time = parseFloat(time);
	cones = parseFloat(cones);

	cones = (isNaN(cones)) ? 0 : cones;

	if ((time > 0) && (!isNaN(cones))) {
		time = time + parseFloat(cones * 2);
		return time.toFixed(4);
	}
	else {
		return -1;
	}
	return time;
}

function insertRecord_scores_acceleration(eventid, carid, scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
	if (isATablet()) {

		var r1timeadj = calculate_scores_acceleration_adj(r1time, r1numofcones);
		var r2timeadj = calculate_scores_acceleration_adj(r2time, r2numofcones);
		var r3timeadj = calculate_scores_acceleration_adj(r3time, r3numofcones);
		var r4timeadj = calculate_scores_acceleration_adj(r4time, r4numofcones);
		var givenscore = 0;

		if (Number(scoreid) == -1) {
			db.transaction(function (tx) {
				//Insert Score First
				tx.executeSql(
                    "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, givenscore],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				//Now insert details
				tx.executeSql(
                    "INSERT INTO TB_Scores_Acceleration (scoreid, run1time, run1numofcones, run1timeadj, run2time, run2numofcones, run2timeadj, run3time, run3numofcones, run3timeadj, run4time, run4numofcones, run4timeadj)  VALUES( (SELECT MAX(id) FROM TB_Scores), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [r1time, r1numofcones, r1timeadj, r2time, r2numofcones, r2timeadj, r3time, r3numofcones, r3timeadj, r4time, r4numofcones, r4timeadj],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
		}
		else {
			db.transaction(function (tx) {
				tx.executeSql(
                    insertStatement_scores_acceleration,
                    [scoreid, r1time, r1numofcones, r1timeadj, r2time, r2numofcones, r2timeadj, r3time, r3numofcones, r3timeadj, r4time, r4numofcones, r4timeadj],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				tx.executeSql(
                    "UPDATE TB_Scores SET score = ? WHERE id = ?",
                    [givenscore, scoreid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
        }
        backToScores();
	}
	else {
		WS_insertRecord_scores_acceleration(eventid, carid, scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones);
	}
}

function updateRecord_scores_acceleration(scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
	if (isATablet()) {

		var r1timeadj = calculate_scores_acceleration_adj(r1time, r1numofcones);
		var r2timeadj = calculate_scores_acceleration_adj(r2time, r2numofcones);
		var r3timeadj = calculate_scores_acceleration_adj(r3time, r3numofcones);
		var r4timeadj = calculate_scores_acceleration_adj(r4time, r4numofcones);
		var givenscore = 0;


		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores_acceleration,
                [r1time, r1numofcones, r1timeadj, r2time, r2numofcones, r2timeadj, r3time, r3numofcones, r3timeadj, r4time, r4numofcones, r4timeadj, Number(scoreid)],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );

			tx.executeSql(
                "UPDATE TB_Scores SET score = ? WHERE id = ?",
                [givenscore, scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
        backToScores();
	}
	else {
		WS_updateRecord_scores_acceleration(scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones);
	}
}

function deleteRecord_scores_acceleration(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_acceleration,
                [scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_scores_acceleration(scoreid);
	}
}

function showRecords_scores_acceleration(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_acceleration,
                [scoreid],
                function (tx, result) {
                	waitON();

                	dataset_scores_acceleration = result.rows;

                	var id = -1;
                	var scoreid = -1;

                	var r1time = 0;
                	var r2time = 0;
                	var r3time = 0;
                	var r4time = 0;

                	var r1numofcones = 0;
                	var r2numofcones = 0;
                	var r3numofcones = 0;
                	var r4numofcones = 0;

                	var r1timeadj = 0;
                	var r2timeadj = 0;
                	var r3timeadj = 0;
                	var r4timeadj = 0;

                	if (dataset_scores_acceleration.length) {
                		var item = dataset_scores_acceleration.item(0);

                		id = item['id'];
                		scoreid = item['scoreid'];

                		r1time = item['run1time'];
                		r2time = item['run2time'];
                		r3time = item['run3time'];
                		r4time = item['run4time'];

                		r1numofcones = item['run1numofcones'];
                		r2numofcones = item['run2numofcones'];
                		r3numofcones = item['run3numofcones'];
                		r4numofcones = item['run4numofcones'];

                		r1timeadj = item['run1timeadj'];
                		r2timeadj = item['run2timeadj'];
                		r3timeadj = item['run3timeadj'];
                		r4timeadj = item['run4timeadj'];
                	}

                	if (parseFloat(r1timeadj) == -1) r1timeadj = "DNA";
                	if (parseFloat(r2timeadj) == -1) r2timeadj = "DNA";
                	if (parseFloat(r3timeadj) == -1) r3timeadj = "DNA";
                	if (parseFloat(r4timeadj) == -1) r4timeadj = "DNA";

                	$("#id").val(id);
                	$("#scoreid").val(scoreid);

                	$("#run1time").val(r1time);
                	$("#run2time").val(r2time);
                	$("#run3time").val(r3time);
                	$("#run4time").val(r4time);

                	$("#run1numofcones").val(r1numofcones);
                	$("#run2numofcones").val(r2numofcones);
                	$("#run3numofcones").val(r3numofcones);
                	$("#run4numofcones").val(r4numofcones);

                	$("#run1timeadj").val(r1timeadj);
                	$("#run2timeadj").val(r2timeadj);
                	$("#run3timeadj").val(r3timeadj);
                	$("#run4timeadj").val(r4timeadj);

                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_acceleration(scoreid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES SKID PAD -------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores_skidpad() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores_skidpad,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores_skidpad() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores_skidpad,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function calculate_scores_skidpad_adj(time, cones) {
	//How to calculate AdjTime
	//=IF(F6<>0;F6+G6*0.25;"DNA")
	//F6 : Time
	//G6 : Cones

	time = parseFloat(time);
	cones = parseFloat(cones);

	cones = (isNaN(cones)) ? 0 : cones;

	if ((time > 0) && (!isNaN(cones))) {
		time = time + parseFloat(cones * 0.2);
		return time.toFixed(4);
	}
	else {
		return -1;
	}
	return time;
}

function insertRecord_scores_skidpad(eventid, carid, scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
	if (isATablet()) {

		var r1timeadj = calculate_scores_skidpad_adj(r1time, r1numofcones);
		var r2timeadj = calculate_scores_skidpad_adj(r2time, r2numofcones);
		var r3timeadj = calculate_scores_skidpad_adj(r3time, r3numofcones);
		var r4timeadj = calculate_scores_skidpad_adj(r4time, r4numofcones);
		var givenscore = 0;

		if (Number(scoreid) == -1) {
			db.transaction(function (tx) {
				//Insert Score First
				tx.executeSql(
                    "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, givenscore],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				//Now insert details
				tx.executeSql(
                    "INSERT INTO TB_Scores_SkidPad (scoreid, run1time, run1numofcones, run1timeadj, run2time, run2numofcones, run2timeadj, run3time, run3numofcones, run3timeadj, run4time, run4numofcones, run4timeadj)  VALUES( (SELECT MAX(id) FROM TB_Scores), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [r1time, r1numofcones, r1timeadj, r2time, r2numofcones, r2timeadj, r3time, r3numofcones, r3timeadj, r4time, r4numofcones, r4timeadj],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
		}
		else {
			db.transaction(function (tx) {
				tx.executeSql(
                    insertStatement_scores_skidpad,
                    [scoreid, r1time, r1numofcones, r1timeadj, r2time, r2numofcones, r2timeadj, r3time, r3numofcones, r3timeadj, r4time, r4numofcones, r4timeadj],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				tx.executeSql(
                    "UPDATE TB_Scores SET score = ? WHERE id = ?",
                    [givenscore, scoreid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
        }
        backToScores();
	}
	else {
		WS_insertRecord_scores_skidpad(eventid, carid, scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones);
	}
}

function updateRecord_scores_skidpad(scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
	if (isATablet()) {

		var r1timeadj = calculate_scores_skidpad_adj(r1time, r1numofcones);
		var r2timeadj = calculate_scores_skidpad_adj(r2time, r2numofcones);
		var r3timeadj = calculate_scores_skidpad_adj(r3time, r3numofcones);
		var r4timeadj = calculate_scores_skidpad_adj(r4time, r4numofcones);
		var givenscore = 0;


		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores_skidpad,
                [r1time, r1numofcones, r1timeadj, r2time, r2numofcones, r2timeadj, r3time, r3numofcones, r3timeadj, r4time, r4numofcones, r4timeadj, Number(scoreid)],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );

			tx.executeSql(
                "UPDATE TB_Scores SET score = ? WHERE id = ?",
                [givenscore, scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
        backToScores();
	}
	else {
		WS_updateRecord_scores_skidpad(scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones);
	}
}

function deleteRecord_scores_skidpad(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_skidpad,
                [scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_scores_skidpad(scoreid);
	}
}

function showRecords_scores_skidpad(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_skidpad,
                [scoreid],
                function (tx, result) {
                	waitON();

                	dataset_scores_skidpad = result.rows;

                	var id = -1;
                	var scoreid = -1;

                	var r1time = 0;
                	var r2time = 0;
                	var r3time = 0;
                	var r4time = 0;

                	var r1numofcones = 0;
                	var r2numofcones = 0;
                	var r3numofcones = 0;
                	var r4numofcones = 0;

                	var r1timeadj = 0;
                	var r2timeadj = 0;
                	var r3timeadj = 0;
                	var r4timeadj = 0;

                	if (dataset_scores_skidpad.length) {
                		var item = dataset_scores_skidpad.item(0);

                		id = item['id'];
                		scoreid = item['scoreid'];

                		r1time = item['run1time'];
                		r2time = item['run2time'];
                		r3time = item['run3time'];
                		r4time = item['run4time'];

                		r1numofcones = item['run1numofcones'];
                		r2numofcones = item['run2numofcones'];
                		r3numofcones = item['run3numofcones'];
                		r4numofcones = item['run4numofcones'];

                		r1timeadj = item['run1timeadj'];
                		r2timeadj = item['run2timeadj'];
                		r3timeadj = item['run3timeadj'];
                		r4timeadj = item['run4timeadj'];
                	}

                	if (parseFloat(r1timeadj) == -1) r1timeadj = "DNA";
                	if (parseFloat(r2timeadj) == -1) r2timeadj = "DNA";
                	if (parseFloat(r3timeadj) == -1) r3timeadj = "DNA";
                	if (parseFloat(r4timeadj) == -1) r4timeadj = "DNA";

                	$("#id").val(id);
                	$("#scoreid").val(scoreid);

                	$("#run1time").val(r1time);
                	$("#run2time").val(r2time);
                	$("#run3time").val(r3time);
                	$("#run4time").val(r4time);

                	$("#run1numofcones").val(r1numofcones);
                	$("#run2numofcones").val(r2numofcones);
                	$("#run3numofcones").val(r3numofcones);
                	$("#run4numofcones").val(r4numofcones);

                	$("#run1timeadj").val(r1timeadj);
                	$("#run2timeadj").val(r2timeadj);
                	$("#run3timeadj").val(r3timeadj);
                	$("#run4timeadj").val(r4timeadj);

                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_skidpad(scoreid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES AUTO CROSS -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores_autocross() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores_autocross,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores_autocross() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores_autocross,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function calculate_scores_autocross_adj(time, cones, doc) {
	//How to calculate AdjTime
	//=IF(R6<>0;R6+S6*2+T6*20;"DNA")
	//R6 : Time
	//S6 : Cones
	//T6 : DOC

	time = parseFloat(time);
	cones = parseFloat(cones);
	doc = parseFloat(doc);

	cones = (isNaN(cones)) ? 0 : cones;
	doc = (isNaN(doc)) ? 0 : doc;

	if ((time > 0) && (!isNaN(cones))) {
		time = time + parseFloat(cones * 2) + parseFloat(doc * 10);
		return time.toFixed(4);
	}
	else {
		return -1;
	}
	return time;
}

function insertRecord_scores_autocross(eventid, carid, scoreid, r1time, r1numofcones, r1doc, r2time, r2numofcones, r2doc, r3time, r3numofcones, r3doc, r4time, r4numofcones, r4doc) {
	if (isATablet()) {

		var r1timeadj = calculate_scores_autocross_adj(r1time, r1numofcones, r1doc);
		var r2timeadj = calculate_scores_autocross_adj(r2time, r2numofcones, r2doc);
		var r3timeadj = calculate_scores_autocross_adj(r3time, r3numofcones, r3doc);
		var r4timeadj = calculate_scores_autocross_adj(r4time, r4numofcones, r4doc);
		var givenscore = 0;

		if (Number(scoreid) == -1) {
			db.transaction(function (tx) {
				//Insert Score First
				tx.executeSql(
                    "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, givenscore],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				//Now insert details
				tx.executeSql(
                    "INSERT INTO TB_Scores_AutoCross (scoreid, run1time, run1numofcones, run1timeadj, run1doc, run2time, run2numofcones, run2doc, run2timeadj, run3time, run3numofcones, run3doc, run3timeadj, run4time, run4numofcones, run4doc, run4timeadj)  VALUES( (SELECT MAX(id) FROM TB_Scores), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [r1time, r1numofcones, r1timeadj, r1doc, r2time, r2numofcones, r2doc, r2timeadj, r3time, r3numofcones, r3doc, r3timeadj, r4time, r4numofcones, r4doc, r4timeadj],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
		}
		else {
			db.transaction(function (tx) {
				tx.executeSql(
                    insertStatement_scores_autocross,
                    [scoreid, r1time, r1numofcones, r1doc, r1timeadj, r2time, r2numofcones, r2doc, r2timeadj, r3time, r3numofcones, r3doc, r3timeadj, r4time, r4numofcones, r4doc, r4timeadj],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				tx.executeSql(
                    "UPDATE TB_Scores SET score = ? WHERE id = ?",
                    [givenscore, scoreid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
        }
        backToScores();
	}
	else {
		WS_insertRecord_scores_autocross(eventid, carid, scoreid, r1time, r1numofcones, r1doc, r2time, r2numofcones, r2doc, r3time, r3numofcones, r3doc, r4time, r4numofcones, r4doc);
	}
}

function updateRecord_scores_autocross(scoreid, r1time, r1numofcones, r1doc, r2time, r2numofcones, r2doc, r3time, r3numofcones, r3doc, r4time, r4numofcones, r4doc) {
	if (isATablet()) {

		var r1timeadj = calculate_scores_autocross_adj(r1time, r1numofcones, r1doc);
		var r2timeadj = calculate_scores_autocross_adj(r2time, r2numofcones, r2doc);
		var r3timeadj = calculate_scores_autocross_adj(r3time, r3numofcones, r3doc);
		var r4timeadj = calculate_scores_autocross_adj(r4time, r4numofcones, r4doc);
		var givenscore = 0;


		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores_autocross,
                [r1time, r1numofcones, r1doc, r1timeadj, r2time, r2numofcones, r2doc, r2timeadj, r3time, r3numofcones, r3doc, r3timeadj, r4time, r4numofcones, r4doc, r4timeadj, Number(scoreid)],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );

			tx.executeSql(
                "UPDATE TB_Scores SET score = ? WHERE id = ?",
                [givenscore, scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
        backToScores();
	}
	else {
		WS_updateRecord_scores_autocross(scoreid, r1time, r1numofcones, r1doc, r2time, r2numofcones, r2doc, r3time, r3numofcones, r3doc, r4time, r4numofcones, r4doc);
	}
}

function deleteRecord_scores_autocross(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_autocross,
                [scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_scores_autocross(scoreid);
	}
}

function showRecords_scores_autocross(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_autocross,
                [scoreid],
                function (tx, result) {
                	waitON();

                	dataset_scores_autocross = result.rows;

                	var id = -1;
                	var scoreid = -1;

                	var r1time = 0;
                	var r2time = 0;
                	var r3time = 0;
                	var r4time = 0;

                	var r1numofcones = 0;
                	var r2numofcones = 0;
                	var r3numofcones = 0;
                	var r4numofcones = 0;

                	var r1doc = 0;
                	var r2doc = 0;
                	var r3doc = 0;
                	var r4doc = 0;

                	var r1timeadj = 0;
                	var r2timeadj = 0;
                	var r3timeadj = 0;
                	var r4timeadj = 0;

                	if (dataset_scores_autocross.length) {
                		var item = dataset_scores_autocross.item(0);

                		id = item['id'];
                		scoreid = item['scoreid'];

                		r1time = item['run1time'];
                		r2time = item['run2time'];
                		r3time = item['run3time'];
                		r4time = item['run4time'];

                		r1numofcones = item['run1numofcones'];
                		r2numofcones = item['run2numofcones'];
                		r3numofcones = item['run3numofcones'];
                		r4numofcones = item['run4numofcones'];

                		r1doc = item['run1doc'];
                		r2doc = item['run2doc'];
                		r3doc = item['run3doc'];
                		r4doc = item['run4doc'];

                		r1timeadj = item['run1timeadj'];
                		r2timeadj = item['run2timeadj'];
                		r3timeadj = item['run3timeadj'];
                		r4timeadj = item['run4timeadj'];
                	}

                	if (parseFloat(r1timeadj) == -1) r1timeadj = "DNA";
                	if (parseFloat(r2timeadj) == -1) r2timeadj = "DNA";
                	if (parseFloat(r3timeadj) == -1) r3timeadj = "DNA";
                	if (parseFloat(r4timeadj) == -1) r4timeadj = "DNA";

                	$("#id").val(id);
                	$("#scoreid").val(scoreid);

                	$("#run1time").val(r1time);
                	$("#run2time").val(r2time);
                	$("#run3time").val(r3time);
                	$("#run4time").val(r4time);

                	$("#run1numofcones").val(r1numofcones);
                	$("#run2numofcones").val(r2numofcones);
                	$("#run3numofcones").val(r3numofcones);
                	$("#run4numofcones").val(r4numofcones);

                	$("#run1doc").val(r1doc);
                	$("#run2doc").val(r2doc);
                	$("#run3doc").val(r3doc);
                	$("#run4doc").val(r4doc);

                	$("#run1timeadj").val(r1timeadj);
                	$("#run2timeadj").val(r2timeadj);
                	$("#run3timeadj").val(r3timeadj);
                	$("#run4timeadj").val(r4timeadj);

                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_autocross(scoreid);
	}
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES ENDURANCE ------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
function createTable_scores_endurance() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatement_scores_endurance,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function dropTable_scores_endurance() {
	db.transaction(function (tx) {
		tx.executeSql(
            dropStatement_scores_endurance,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

function insertRecord_scores_endurance(eventid, carid, scoreid, time, laps, penalities, cones, doc, fuelused, fueltype) {
	if (isATablet()) {

		var givenscore = 0;

		if (Number(scoreid) == -1) {
			db.transaction(function (tx) {
				//Insert Score First
				tx.executeSql(
                    "INSERT INTO TB_Scores (eventid, carid, score) VALUES (?, ?, ?)",
                    [eventid, carid, givenscore],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				//Now insert details
				tx.executeSql(
                    "INSERT INTO TB_Scores_Endurance (scoreid, time, laps, penalities, cones, doc, fuelused, fueltype)  VALUES( (SELECT MAX(id) FROM TB_Scores), ?, ?, ?, ?, ?, ?, ?)",
                    [time, laps, penalities, cones, doc, fuelused, fueltype],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
				//Event 2017 - Now update car fuel type
				tx.executeSql(
                    'UPDATE TB_Cars SET fuelid = ? WHERE id = ?',
                    [fueltype, carid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
		}
		else {
			db.transaction(function (tx) {
				tx.executeSql(
                    insertStatement_scores_endurance,
                    [scoreid, time, laps, penalities, cones, doc, fuelused, fueltype],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				tx.executeSql(
                    "UPDATE TB_Scores SET score = ? WHERE id = ?",
                    [givenscore, scoreid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

				//Event 2017 - Now update car fuel type
				tx.executeSql(
                    'UPDATE TB_Cars SET fuelid = ? WHERE id = ?',
                    [fueltype, carid],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );
			});
        }
        backToScores();
	}
	else {
		WS_insertRecord_scores_endurance(eventid, carid, scoreid, time, laps, penalities, cones, doc, fuelused, fueltype);
	}
}

function updateRecord_scores_endurance(scoreid, time, laps, penalities, cones, doc, fuelused, fueltype, carid) {
	if (isATablet()) {

		var givenscore = 0;

		db.transaction(function (tx) {
			tx.executeSql(
                updateStatement_scores_endurance,
                [time, laps, penalities, cones, doc, fuelused, fueltype, Number(scoreid)],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );

			tx.executeSql(
                "UPDATE TB_Scores SET score = ? WHERE id = ?",
                [givenscore, scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );

			//Event 2017 - Now update car fuel type
			tx.executeSql(
                'UPDATE TB_Cars SET fuelid = ? WHERE id = ?',
                [fueltype, carid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
        backToScores();
	}
	else {
		WS_updateRecord_scores_endurance(scoreid, time, laps, penalities, cones, doc, fuelused, fueltype);
	}
}

function deleteRecord_scores_endurance(scoreid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                deleteStatement_scores_endurance,
                [scoreid],
                function (tx, result) { foo(); },
                function (tx, result) { onError(tx, result); }
            );
		});
	}
	else {
		WS_deleteRecord_scores_endurance(scoreid);
	}
}

function showRecords_scores_endurance(scoreid, carfuelid) {
	if (isATablet()) {
		db.transaction(function (tx) {
			tx.executeSql(
                selectStatement_scores_endurance,
                [scoreid],
                function (tx, result) {
                	waitON();

                	dataset_scores_endurance = result.rows;

                	var id = -1;
                	var scoreid = -1;

                	var time = 0;
                	var laps = 0;
                	var penalities = 0;
                	var cones = 0;
                	var doc = 0;
                	var fuelused = 0;
                	var fueltype = carfuelid;

                	if (dataset_scores_endurance.length) {
                		var item = dataset_scores_endurance.item(0);

                		id = item['id'];
                		scoreid = item['scoreid'];

                		time = item['time'];
                		laps = item['laps'];
                		penalities = item['penalities'];
                		cones = item['cones'];
                		doc = item['doc'];
                		fuelused = item['fuelused'];
                		fueltype = item['fueltype'].toString();
                	}

                	$("#id").val(id);
                	$("#scoreid").val(scoreid);

                	$("#time").val(time);
                	$("#laps").val(laps);
                	$("#penalities").val(penalities);
                	$("#cones").val(cones);
                	$("#doc").val(doc);
                	$("#fuelused").val(fuelused);
                	$("#fueltype").val(fueltype);

                	//Refresh selects otherwise does not work!
                	$('#fueltype').material_select();

                	waitOFF();
                }
            );
		});
	}
	else {
		WS_showRecords_scores_endurance(scoreid, carfuelid);
	}
}

function set_endurance_settings(totallaps, laplenght, consumptionmax) {
	if (isATablet()) {
	}
	else {
		WS_set_endurance_settings(totallaps, laplenght, consumptionmax);
	}
}

function getTotalLapEndurance() {
	if (isATablet()) {
		foo();
	}
	else {
		WS_getTotalLapEndurance();
	}
}

function getLapLenghtEndurance() {
	if (isATablet()) {
		foo();
	}
	else {
		WS_getLapLenghtEndurance();
	}
}

function getConsumptionMaxEndurance() {
	if (isATablet()) {
		foo();
	}
	else {
		WS_getConsumptionMaxEndurance();
	}
}

//Electric Car has to be green-colored - req.Ciadamidaro Set 2015
function isAnElectricCar(fuelname) {
	return (fuelname.toString().toUpperCase().indexOf("ELECTRIC") != -1);
}


// Triggers
function createTrigger_delete_car_examboards2cars() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_examboards2cars,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_design1E() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_design1E,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_design1C3() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_design1C3,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_presentation() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_presentation,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_cost() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_cost,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_acceleration() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_acceleration,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_skidpad() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_skidpad,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_autocross() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_autocross,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}
function createTrigger_delete_car_scores_endurance() {
	db.transaction(function (tx) {
		tx.executeSql(
            createStatementTrigger_delete_car_scores_endurance,
            [],
            function (tx, result) { foo(); },
            function (tx, result) { onError(tx, result); }
        );
	});
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES PARTIALS -------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
//Event 2018 - Show partials scores for Presentation and Design
//Event 2019 - Presentation Event has been changed
function showRecords_scores_presentation_partial(scoresidlist) {

	if (isATablet()) {
		//console.log("scoresidlist " + scoresidlist);
		db.transaction(function (tx) {
			tx.executeSql(
                "SELECT * FROM VW_Scores_Partial_Presentation WHERE scoreid in (" + scoresidlist + ")",
                [],
                function (tx, result) {

                	waitON();

                	var partials = result.rows;

                	//Get columns number before inserting partial ones
                	var initialCellsNumber = getTableNumOfCells("#tScoreCar");

                	//Column headers to add
                	var headersToAdd = PartialCells.Presentation.headers;
                	//Fields for sorting
                	var headersToAdd_sortfield = PartialCells.Presentation.sortfield;

                	//Add columns to the header row
                	addCellsToTableHeader("#tScoreCar", headersToAdd, headersToAdd_sortfield);

                	//Add columns
                	var cellsToAdd = new Array();
                	for (var i = 0; i < partials.length; i++) {
                		var item = partials[i];
                		var scoreid = item['scoreid'];

                		cellsToAdd.length = 0;

                		//FD 2021.07.27 - ATA 2021  - Add Stage1 - BEGIN
                		//cellsToAdd.push(item['executivesummary'], item['novelty'], item['content'], item['finances'], item['deepdivetopic'], item['demonstrationandstructure'], item['delivery'], item['questions'], item['generalimpression'], item['miscellaneous']);
                		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                		//cellsToAdd.push(item['stage1'], item['executivesummary'], item['novelty'], item['content'], item['finances'], item['deepdivetopic'], item['demonstrationandstructure'], item['delivery'], item['questions'], item['generalimpression'], item['miscellaneous']);

                		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
                		//cellsToAdd.push(item['stage1'], item['novelty'], item['content'], item['finances'], item['deepdivetopic'], item['demonstrationandstructure'], item['delivery'], item['questions'], item['generalimpression'], item['miscellaneous']);
                		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
                		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>

                        //FDT - ATA 2024 - tolto stage2
                        //cellsToAdd.push(item['stage1'], item['stage2'], item['content'], item['finances'], item['deepdivetopic'], item['demonstration'], item['delivery'], item['structure'], item['questions'], item['generalimpression'], item['miscellaneous'], item['finals']);
                        cellsToAdd.push(item['stage1'], item['content'], item['finances'], item['deepdivetopic'], item['demonstration'], item['delivery'], item['structure'], item['questions'], item['generalimpression'], item['miscellaneous'], item['finals']);

                		var row = $('tr[data-scoreid="' + scoreid + '"]');
                		addCellsToTableRow(row, cellsToAdd, 'partial');
                	}
                	//Search for rows with no scores yet, we have to fill columns with something
                	var rowsStillWithoutScore = $('#tScoreCar tr[data-scoreid="-1"]');
                	addMissingCellsToRows(rowsStillWithoutScore, initialCellsNumber, headersToAdd.length, 'partial');

                	//Hide University
                	toggleTableCellByIndex("#tScoreCar", 4, false);

                	waitOFF();
                }
            );
		});
	}
}

//Event 2018 - Show partials scores for Presentation and Design
function showRecords_scores_design1C3_partial(scoresidlist) {
	if (isATablet()) {
		//console.log("scoresidlist " + scoresidlist);

		db.transaction(function (tx) {
			tx.executeSql(
                "SELECT * FROM VW_Scores_Partial_Design1C3 WHERE scoreid in (" + scoresidlist + ")",
                [],
                function (tx, result) {

                	waitON();

                	var partials = result.rows;

                	//Get columns number before inserting partial ones
                	var initialCellsNumber = getTableNumOfCells("#tScoreCar");

                	//Column headers to add
                	var headersToAdd = PartialCells.Design1C3.headers;
                	//Fields for sorting
                	var headersToAdd_sortfield = PartialCells.Design1C3.sortfield;

                	//Add columns to the header row
                	addCellsToTableHeader("#tScoreCar", headersToAdd, headersToAdd_sortfield);

                	//Add columns
                	var cellsToAdd = new Array();
                	for (var i = 0; i < partials.length; i++) {
                		var item = partials[i];
                		var scoreid = item['scoreid'];

                		cellsToAdd.length = 0;
                		cellsToAdd.push(item['suspension'], item['framebodyaero'], item['powertrain'], item['cockpitcontrolsbrakessafety'], item['systemmanagementintegration'], item['manufacturabilityserviceability'], item['aestheticsstyle'], item['creativity'], item['miscellaneous']);

                		var row = $('tr[data-scoreid="' + scoreid + '"]');
                		addCellsToTableRow(row, cellsToAdd, 'partial');
                	}
                	//Search for rows with no scores yet, we have to fill columns with something
                	var rowsStillWithoutScore = $('#tScoreCar tr[data-scoreid="-1"]');
                	addMissingCellsToRows(rowsStillWithoutScore, initialCellsNumber, headersToAdd.length, 'partial');

                	//Hide University
                	toggleTableCellByIndex("#tScoreCar", 4, false);

                	waitOFF();
                }
            );
		});
	}
}

//Event 2018 - Show partials scores for Presentation and Design
function showRecords_scores_design1E_partial(scoresidlist) {
	if (isATablet()) {
		//console.log("scoresidlist " + scoresidlist);

		db.transaction(function (tx) {
			tx.executeSql(
                "SELECT * FROM VW_Scores_Partial_Design1E WHERE scoreid in (" + scoresidlist + ")",
                [],
                function (tx, result) {

                	waitON();

                	var partials = result.rows;

                	//Get columns number before inserting partial ones
                	var initialCellsNumber = getTableNumOfCells("#tScoreCar");

                	//Column headers to add
                	var headersToAdd = PartialCells.Design1E.headers;
                	//Fields for sorting
                	var headersToAdd_sortfield = PartialCells.Design1E.sortfield;

                	//Add columns to the header row
                	addCellsToTableHeader("#tScoreCar", headersToAdd, headersToAdd_sortfield);

                	//Add columns
                	var cellsToAdd = new Array();
                	for (var i = 0; i < partials.length; i++) {
                		var item = partials[i];
                		var scoreid = item['scoreid'];

                		cellsToAdd.length = 0;
                		cellsToAdd.push(item['suspension'], item['framebodyaero'], item['tractivedriverecoverysystem'], item['cockpitcontrolsbrakessafety'], item['systemmanagementintegration'], item['manufacturabilityserviceability'], item['aestheticsstyle'], item['creativity'], item['miscellaneous']);

                		var row = $('tr[data-scoreid="' + scoreid + '"]');
                		addCellsToTableRow(row, cellsToAdd, 'partial');
                	}
                	//Search for rows with no scores yet, we have to fill columns with something
                	var rowsStillWithoutScore = $('#tScoreCar tr[data-scoreid="-1"]');
                	addMissingCellsToRows(rowsStillWithoutScore, initialCellsNumber, headersToAdd.length, 'partial');

                	//Hide University
                	toggleTableCellByIndex("#tScoreCar", 4, false);

                	waitOFF();
                }
            );
		});
	}
}
