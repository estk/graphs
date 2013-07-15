Template.classesShow.rendered = function() {
  if (! this.rendered) {
    this.rendered = true;
    makeGraph();
    Deps.autorun(function() {
      var cls = Classes.findOne();
      if (cls) {
        var statAry = ClassStatistics
          .find({classId: cls._id}, {sort: {date: -1}, limit:11})
          .fetch();
        var sortedStats = _.sortBy(statAry, function(o){return o.date});
        if (sortedStats) {
          MyGraph.update(sortedStats);
        }
      }
    });
  }
};

var makeGraph = function () {
  var helpfulsPerStudent = [{x: 0, y: 0}];
  var commentsPerResponse = [{x: 0, y: 0}];
  var format = function(n) { return moment(n).format("MMM D") };
  var graphOptions = {
    graphOpts: {
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
    },
    yOpts: {
      orientation: 'left',
      grid: false,
      ticks: 3,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: document.getElementById('y_axis')
    },
    xOpts: {
      orientation: 'bottom',
      grid: false,
      tickFormat: format,
      element: document.getElementById('x_axis'),
    }
  }
  MyGraph.init(graphOptions);
}