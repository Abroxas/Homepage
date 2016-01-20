var getStatistics = function() {

	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://arsnova.eu/api/statistics/", false);
	xhr.send();
	
	var jsonObj = $.parseJSON(xhr.responseText);
	var keys = Object.keys(jsonObj);

	var values = new Array();
	for (var i = 0; i < keys.length; i++) { values.push(jsonObj[keys[i]]); }

	updateDiagram( keys, values );

	setTimeout(getStatistics, 30000);
};

var updateDiagram = function(label, value) {

	var diagramWidth = $('#appDiv').width()*0.9;
	$("#myChart").attr('width', diagramWidth);
	$("#myChart").attr('height', '500');

	var ctx = $("#myChart").get(0).getContext("2d");

	var data = {
		labels: label,
		datasets: [
			{
				label: "ArsNova Statistics",
				fillColor: "rgba(0,0,139,1)",
				strokeColor: "rgba(220,220,220,1)",
				highlightFill: "rgba(220,220,220,1)",
				highlightStroke: "rgba(220,220,220,1)",
				data: value
			}
		]
	};	

	var myBarChart = new Chart(ctx).Bar(data);
};

$(document).ready(function() { getStatistics(); });
