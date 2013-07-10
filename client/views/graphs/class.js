
MyGraph = {
  inst: null,
  init: _.once(function () {
    // [numerator, denominator, time]
    var prepStats = function(ary) {
      var n = ary[0];
      var d = ary[1];
      return {y: n/d, x: ary[2]};
    };

    // returns a time series of Helpfuls per Student
    var prepHps = function(stats) {
      return _.map(_.zip(stats.helpfuls, stats.students, stats.times), prepStats);
    };

    // returns a time series of Comments per Response
    var prepCpr = function(stats) {
      return _.map(_.zip(stats.comments, stats.responses, stats.times), prepStats);
    };

    // var hps = [{x: 0, y: 0}];
    // var cpr = [{x: 0, y: 0}];
    if (Classes.findOne() !== undefined) {
      var stats = Classes.findOne().statsDigest;
      var hps = prepHps(stats);
      var cpr = prepCpr(stats);
      debugger;
      this.inst = new Rickshaw.Graph({
        element: $("#graph"),
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
      debugger;
      this.inst.renderer.unstack = true;
      this.inst.render();
      debugger;

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
      };

      var x_axis = new Rickshaw.Graph.Axis.X({
          graph: this.inst,
          orientation: 'bottom',
          grid: false,
          tickFormat: format,
          element: document.getElementById('x_axis'),
      });
      x_axis.render();

      var y_axis = new Rickshaw.Graph.Axis.Y({
          graph: this.inst,
          orientation: 'left',
          grid: false,
          ticks: 3,
          tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
          element: document.getElementById('y_axis')
      });
      y_axis.render();

      var legend = new Rickshaw.Graph.Legend( {
        graph: this.inst,
        element: document.getElementById('legend')
      });
    }
  } )
};

var reRenderGraph = function() {
  MyGraph.inst.configure({width: ($("#graph_container").width() - 45)});
  MyGraph.inst.render();
};

// Event Listeners
Template.graphClass.created = function() {
  // MyGraph.init();
  // MyGraph.inst.update();
};

// $(window).on('resize', reRenderGraph);
// setInterval( function() {
//   if (Classes.findOne() !== undefined) {
//     var stats = Classes.findOne().statsDigest;
//     hps = prepHps(stats);
//     cpr = prepCpr(stats);
//   };
//   graph.configure( {
//   series: [ {
//     name: "Avg. Helpfuls per student",
//     data: hps,
//     color: 'rgba(192,210,225,0.7)',
//     stroke: 'rgba(192,210,225,0.95)'
//   }, {
//     name: "Avg. Comments per response",
//     data: cpr,
//     color: 'rgba(230,240,226,0.7)',
//     stroke: 'rgba(230,240,226,0.95)'
//   } ] } );
//   graph.render();
// }, 300 );

