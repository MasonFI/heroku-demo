$(document).ready(
		function() {
			function array_flip( trans )
			{
			    var key, tmp_ar = {};

			    for ( key in trans )
			    {
			        if ( trans.hasOwnProperty( key ) )
			        {
			            tmp_ar[trans[key]] = key;
			        }
			    }

			    return tmp_ar;
			}
			
			google.charts.load('current', {
				packages : [ 'corechart', 'line' ]
			});
			google.charts.setOnLoadCallback(drawBackgroundColor);

			function drawBackgroundColor() {
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'Vuosi');
				data.addColumn('number', 'Kangasniemi');

				var options = {
					chart: {
						title: 'Etelä-Savon kesämökkien määrä',
						subtitle: 'Tämä on alaotsikko'
					},
					hAxis : {
						title : 'Vuosi'
					},
					vAxis : {
						title : 'Määrä'
					},
					backgroundColor : '#f1f8e9',
					pointSize: 8,
				};

				console.log(jQuery);
				console.log($);
				var json = $.getJSON("../stats/kesamokit.json", function(json) {
					console.log(json);
					// convert json data to format google understands
					var years = json.dataset.dimension.Vuosi.category.index;
					years = array_flip(years);
					console.log(years);
					$.each(json.dataset.value, function(key, value) {
						console.log(key, value);
						data.addRows([[years[key], value]]);
					});
					
					// data.addRows([ [ 0, 0 ], [ 1, 10 ], [ 2, 23 ], [ 3, 17 ],
					// [ 4, 18 ],
					// [ 5, 9 ], [ 6, 11 ], [ 7, 27 ], [ 8, 33 ], [ 9, 40 ], [
					// 10, 32 ],
					// [ 11, 35 ], [ 12, 30 ], [ 13, 40 ], [ 14, 42 ], [ 15, 47
					// ],
					// [ 16, 44 ], [ 17, 48 ], [ 18, 52 ], [ 19, 54 ], [ 20, 42
					// ],
					// [ 21, 55 ], [ 22, 56 ], [ 23, 57 ], [ 24, 60 ], [ 25, 50
					// ],
					// [ 26, 52 ], [ 27, 51 ], [ 28, 49 ], [ 29, 53 ], [ 30, 55
					// ],
					// [ 31, 60 ], [ 32, 61 ], [ 33, 59 ], [ 34, 62 ], [ 35, 65
					// ],
					// [ 36, 62 ], [ 37, 58 ], [ 38, 55 ], [ 39, 61 ], [ 40, 64
					// ],
					// [ 41, 65 ], [ 42, 63 ], [ 43, 66 ], [ 44, 67 ], [ 45, 69
					// ],
					// [ 46, 69 ], [ 47, 70 ], [ 48, 72 ], [ 49, 68 ], [ 50, 66
					// ],
					// [ 51, 65 ], [ 52, 67 ], [ 53, 70 ], [ 54, 71 ], [ 55, 72
					// ],
					// [ 56, 73 ], [ 57, 75 ], [ 58, 70 ], [ 59, 68 ], [ 60, 64
					// ],
					// [ 61, 60 ], [ 62, 65 ], [ 63, 67 ], [ 64, 68 ], [ 65, 69
					// ],
					// [ 66, 70 ], [ 67, 72 ], [ 68, 75 ], [ 69, 80 ] ]);

					var chart = new google.visualization.LineChart(document
							.getElementById('chart_div'));
					chart.draw(data, options);
				});
			}
		});