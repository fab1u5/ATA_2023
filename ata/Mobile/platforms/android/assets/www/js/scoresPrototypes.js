//Event 2019 - Presentation Event has been changed
//Constructor
function ScorePresentation(id, scoreid) {

	this.id = (id == undefined) ? -1 : id;
	this.scoreid = (scoreid == undefined) ? -1 : scoreid;

	this.executiveSummary = [0, 0, 0, 0];
	this.novelty = [0, 0, 0, 0];
	this.content = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.finances = [0, 0, 0, 0, 0, 0, 0];
	this.deepDiveTopic = [0, 0, 0, 0];
	this.demonstrationAndStructure = [0, 0, 0, 0, 0];
	this.delivery = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.questions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.generalImpression = [0, 0, 0];

	this.executiveSummaryNotes = '';
	this.noveltyNotes = '';
	this.contentNotes = '';
	this.financesNotes = '';
	this.deepDiveTopicNotes = '';
	this.demonstrationAndStructureNotes = '';
	this.deliveryNotes = '';
	this.questionsNotes = '';
	this.generalImpressionNotes = '';

	this.totalExecutiveSummary = 0;
	this.totalNovelty = 0;
	this.totalContent = 0;
	this.totalFinances = 0;
	this.totalDeepDiveTopic = 0;
	this.totalDemonstrationAndStructure = 0;
	this.totalDelivery = 0;
	this.totalQuestions = 0;
	this.totalGeneralImpression = 0;

	this.miscellaneous = 0;
	this.miscellaneousNotes = '';

	this.presentationNotes = '';
	this.totalPresentation = 0;
}

ScorePresentation.prototype.Reset = function () {
	this.id = (id == undefined) ? -1 : id;
	this.scoreid = (scoreid == undefined) ? -1 : scoreid;

	this.executiveSummary = [0, 0, 0, 0];
	this.novelty = [0, 0, 0, 0];
	this.content = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.finances = [0, 0, 0, 0, 0, 0, 0];
	this.deepDiveTopic = [0, 0, 0, 0];
	this.demonstrationAndStructure = [0, 0, 0, 0, 0];
	this.delivery = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.questions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.generalImpression = [0, 0, 0];

	this.executiveSummaryNotes = '';
	this.noveltyNotes = '';
	this.contentNotes = '';
	this.financesNotes = '';
	this.deepDiveTopicNotes = '';
	this.demonstrationAndStructureNotes = '';
	this.deliveryNotes = '';
	this.questionsNotes = '';
	this.generalImpressionNotes = '';

	this.totalExecutiveSummary = 0;
	this.totalNovelty = 0;
	this.totalContent = 0;
	this.totalFinances = 0;
	this.totalDeepDiveTopic = 0;
	this.totalDemonstrationAndStructure = 0;
	this.totalDelivery = 0;
	this.totalQuestions = 0;
	this.totalGeneralImpression = 0;

	this.miscellaneous = 0;
	this.miscellaneousNotes = '';

	this.presentationNotes = '';
	this.totalPresentation = 0;
}

//Just for debugging
ScorePresentation.prototype.Debug = function () {
	console.log(this.id);
	console.log(this.scoreid);

	console.log("EXECUTIVE SUMMARY " + this.executiveSummary.join(',') + " TOTAL " + this.totalExecutiveSummary + " NOTES " + this.executiveSummaryNotes);
	console.log("NOVELTY " + this.novelty.join(',') + " TOTAL " + this.totalNovelty + " NOTES " + this.noveltyNotes);
	console.log("CONTENT " + this.content.join(',') + " TOTAL " + this.totalContent + " NOTES " + this.contentNotes);
	console.log("FINANCES " + this.finances.join(',') + " TOTAL " + this.totalFinances + " NOTES " + this.financesNotes);
	console.log("DEEP DIVE TOPIC " + this.deepDiveTopic.join(',') + " TOTAL " + this.totalDeepDiveTopic + " NOTES " + this.deepDiveTopicNotes);
	console.log("DEMONSTRATION AND STRUCTURE " + this.demonstrationAndStructure.join(',') + " TOTAL " + this.totalDemonstrationAndStructure + " NOTES " + this.demonstrationAndStructureNotes);
	console.log("DELIVERY " + this.delivery.join(',') + " TOTAL " + this.totalDelivery + " NOTES " + this.deliveryNotes);
	console.log("QUESTIONS " + this.questions.join(',') + " TOTAL " + this.totalQuestions + " NOTES " + this.questionsNotes);
	console.log("GENERAL IMPRESSION " + this.generalImpression.join(',') + " TOTAL " + this.totalGeneralImpression + " NOTES " + this.generalImpressionNotes);
	console.log("MISCELLANEOUS " + this.miscellaneous + " NOTES " + this.miscellaneousNotes);
	console.log("PRESENTATION NOTES " + this.presentationNotes);
	console.log("TOTAL PRESENTATION " + this.totalPresentation);
}

//Sum all values passed as parameters
ScorePresentation.prototype.Sum = function (values) {
	var total = 0;
	$.each(values, function (index, value) {
		total += parseFloat(value);
	});
	//console.log("(ScorePresentation.prototype.Sum) total " + total);
	return total;
}

ScorePresentation.prototype.Total = function () {
	//console.log("(ScorePresentation.prototype.Total) arguments " + arguments);

	var arrayOfValues = new Array();

	$.each(arguments, function (index, value) {
		//If each argument contains commas then is a list of values that has to be splitted into an array before proceed
		if (value.toString().indexOf(",") !== -1) {
			//console.log("(ScorePresentation.prototype.Total) value " + value);
			arrayOfValues = value.toString().split(",");
			$.each(arrayOfValues, function (i, v) {
				arrayOfValues[i] = parseFloat(v);
			});
		}
		else {
			//It's a list of simple values, add them to the list
			arrayOfValues.push(parseFloat(value));
		}
		//console.log("(ScorePresentation.prototype.Total) values " + values);
	});

	//Now calculate total
	return this.Sum(arrayOfValues);
}

var scoreP = new ScorePresentation(-1,-1);