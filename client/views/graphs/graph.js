Template.graph.rendered = function () {
  if (! this.rendered) {
    this.rendered = true;
    graphOptions = this.data;
    graph = new GraphWrapper(graphOptions);

    $(window).on('resize', function () { 
      graph.resize(($("#graph_container").width() - 45)); 
    });
  }
}

GraphWrapper = function (graphOptions) {
  this.graph = null
  this.yAxis = null
  this.xAxis = null
  this.legend = null
  
  var element = document.querySelector("#graph");
  graphOptions.graphOpts.element = element;
  graphOptions.graphOpts.width= $("#graph_container").width() - 45;
  var graph = new Rickshaw.Graph(graphOptions.graphOpts);
  graph.renderer.unstack = true;
  graph.render();
  this.graph = graph;
  
  graphOptions.yOpts.graph = graph;
  graphOptions.yOpts.element= document.getElementById('y_axis')
  this.yAxis = new Rickshaw.Graph.Axis.Y(graphOptions.yOpts);
  this.yAxis.render();
  
  graphOptions.xOpts.graph = graph;
  graphOptions.xOpts.element= document.getElementById('x_axis')
  this.xAxis = new Rickshaw.Graph.Axis.X(graphOptions.xOpts);
  this.xAxis.render();

  this.legend = new Rickshaw.Graph.Legend( {
    graph: graph,
    element: document.querySelector("#legend")
  });
  return this;
}

GraphWrapper.prototype = {
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
  }
}