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
      name: "Avg Helpfuls per student",
      data: data.hps,
      // data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 20 }, { x: 4, y: 16 } ],
  		color: 'rgba(192,210,225,0.7)',
  		stroke: 'rgba(0,0,0,0.15)'
  	}, {
      name: "Avg. Comments per response",
      data: data.cpr,
      // data: [ { x: 0, y: 22 }, { x: 1, y: 25 }, { x: 2, y: 38 }, { x: 3, y: 44 }, { x: 4, y: 46 } ],
  		color: 'rgba(230,240,226,0.7)',
  		stroke: 'rgba(0,0,0,0.15)'
  	} ]
  } );

  graph.renderer.unstack = true;
  graph.render();
  
  var x_axis = new Rickshaw.Graph.Axis.Time({
      graph: graph
  });

  x_axis.render();
  
  var y_axis = new Rickshaw.Graph.Axis.Y({
      graph: graph,
      orientation: 'left',
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
