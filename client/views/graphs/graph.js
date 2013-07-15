Meteor.startup(function () {
  $(window).on('resize', function () { MyGraph.resize(); });
});

MyGraph = {
  graph: null,
  element: null,
  update: function (data) {
    if (this.graph) {
      for (var i=0;i<this.graph.series.length;i++)
        this.graph.series[i].data = data[i];
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
    graphOptions.graphOpts.element = element;
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
    return graph;
  }
};