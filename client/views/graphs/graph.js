// To use this template we need to render #with a graphOptions object which has the following fields: [seriesComputation, graphOpts, yOpts, xOpts]. The last 3 are Rickshaw options objects, and the first is a data prep function. (See GraphWrapper)

Template.graph.rendered = function () {
  if (! this.rendered) {
    this.rendered = true;
    
    graphOptions = this.data;
    graph = new GraphWrapper(this, graphOptions);
    Deps.autorun(function () {
      graph.update();
    });

    $(window).on('resize', function () { 
      graph.resize(($("#graph_container").width() - 45)); 
    });
  }
}

// To use GraphWrapper we need to pass the current template in which we can find the requisite DOM objects, options for Rickshaw.Graph, Rickshaw.Axis.X,Y, and a function which prepares the series.
// seriesComputation :: (Depends on Collection) -> [[{x: float, y: float}]]

GraphWrapper = function (template, graphOptions) {
  this.graph = null
  this.yAxis = null
  this.xAxis = null
  this.legend = null
  this.seriesComputation = graphOptions.seriesComputation;
  
  var element = template.find("#graph");
  graphOptions.graphOpts.element = element;
  graphOptions.graphOpts.width = $(template.find("#graph_container")).width() - 45;
  var graph = new Rickshaw.Graph(graphOptions.graphOpts);
  graph.renderer.unstack = true;
  graph.render();
  this.graph = graph;
  
  graphOptions.yOpts.graph = graph;
  graphOptions.yOpts.element= template.find("#y_axis")
  this.yAxis = new Rickshaw.Graph.Axis.Y(graphOptions.yOpts);
  this.yAxis.render();
  
  graphOptions.xOpts.graph = graph;
  graphOptions.xOpts.element= template.find("#x_axis")
  this.xAxis = new Rickshaw.Graph.Axis.X(graphOptions.xOpts);
  this.xAxis.render();

  this.legend = new Rickshaw.Graph.Legend( {
    graph: graph,
    element: template.find("#legend")
  });
  return this;
}

GraphWrapper.prototype = {
  update: function () {
    this._updateData(this.seriesComputation());
  },
  _updateData: function (data) {
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