﻿//Event 2019 - Presentation Event has been changed
//Constructor
function ScorePresentation(id, scoreid) {

	this.id = (id == undefined) ? -1 : id;
	this.scoreid = (scoreid == undefined) ? -1 : scoreid;

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.executiveSummary					= [0, 0, 0, 0];
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
	//this.novelty							= [0, 0, 0, 0];
	this.novelty							= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
	//this.content							= [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.content							= [0, 0, 0, 0, 0, 0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
	//this.finances							= [0, 0, 0, 0, 0, 0, 0];
	this.finances							= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add deepdivetopic4
	//this.deepDiveTopic					= [0, 0, 0, 0];
	this.deepDiveTopic						= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.demonstrationAndDelivery			= [0, 0, 0, 0, 0];

	this.demonstrationAndStructure			= [0, 0, 0, 0, 0];
	this.delivery							= [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.questions							= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.generalImpression					= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.executiveSummaryNotes			= '';
	this.noveltyNotes						= '';
	this.contentNotes						= '';
	this.financesNotes						= '';
	this.deepDiveTopicNotes					= '';
	this.demonstrationAndStructureNotes		= '';
	this.deliveryNotes						= '';
	this.questionsNotes						= '';
	this.generalImpressionNotes				= '';

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.demonstrationAndDeliveryNotes	= '';

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.totalExecutiveSummary = 0;
	this.totalNovelty						= 0;
	this.totalContent						= 0;
	this.totalFinances						= 0;
	this.totalDeepDiveTopic					= 0;
	this.totalDemonstrationAndStructure		= 0;
	this.totalDelivery						= 0;
	this.totalQuestions						= 0;
	this.totalGeneralImpression				= 0;

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.totalDemonstrationAndDelivery		= 0;

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
	//#region Arrays
	//FDT - ATA 2022 - modify Stage 2
	this.st2BusinnesFigures					= [0, 0, 0, 0];
	this.st2Content							= [0, 0, 0, 0, 0];
	this.st2DemonstrationAndDelivery		= [0, 0, 0, 0, 0];
	this.st2Investitors						= [0, 0, 0];
	//#endregion

	//#region Notes
	this.st2BusinnesFiguresNotes			= '';
	this.st2ContentNotes					= '';
	this.st2DemonstrationAndDeliveryNotes	= '';
	this.st2InvestitorsNotes				= '';
	//#endregion

	
	//#region Totals
	this.totalSt2BusinnesFigures			= 0;
	this.totalSt2Content					= 0;
	this.totalSt2DemonstrationAndDelivery	= 0;
	this.totalSt2Investitors				= 0;
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
	this.novelty							= [0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
	//this.content = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.content							= [0, 0, 0, 0, 0, 0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
	//this.finances = [0, 0, 0, 0, 0, 0, 0];
	this.finances							= [0, 0, 0];

	this.deepDiveTopic						= [0, 0, 0];
	this.demonstrationAndStructure			= [0, 0, 0, 0, 0];
	this.delivery							= [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.questions							= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.generalImpression					= [0, 0, 0];
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.demonstrationAndDelivery			= [0, 0, 0, 0, 0];

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.executiveSummaryNotes = '';
	this.noveltyNotes						= '';
	this.contentNotes						= '';
	this.financesNotes						= '';
	this.deepDiveTopicNotes					= '';
	this.demonstrationAndStructureNotes		= '';
	this.deliveryNotes						= '';
	this.questionsNotes						= '';
	this.generalImpressionNotes				= '';
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.demonstrationAndDeliveryNotes		= '';

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
	//#region Arrays
	//FDT - ATA 2022 - modify Stage 2
	this.st2BusinnesFigures					= [0, 0, 0, 0];
	this.st2Content							= [0, 0, 0, 0, 0];
	this.st2DemonstrationAndDelivery		= [0, 0, 0, 0, 0];
	this.st2Investitors						= [0, 0, 0];
	//#endregion

	//#region Notes
	this.st2BusinnesFiguresNotes				= '';
	this.st2ContentNotes						= '';
	this.st2DemonstrationAndDeliveryNotes		= '';
	this.st2InvestitorsNotes					= '';
	//#endregion

	//#region Totals
	this.totalSt2BusinnesFigures			= 0;
	this.totalSt2Content					= 0;
	this.totalSt2DemonstrationAndDelivery	= 0;
	this.totalSt2Investitors				= 0;
	//#endregion
	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//this.totalExecutiveSummary = 0;
	this.totalNovelty						= 0;
	this.totalContent						= 0;
	this.totalFinances						= 0;
	this.totalDeepDiveTopic					= 0;
	this.totalDemonstrationAndStructure		= 0;
	this.totalDelivery						= 0;
	this.totalQuestions						= 0;
	this.totalGeneralImpression				= 0;
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	this.totalDemonstrationAndDelivery		= 0;

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
	console.log("NOVELTY "						+ this.novelty.join(',')						+ " TOTAL " + this.totalNovelty						+ " NOTES " + this.noveltyNotes);
	console.log("CONTENT "						+ this.content.join(',')						+ " TOTAL " + this.totalContent						+ " NOTES " + this.contentNotes);
	console.log("FINANCES "						+ this.finances.join(',')						+ " TOTAL " + this.totalFinances					+ " NOTES " + this.financesNotes);
	console.log("DEEP DIVE TOPIC "				+ this.deepDiveTopic.join(',')					+ " TOTAL " + this.totalDeepDiveTopic				+ " NOTES " + this.deepDiveTopicNotes);

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
	//console.log("DEMONSTRATION AND STRUCTURE "+ this.demonstrationAndStructure.join(',')		+ " TOTAL " + this.totalDemonstrationAndStructure	+ " NOTES " + this.demonstrationAndStructureNotes);
	console.log("STRUCTURE "					+ this.delivery.join(',')						+ " TOTAL " + this.totalDelivery					+ " NOTES " + this.deliveryNotes);
	console.log("QUESTIONS "					+ this.questions.join(',')						+ " TOTAL " + this.totalQuestions					+ " NOTES " + this.questionsNotes);
	console.log("GENERAL IMPRESSION "			+ this.generalImpression.join(',')				+ " TOTAL " + this.totalGeneralImpression			+ " NOTES " + this.generalImpressionNotes);
	console.log("MISCELLANEOUS "				+ this.miscellaneous							+ " NOTES " + this.miscellaneousNotes);

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	console.log("DEMONSTRATIONANDDELIVERY "		+ this.demonstrationAndDelivery.join(',')		+ " TOTAL " + this.totalDemonstrationAndDelivery	+ " NOTES " + this.demonstrationAndDeliveryNotes);

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
	console.log("BUSINNESFIGURES "				+ this.st2BusinnesFigures.join(',')				+ " TOTAL " + this.totalSt2BusinnesFigures			+ " NOTES " + this.st2BusinnesFiguresNotes);
	console.log("CONTENT "						+ this.st2Content.join(',')						+ " TOTAL " + this.totalSt2Content					+ " NOTES " + this.st2ContentNotes);
	console.log("DEMONSTRATIONANDDELIVERY "		+ this.st2DemonstrationAndDelivery.join(',')	+ " TOTAL " + this.totalSt2DemonstrationAndDelivery	+ " NOTES " + this.st2DemonstrationAndDeliveryNotes);
	console.log("INVESTITORS "					+ this.st2Investitors.join(',')					+ " TOTAL " + this.totalSt2Investitors				+ " NOTES " + this.st2InvestitorsNotes);
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
