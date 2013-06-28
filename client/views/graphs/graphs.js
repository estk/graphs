// [numerator, denominator, time]
var prepStats = function(ary) {
  var n = ary[0];
  var d = ary[1];
  return {y: n/d, x: ary[2]};
}

// returns a time series of Helpfuls per Student
var prepHps = function(stats) {
  return _.map(_.zip(stats.helpfuls, stats.students, stats.times), prepStats);
}

// returns a time series of Comments per Response
var prepCpr = function(stats) {
  return _.map(_.zip(stats.comments, stats.responses, stats.times), prepStats);
}

var makeGraph = function () {
  
  var stats = Classes.findOne().statsDigest;
  var hps = prepHps(stats);
  var cpr = prepCpr(stats);
  graph = new Rickshaw.Graph( {
  	element: document.querySelector("#graph"),
  	width: ($("#graph_container").width() - 45), // responsive resize
  	height: 110,
  	renderer: 'area',
  	stroke: true,
    padding: { top: 0.01, right: 0.20, bottom: 0.01, left: 0 },
  	series: [ {
      name: "Avg. Helpfuls per student",
      data: hps,
  		color: 'rgba(192,210,225,0.7)',
  		stroke: 'rgba(192,210,225,0.95)'
  	}, {
      name: "Avg. Comments per response",
      data: cpr,
  		color: 'rgba(230,240,226,0.7)',
  		stroke: 'rgba(230,240,226,0.95)'
  	} ]
  });
  graph.renderer.unstack = true;
  graph.render();
  
  // When we use this for flipped we will let the function be a call to momment(n).format(..)
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
  
  var x_axis = new Rickshaw.Graph.Axis.X({
      graph: graph,
      orientation: 'bottom',
      grid: false,
      tickFormat: format,
      element: document.getElementById('x_axis'),
  });
  x_axis.render();
  
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
  });
};

var reRenderGraph = function() {
  graph.configure({width: ($("#graph_container").width() - 45)});
  graph.render();
};


// Event Listeners
Meteor.startup(makeGraph);
$(window).on('resize', reRenderGraph);

