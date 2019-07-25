var marksCanvas = document.getElementById("myChart");

Chart.defaults.global.defaultFontFamily = "sans-serif";
Chart.defaults.global.defaultFontSize = 10;
// Chart.defaults.global.legend.display = false;

var marksData = {
	labels: ["Python", "C", "C++", "Matlab"],
	datasets: [{
		label: "Software Development Skills",
		backgroundColor: "rgba(245,106,106,0.3)",
		data: [90, 70, 60, 95],
		pointHoverRadius: 10
	}]
};

var chartOptions = {
	scale: {
		ticks: {
			beginAtZero: true,
			min: 0,
			max: 100,
			stepSize: 20
		},
		pointLabels: {
			fontSize: 15
		}
	},
	legend: {
		display:false,
		position: 'left'
	},
	tooltips: {
		callbacks: {
			label: function (tooltipItem, data) {
				var label = data.datasets[tooltipItem.datasetIndex].label || '';

				if (label) {
					label += ': ';
				}
				label += Math.round(tooltipItem.yLabel * 100) / 100;
				return label;
			}
		}
	}
};

var radarChart = new Chart(marksCanvas, {
	type: 'radar',
	data: marksData,
	options: chartOptions
});

///////////////////////////////////////////////////////////////////////////////

var marksCanvas = document.getElementById("myChart2");

var marksData = {
	labels: ["Git", "Arduino", "Latex", "CLI", "Image / Vector Editors"],
	datasets: [{
		label: " Tools Skill",
		backgroundColor: "rgba(0,200,0,0.3)",
		data: [80, 90, 60, 70, 50],
		pointHoverRadius: 10
	}]
};

var chartOptions = {
	scale: {
		ticks: {
			beginAtZero: true,
			min: 0,
			max: 100,
			stepSize: 20
		},
		pointLabels: {
			fontSize: 15
		}
	},
	legend: {
		display:false,
		position: 'left'
	},
	tooltips: {
		callbacks: {
			label: function (tooltipItem, data) {
				var label = data.datasets[tooltipItem.datasetIndex].label || '';

				if (label) {
					label += ': ';
				}
				label += Math.round(tooltipItem.yLabel * 100) / 100;
				return label;
			}
		}
	}
};

var radarChart = new Chart(marksCanvas, {
	type: 'radar',
	data: marksData,
	options: chartOptions
});

/////////////////////////////////////////////////////////////////////////////////

var marksCanvas = document.getElementById("myChart3");

var marksData = {
	labels: ["HTML", "CSS", "JavaScript"],
	datasets: [{
		label: "Web Development Skill",
		backgroundColor: "rgba(0,200,200,0.3)",
		data: [60, 70, 80],
		pointHoverRadius: 10
	}]
};

var chartOptions = {
	scale: {
		ticks: {
			beginAtZero: true,
			min: 0,
			max: 100,
			stepSize: 20
		},
		pointLabels: {
			fontSize: 15
		}
	},
	legend: {
		display:false,
		position: 'left'
	},
	tooltips: {
		callbacks: {
			label: function (tooltipItem, data) {
				var label = data.datasets[tooltipItem.datasetIndex].label || '';

				if (label) {
					label += ': ';
				}
				label += Math.round(tooltipItem.yLabel * 100) / 100;
				return label;
			}
		}
	}
};

var radarChart = new Chart(marksCanvas, {
	type: 'radar',
	data: marksData,
	options: chartOptions
});

///////////////////////////////////////////////////////////////

var marksCanvas = document.getElementById("myChart4");

var marksData = {
	labels: ["Jupyter/PyCharm", "Numpy/Scipy/Pandas", "Tensorflow/Keras", "GGplot/Matplotlib", "OpenCV/scikit-image", "scikit-learn"],
	datasets: [{
		label: "Data Science Skill",
		backgroundColor: "rgba(200,200,0,0.3)",
		data: [80, 90, 70, 70, 95, 80],
		pointHoverRadius: 10
	}]
};

var chartOptions = {
	scale: {
		ticks: {
			beginAtZero: true,
			min: 0,
			max: 100,
			stepSize: 20
		},
		pointLabels: {
			fontSize: 15
		}
	},
	legend: {
		display:false,
		position: 'left',
	},
	tooltips: {
		callbacks: {
			label: function (tooltipItem, data) {
				var label = data.datasets[tooltipItem.datasetIndex].label || '';

				if (label) {
					label += ': ';
				}
				label += Math.round(tooltipItem.yLabel * 100) / 100;
				return label;
			}
		}
	}
};



var radarChart = new Chart(marksCanvas, {
	type: 'radar',
	data: marksData,
	options: chartOptions
});