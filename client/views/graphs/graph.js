MyGraph = {
  graph: null,
  element: null,
  yAxis: null,
  xAxis: null,
  update: function (data) {
    if (this.graph) {
      for (var i=0;i<this.graph.series.length;i++)
        this.graph.series[i].data = data[i];
      this.graph.update();
    }
  },
  resize: function (width) {
    if (this.graph) {
      this.graph.configure({width: width});
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
    this.yAxis = new Rickshaw.Graph.Axis.Y(graphOptions.yOpts);
    this.yAxis.render();
    
    graphOptions.xOpts.graph = graph;
    this.xAxis = new Rickshaw.Graph.Axis.X(graphOptions.xOpts);
    this.xAxis.render();

    this.legend = new Rickshaw.Graph.Legend( {
      graph: graph,
      element: document.querySelector("#legend")
    });
    return this;
  }
};