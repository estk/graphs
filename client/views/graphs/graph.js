MyGraph = {
  graph: null,
  element: null,
  update: function (stats) {
    if (this.graph) {
      this.graph.series[0].data = _.map(stats, prepHps);
      this.graph.series[1].data = _.map(stats, prepCpr);
      this.graph.update();
    }
  },
  resize: function () {
    if (this.graph) {
      this.graph.configure({width: ($("#graph_container").width() - 45)});
      this.graph.render();
    }
  },
  init: function (element, stats) {
    this.element = element;
    var helpfulsPerStudent = _.map(stats, prepHps);
    var commentsPerResponse = _.map(stats, prepCpr);
    if (! stats) {
      helpfulsPerStudent.push({x: 0, y: 0});
      commentsPerResponse.push({x: 0, y: 0});
    }
    var graph = new Rickshaw.Graph({
      element: element,
      width: ($("#graph_container").width() - 45), // responsive resize
      height: 110,
      renderer: 'area',
      stroke: true,
      padding: {top: 0.05, right: 0.20, bottom: 0.01, left: 0},
      series: [ {
        name: "Avg. Helpfuls per student",
        data: helpfulsPerStudent,
        color: 'rgba(192,210,225,0.7)',
        stroke: 'rgba(192,210,225,0.95)'
      }, {
        name: "Avg. Comments per response",
        data: commentsPerResponse,
        color: 'rgba(230,240,226,0.7)',
        stroke: 'rgba(230,240,226,0.95)'
      } ]
    });
    graph.renderer.unstack = true;
    graph.render();
    this.graph = graph;

    var y_axis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        orientation: 'left',
        grid: false,
        ticks: 3,
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById('y_axis')
    });
    y_axis.render();

    // When we use this for flipped we will let the function be a call to 
    var format = function(n) { return moment(n).format("MMM D") };

    var x_axis = new Rickshaw.Graph.Axis.X({
        graph: graph,
        orientation: 'bottom',
        grid: false,
        tickFormat: format,
        element: document.getElementById('x_axis'),
    });
    x_axis.render();

    var legend = new Rickshaw.Graph.Legend( {
      graph: graph,
      element: document.getElementById('legend')
    });
  }
};

// [numerator, denominator, time]
var prepStat = function(n, d, t) {
  return {y: n/d, x: t};
};

// returns a time series of Helpfuls per Student
var prepHps = function(stat) {
  return prepStat(stat.helpfulCount, stat.studentCount, stat.date);
};

// returns a time series of Comments per Response
var prepCpr = function(stat) {
  return prepStat(stat.commentCount, stat.responseCount, stat.date);
};

Meteor.startup(function () {
  $(window).on('resize', function () { MyGraph.resize(); });
});
