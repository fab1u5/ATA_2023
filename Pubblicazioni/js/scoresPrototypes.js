//Event 2019 - Presentation Event has been changed
//Constructor
function ScorePresentation(id, scoreid) {

	this.id = (id == undefined) ? -1 : id;
	this.scoreid = (scoreid == undefined) ? -1 : scoreid;

	//FDT - ATA 2023 - modifiche stage 3 - INIZIO
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.executiveSummary					= [0, 0, 0, 0];
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
	//this.novelty							= [0, 0, 0, 0];
	//this.novelty							= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
	//this.content							= [0, 0, 0, 0, 0, 0, 0, 0, 0];
	//FDT - ATA2024
	this.content							= [0, 0, 0, 0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
	//this.finances							= [0, 0, 0, 0, 0, 0, 0];
	//FDT - ATA 2024
	this.finances							= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add deepdivetopic4
	//this.deepDiveTopic					= [0, 0, 0, 0];
	this.deepDiveTopic						= [0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	//FDT - ATA2024
	this.demonstration						= [0, 0, 0, 0, 0, 0];
	//FDT - ATA2024
	this.structure = [0, 0, 0, 0, 0];
	//FDT - ATA2024
	this.delivery							= [0, 0, 0, 0, 0, 0, 0, 0];
	this.questions							= [0, 0, 0, 0, 0, 0, 0, 0];
	this.generalImpression					= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.executiveSummaryNotes			= '';
	//this.noveltyNotes						= '';
	this.contentNotes						= '';
	this.financesNotes						= '';
	this.deepDiveTopicNotes					= '';
	this.structureNotes						= '';
	this.deliveryNotes						= '';
	this.questionsNotes						= '';
	this.generalImpressionNotes				= '';

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.demonstrationNotes					= '';

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.totalExecutiveSummary = 0;
	//this.totalNovelty						= 0;
	this.totalContent						= 0;
	this.totalFinances						= 0;
	this.totalDeepDiveTopic					= 0;
	this.totalStructure						= 0;
	this.totalDelivery						= 0;
	this.totalQuestions						= 0;
	this.totalGeneralImpression				= 0;

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.totalDemonstration					= 0;

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
	//#region Arrays
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//FDT - ATA 2022 - modify Stage 2
	//this.st2BusinnesFigures = [0, 0, 0, 0];
	//FDT - ATA 2023 - eliminato Business Figures - FINE
	//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
	this.st2FinConcept						= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
	//FDT - ATA 2023 - aggiunto Financial Concept - FINE
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
	this.st2FinKPIs							 = [0,0,0,0,0]
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.st2Content = [0, 0, 0, 0, 0];
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	this.st2DemonstrationAndDelivery = [0, 0, 0, 0, 0];
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.st2Investitors = [0, 0, 0];
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	//#endregion

	//#region Notes
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//this.st2BusinnesFiguresNotes = '';
	//FDT - ATA 2023 - eliminato Business Figures - FINE
	//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
	this.st2FinConceptNotes					= '';
	//FDT - ATA 2023 - aggiunto Financial Concept - FINE
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
	this.st2FinKPIsNotes					= '';
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.st2ContentNotes = '';
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	this.st2DemonstrationAndDeliveryNotes = '';
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.st2InvestitorsNotes = '';
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	//#endregion


	//#region Totals
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//this.totalSt2BusinnesFigures			= 0;
	//FDT - ATA 2023 - eliminato Business Figures - FINe
	//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
	this.totalSt2FinConcept					= 0;
	//FDT - ATA 2023 - aggiunto Financial Concept - FINE
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
	this.totalSt2FinKPIs					= 0;
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.totalSt2Content = 0;
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	this.totalSt2DemonstrationAndDelivery = 0;
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.totalSt2Investitors = 0;
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	//#endregion
	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

	this.miscellaneous						= 0;
	this.miscellaneousNotes					= '';

	//FD 2021.07.27 - ATA 2021  - Add Stage1
	this.stage1								= 0;

	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
	this.finals								= 0;

	this.presentationNotes					= '';
	this.totalPresentation					= 0;
}

ScorePresentation.prototype.Reset = function () {
	this.id = (id == undefined) ? -1 : id;
	this.scoreid = (scoreid == undefined) ? -1 : scoreid;

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.executiveSummary = [0, 0, 0, 0];
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
	//this.novelty = [0, 0, 0, 0];
	//this.novelty							= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
	//this.content = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	//FDT - ATA2024
	this.content							= [0, 0, 0, 0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
	//this.finances = [0, 0, 0, 0, 0, 0, 0];
	//FDT - ATA 2024
	this.finances							= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	this.deepDiveTopic = [0, 0, 0, 0];
	//FDT - ATA2024
	this.structure = [0, 0, 0, 0, 0];
	//FDT - ATA2024
	this.delivery							= [0, 0, 0, 0, 0, 0, 0, 0];
	this.questions							= [0, 0, 0, 0, 0, 0, 0, 0];
	this.generalImpression					= [0, 0, 0];
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	//FDT - ATA2024
	this.demonstration						= [0, 0, 0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.executiveSummaryNotes = '';
	//this.noveltyNotes						= '';
	this.contentNotes						= '';
	this.financesNotes						= '';
	this.deepDiveTopicNotes					= '';
	this.structureNotes						= '';
	this.deliveryNotes						= '';
	this.questionsNotes						= '';
	this.generalImpressionNotes				= '';
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.demonstrationNotes					= '';

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
	//#region Arrays
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//FDT - ATA 2022 - modify Stage 2
	//this.st2BusinnesFigures = [0, 0, 0, 0];
	//FDT - ATA 2023 - eliminato Business Figures - FINE

	//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
	this.st2FinConcept = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	//FDT - ATA 2023 - aggiunto Financial Concept - FINE
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.st2Content = [0, 0, 0, 0, 0];
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
	this.st2FinKPIs = [0, 0, 0, 0, 0];
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	this.st2DemonstrationAndDelivery = [0, 0, 0, 0, 0];
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.st2Investitors = [0, 0, 0];
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	//#endregion

	//#region Notes
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//this.st2BusinnesFiguresNotes = '';
	//FDT - ATA 2023 - eliminato Business Figures - FINE
	//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
	this.st2FinConceptNotes = '';
	//FDT - ATA 2023 - aggiunto Financial Concept - FINE
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
	this.st2FinKPIsNotes = '';
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.st2ContentNotes = '';
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	this.st2DemonstrationAndDeliveryNotes = '';
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO	
	//this.st2InvestitorsNotes = '';
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	//#endregion

	//#region Totals
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//this.totalSt2BusinnesFigures = 0;
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
	this.totalSt2FinConcept = 0;
	//FDT - ATA 2023 - aggiunto Financial Concept - FINE
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
	this.totalSt2FinKPIs = 0;
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//this.totalSt2Content = 0;
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	this.totalSt2DemonstrationAndDelivery = 0;
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	//this.totalSt2Investitors = 0;
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//#endregion
	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.totalExecutiveSummary = 0;
	//this.totalNovelty						= 0;
	this.totalContent						= 0;
	this.totalFinances						= 0;
	this.totalDeepDiveTopic					= 0;
	this.totalStructure						= 0;
	this.totalDelivery						= 0;
	this.totalQuestions						= 0;
	this.totalGeneralImpression				= 0;
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.totalDemonstration					= 0;

	this.miscellaneous						= 0;
	this.miscellaneousNotes					= '';

	//FD 2021.07.27 - ATA 2021  - Add Stage1
	this.stage1								= 0;

	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
	this.finals								= 0;

	this.presentationNotes = '';
	this.totalPresentation					= 0;
}

//Just for debugging
ScorePresentation.prototype.Debug = function () {
	console.log(this.id);
	console.log(this.scoreid);

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//console.log("EXECUTIVE SUMMARY "			+ this.executiveSummary.join(',')				+ " TOTAL " + this.totalExecutiveSummary			+ " NOTES " + this.executiveSummaryNotes);
	//console.log("NOVELTY "						+ this.novelty.join(',')						+ " TOTAL " + this.totalNovelty						+ " NOTES " + this.noveltyNotes);
	console.log("CONTENT "						+ this.content.join(',')						+ " TOTAL " + this.totalContent						+ " NOTES " + this.contentNotes);
	console.log("FINANCES "						+ this.finances.join(',')						+ " TOTAL " + this.totalFinances					+ " NOTES " + this.financesNotes);
	console.log("DEEP DIVE TOPIC "				+ this.deepDiveTopic.join(',')					+ " TOTAL " + this.totalDeepDiveTopic				+ " NOTES " + this.deepDiveTopicNotes);

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
	console.log("STRUCTURE "					+ this.structure.join(',')						+ " TOTAL " + this.totalStructure					+ " NOTES " + this.structureNotes);
	console.log("QUESTIONS "					+ this.questions.join(',')						+ " TOTAL " + this.totalQuestions					+ " NOTES " + this.questionsNotes);
	console.log("GENERAL IMPRESSION "			+ this.generalImpression.join(',')				+ " TOTAL " + this.totalGeneralImpression			+ " NOTES " + this.generalImpressionNotes);
	console.log("MISCELLANEOUS "				+ this.miscellaneous							+ " NOTES " + this.miscellaneousNotes);

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	console.log("DEMONSTRATION "				+ this.demonstration.join(',')		+ " TOTAL " + this.totalDemonstration	+ " NOTES " + this.demonstrationNotes);

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//console.log("BUSINNESFIGURES " + this.st2BusinnesFigures.join(',') + " TOTAL " + this.totalSt2BusinnesFigures + " NOTES " + this.st2BusinnesFiguresNotes);
	//FDT - ATA 2023 - eliminato Business Figures - INIZIO
	//FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
	console.log("ST2FINANCIALCONCEPT " + this.st2FinConcept.join(',') + " TOTAL " + this.totalSt2FinConcept + " NOTES " + this.st2FinConceptNotes);
	//FDT - ATA 2023 - aggiunto Financial Concept - FINE
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
	console.log("ST2FINANCIALKPIs " + this.st2FinKPIs.join(',') + " TOTAL " + this.totalst2FinKPIs + " NOTES " + this.totalSt2FinKPIs);
	//FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//console.log("CONTENT " + this.st2Content.join(',') + " TOTAL " + this.totalSt2Content + " NOTES " + this.st2ContentNotes);
	//FDT - ATA 2023 - eliminato Content e Investors - FINE
	console.log("ST2DEMONSTRATIONANDDELIVERY " + this.st2DemonstrationAndDelivery.join(',') + " TOTAL " + this.totalSt2DemonstrationAndDelivery + " NOTES " + this.st2DemonstrationAndDeliveryNotes);
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//console.log("INVESTITORS " + this.st2Investitors.join(',') + " TOTAL " + this.totalSt2Investitors + " NOTES " + this.st2InvestitorsNotes);
	//FDT - ATA 2023 - eliminato Content e Investors - INIZIO
	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

	console.log("PRESENTATION NOTES "			+ this.presentationNotes);
	console.log("TOTAL PRESENTATION "			+ this.totalPresentation);

	//FD 2021.07.27 - ATA 2021  - Add Stage1
	console.log("STAGE1 " + this.stage1);

	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
	console.log("FINALS" + this.finals);
}

//Sum all values passed as parameters
ScorePresentation.prototype.Sum = function (values) {
	var total = 0;
	$.each(values, function (index, value) {
		total += parseFloat(value);
	});
	return total;
}

ScorePresentation.prototype.Total = function () {
	console.log("(ScorePresentation.prototype.Total) arguments " + arguments);

	var arrayOfValues = new Array();

	$.each(arguments, function (index, value) {
		console.log("(333. ScorePresentation.prototype.Total) value " + value);
		//If each argument contains commas then is a list of values that has to be splitted into an array before proceed
		if (value.toString().indexOf(",") !== -1) {
			arrayOfValues = value.toString().split(",");
			$.each(arrayOfValues, function (i, v) {
				if (Number(v))
					arrayOfValues[i] = parseFloat(v);
			});
		}
		else {
			//It's a list of simple values, add them to the list
			arrayOfValues.push(parseFloat(value));
		}
	});

	//Now calculate total
	return this.Sum(arrayOfValues);
}

var scoreP = new ScorePresentation(-1, -1);
