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
  this.template = template;
  this.graph = null
  this.seriesComputation = graphOptions.seriesComputation;
  
  var element = template.find("#graph");
  graphOptions.graphOpts.element = element;
  graphOptions.graphOpts.width = $(template.find("#graph_container")).width() - 45;
  graph = new Rickshaw.Graph(graphOptions.graphOpts);
  graph.renderer.unstack = true;
  graph.render();
  this.graph = graph;
  
  graphOptions.yOpts.graph = graph;
  graphOptions.yOpts.element= template.find("#y_axis")
  var yAxis = new Rickshaw.Graph.Axis.Y(graphOptions.yOpts);
  yAxis.render();
  
  graphOptions.xOpts.graph = graph;
  graphOptions.xOpts.element= template.find("#x_axis")
  var xAxis = new Rickshaw.Graph.Axis.X(graphOptions.xOpts);
  xAxis.render();

  var legend = new Rickshaw.Graph.Legend( {
    graph: graph,
    element: template.find("#legend")
  });
  
  // Methods
  self = this;
  this.update = function () {
    var series = self.seriesComputation()
    if (series) self._updateData(series);
  }
  this.resize = function (width) {
    if (self.graph) {
      self.graph.configure({width: width});
      self.graph.render();
      self._makeDots();
    }
  }
  return this;
}

GraphWrapper.prototype = {
  _updateData: function (data) {
    if (this.graph) {
      for (var i=0;i<this.graph.series.length;i++)
        this.graph.series[i].data = data[i];
      this.graph.update();
    }
    this._makeDots();
  },
  _makeDots: function () {
    var dots = this.template.findAll(".dot");
    if (dots && this.graph.element) {
      var elem = this.template.find("#graph")
      _.each(dots, function (e) { elem.removeChild(e); });
    }
    var self = this;
    _.each(this.graph.series, function (s) {
      var lastPoint = s.data[s.data.length-1];
      var left = self.graph.x(lastPoint.x);
      var top = self.graph.y(lastPoint.y);
      var element = document.createElement('div');
      element.className = 'dot';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
      element.style.borderColor = s.stroke;
      self.template.find("#graph").appendChild(element);
    });
  }
}
