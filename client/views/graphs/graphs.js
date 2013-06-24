var makeGraph = function () {
  var graph = new Rickshaw.Graph( {
  	element: document.querySelector("#chart"),
  	width: 260,
  	height: 110,
  	renderer: 'area',
  	stroke: true,
  	series: [ {
  		data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 20 }, { x: 4, y: 16 } ],
  		color: 'rgba(192,210,225,0.5)',
  		stroke: 'rgba(0,0,0,0.15)'
  	}, {
  		data: [ { x: 0, y: 22 }, { x: 1, y: 25 }, { x: 2, y: 38 }, { x: 3, y: 44 }, { x: 4, y: 46 } ],
  		color: 'rgba(230,240,226,0.5)',
  		stroke: 'rgba(0,0,0,0.15)'
  	} ]
  } );

  graph.renderer.unstack = true;
  graph.render();
};

Meteor.startup(makeGraph);
color="#c0d2e1"