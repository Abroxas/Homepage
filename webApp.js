var getStatistics = function() {

	Chart.defaults.global.responsive = true;

	var jsonObj;
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://arsnova.eu/api/statistics/", true);

	xhr.onreadystatechange = function () {  
		if (xhr.readyState === 4 && xhr.status === 200) {  
				jsonObj = JSON.parse(xhr.responseText);

				var keys = Object.keys(jsonObj);

				var answerLabels = new Array(keys[0]);
				var answerValues = [jsonObj.answers];

				var questionLabels = new Array(keys[11], keys[1], keys[2], keys[9], keys[10]);
				var questionValues = new Array(jsonObj.questions, jsonObj.lectureQuestions, jsonObj.preparationQuestions, jsonObj.interposedQuestions, jsonObj.conceptQuestions);

				var userLabels = new Array(keys[5], keys[6], keys[7], keys[8]);
				var userValues = new Array(jsonObj.creators, jsonObj.activeUsers, jsonObj.activeStudents, jsonObj.loggedinUsers);

				var sessionLabels = new Array(keys[12], keys[3], keys[4]);
				var sessionValues = new Array(jsonObj.sessions, jsonObj.openSessions, jsonObj.closedSessions);

				updateBarDiagram('#barChartAnswers', answerLabels, answerValues);
				updateBarDiagram('#barChartQuestions', questionLabels, questionValues);
				updateBarDiagram('#barChartUsers', userLabels, userValues);
				updateBarDiagram('#barChartSessions', sessionLabels, sessionValues);

		} else {  
				console.log("Error", xhr.statusText);  
		}  
	};  
	xhr.send(null);  

	setTimeout(getStatistics, 30000);
};

var updateBarDiagram = function(canvas, diagramLabel, diagramValue) {

	var diagramWidth = $('#appDiv').width()*0.95;
	$(canvas).attr('width', diagramWidth);
	$(canvas).attr('height', '300');

	var ctx = $(canvas).get(0).getContext("2d");

	var data = {
		labels: diagramLabel,
		datasets: [
			{
				label: "ArsNova Statistics",
				fillColor: "rgba(0,0,139,1)",
				strokeColor: "rgba(220,220,220,1)",
				highlightFill: "rgba(220,220,220,1)",
				highlightStroke: "rgba(220,220,220,1)",
				data: diagramValue
			}
		]
	};	

	var myBarChart = new Chart(ctx).Bar(data);
	$(canvas).css({"width": diagramWidth, "margin-bottom":"40px"});
};

$(document).ready(function() { getStatistics(); });
