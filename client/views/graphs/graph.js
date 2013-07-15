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
  init: function (graphOptions) {
    var element = document.querySelector("#graph");
    graphOptions.graphOpts.element = element
    var graph = new Rickshaw.Graph(graphOptions.graphOpts);
    graph.renderer.unstack = true;
    graph.render();
    this.graph = graph;

    graphOptions.yOpts.graph = graph;
    var y_axis = new Rickshaw.Graph.Axis.Y(graphOptions.yOpts);
    y_axis.render();

    graphOptions.xOpts.graph = graph;
    var x_axis = new Rickshaw.Graph.Axis.X(graphOptions.xOpts);
    x_axis.render();

    var legend = new Rickshaw.Graph.Legend( {
      graph: graph,
      element: document.querySelector("#legend")
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
