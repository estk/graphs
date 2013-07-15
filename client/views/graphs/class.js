Template.classesShow.rendered = function() {
  if (! this.rendered) {
    this.rendered = true;
    var graphOptions = makeGraphOptions();
    var graph = MyGraph.init(graphOptions);
    Deps.autorun(function() {
      var cls = Classes.findOne();
      if (cls) {
        var statAry = ClassStatistics
          .find({classId: cls._id}, {sort: {date: -1}, limit:10})
          .fetch();
        var sortedStats = _.sortBy(statAry, function(o){return o.date});
        if (sortedStats) updateGraph(sortedStats);
      }
    });
  }
}

var updateGraph = function (stats) {
  var data = []
  data[0] = _.map(stats, prepHps);
  data[1] = _.map(stats, prepCpr);
  console.log(data);
  MyGraph.update(data);
}

// [numerator, denominator, time]
var prepStat = function(n, d, t) {
  return {y: n/d, x: t};
};
var prepHps = function(stat) {
  return prepStat(stat.helpfulCount, stat.studentCount, stat.date);
};
var prepCpr = function(stat) {
  return prepStat(stat.commentCount, stat.responseCount, stat.date);
};

var makeGraphOptions = function () {
  var helpfulsPerStudent = [{x: 0, y: 0}];
  var commentsPerResponse = [{x: 0, y: 0}];
  var format = function(n) { return moment(n).format("MMM D") };
  return {
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
      ticks: 3,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: document.getElementById('y_axis')
    },
    xOpts: {
      orientation: 'bottom',
      tickFormat: format,
      element: document.getElementById('x_axis'),
    }
  }
}