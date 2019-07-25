
Chart.defaults.global.defaultFontFamily = "sans-serif";
Chart.defaults.global.defaultFontSize = 10;



new Chart(document.getElementById("myChart"), {
	type: 'horizontalBar',
	data: {
		labels: ["Python", "C", "C++", "Matlab",
			"HTML", "CSS", "JavaScript",
			"Git", "CLI", "Latex",
			"Jupyter", "Tensorflow/Keras/PyTorch", "Scikit-learn", "openCV/NLTK", "Numpy/Scipy/Pandas"],
		datasets: [
			{
				label: "Skill",
				backgroundColor: ["rgba(200,0,0,0.5)", "rgba(200,0,0,0.5)", "rgba(200,0,0,0.5)", "rgba(200,0,0,0.5)",
					"rgba(0,200,0,0.5)", "rgba(0,200,0,0.5)", "rgba(0,200,0,0.5)",
					"rgba(0,0,200,0.5)", "rgba(0,0,200,0.5)", "rgba(0,0,200,0.5)",
					"rgba(0,200,200,0.5)", "rgba(0,200,200,0.5)", "rgba(0,200,200,0.5)", "rgba(0,200,200,0.5)", "rgba(0,200,200,0.5)"],
				data: [90, 70, 60, 80,
					50, 55, 70,
					80, 85, 50,
					85, 70, 65, 75, 85]
			}
		]
	},
	options: {
		legend: { display: false },
		title: {
			display: true,
			text: 'Software Development, Web Development, Tools, Data Science, Hardware and Circuit Skills'
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
				gridLines: {
					display: false
				}
			}

			]
		}

	}
});


