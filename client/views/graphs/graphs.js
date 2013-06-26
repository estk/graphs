// numerator, denominator, time
var prepStats = function(ary) {
  var n = ary[0];
  var d = ary[1];
  return {y: n/d, x: ary[2]};
}

// returns an object with fields of prepared data
var prepareData = function(stats) {
  var res = Object;
  res.hps = _.map(_.zip(stats.helpfuls, stats.students, stats.times), prepStats);
  res.cpr = _.map(_.zip(stats.comments, stats.responses, stats.times), prepStats);
  return res;
};

var makeGraph = function () {
  var data = prepareData(Classes.findOne().statsDigest);
  var graph = new Rickshaw.Graph( {
  	element: document.querySelector("#graph"),
  	width: 260,
  	height: 110,
  	renderer: 'area',
  	stroke: true,
  	series: [ {
      name: "Avg. Helpfuls per student",
      data: data.hps,
  		color: 'rgba(192,210,225,0.7)',
  		stroke: 'rgba(192,210,225,0.95)'
  	}, {
      name: "Avg. Comments per response",
      data: data.cpr,
  		color: 'rgba(230,240,226,0.7)',
  		stroke: 'rgba(230,240,226,0.95)'
  	} ]
  } );

  graph.renderer.unstack = true;
  graph.render();
  
  var format = function(n) {
  	var map = {
  		1: 'January',
  		2: 'Febuary',
  		3: 'March',
  		4: 'April',
  		5: 'May',
  		6: 'June',
  		7: 'July'
  	};
  	return map[n];
  }
  
  var x_ticks = new Rickshaw.Graph.Axis.X({
      graph: graph,
      orientation: 'bottom',
      grid: false,
      element: document.getElementById('x_axis'),
      tickFormat: format,
  });

  x_ticks.render();
  
  var y_axis = new Rickshaw.Graph.Axis.Y({
      graph: graph,
      orientation: 'left',
      grid: false,
      ticks: 3,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: document.getElementById('y_axis')
  });

  y_axis.render();
  
  var legend = new Rickshaw.Graph.Legend( {
  	graph: graph,
  	element: document.getElementById('legend')

  } );
};

Meteor.startup(makeGraph);
