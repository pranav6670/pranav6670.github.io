
Chart.defaults.global.defaultFontFamily = "sans-serif";
Chart.defaults.global.defaultFontSize = 13;

new Chart(document.getElementById("myChart"), {
	type: 'horizontalBar',
	data: {
		labels: ["Python", "C", "C++", "Matlab"],
		datasets: [
			{
				label: "Skill % ",
				backgroundColor: ["rgba(255,0,0,0.9)", "rgba(255,0,0,0.7)", "rgba(255,0,0,0.6)", "rgba(255,0,0,0.8)"],
				data: [90, 70, 60, 80]
			}
		]
	},
	options: {
		legend: { display: false },
		title: {
			display: true,
			text: 'Software Development'
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false,
					beginAtZero: true,
					min: 0,
					max: 100,
					stepSize: 20,
				}
			}],
			yAxes: [{
				barPercentage: 0.5,
				gridLines: {
					display: false
				}
			}
			]
		}
	}
});

new Chart(document.getElementById("myChart2"), {
	type: 'horizontalBar',
	data: {
		labels: ["HTML", "CSS", "JavaScript"],
		datasets: [
			{
				label: "Skill % ",
				backgroundColor: ["rgba(0,255,0,0.5)", "rgba(0,255,0,0.55)", "rgba(0,255,0,0.7)",
				],
				data: [50, 55, 70]
			}
		]
	},
	options: {
		legend: { display: false },
		title: {
			display: true,
			text: 'Web Development '
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false,
					beginAtZero: true,
					min: 0,
					max: 100,
					stepSize: 20,
				}
			}],
			yAxes: [{
				barPercentage: 0.5,
				gridLines: {
					display: false
				}
			}
			]
		}
	}
});

new Chart(document.getElementById("myChart3"), {
	type: 'horizontalBar',
	data: {
		labels: ["Git", "CLI", "Latex",],
		datasets: [
			{
				label: "Skill % ",
				backgroundColor: ["rgba(0,0,255,0.8)", "rgba(0,0,255,0.85)", "rgba(0,0,255,0.5)",
				],
				data: [80, 85, 50]
			}
		]
	},
	options: {
		legend: { display: false },
		title: {
			display: true,
			text: 'Tools'
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false,
					beginAtZero: true,
					min: 0,
					max: 100,
					stepSize: 20,
				}
			}],
			yAxes: [{
				barPercentage: 0.5,
				gridLines: {
					display: false
				}
			}
			]
		}
	}
});

new Chart(document.getElementById("myChart4"), {
	type: 'horizontalBar',
	data: {
		labels: ["Jupyter", "Tensorflow/Keras/PyTorch", "Scikit-learn", "OpenCV/NLTK", "Numpy/Scipy/Pandas"],
		datasets: [
			{
				label: "Skill % ",
				backgroundColor: ["rgba(0,200,255,0.85)", "rgba(0,200,255,0.7)", "rgba(0,200,255,0.65)", "rgba(0,200,255,0.75)", "rgba(0,200,255,0.85)"],
				data: [85, 70, 65, 75, 85]
			}
		]
	},
	options: {
		legend: { display: false },
		title: {
			display: true,
			text: 'Data Science'
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false,
					beginAtZero: true,
					min: 0,
					max: 100,
					stepSize: 20,
				}
			}],
			yAxes: [{
				barPercentage: 0.5,
				gridLines: {
					display: false
				}
			}
			]
		}
	}
});




