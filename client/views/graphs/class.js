Template.classesShow.helpers({
  graphOptions: function () {
    return makeGraphOptions();
  }
});

var makeSeries = function () {
  var cls = Classes.findOne();
  if (cls) {
    var statAry = ClassStatistics
      .find({classId: cls._id}, {sort: {date: -1}, limit:10})
      .fetch();
    var sortedStats = _.sortBy(statAry, function(o){return o.date});
  } else sortedStats = null;
  var series = []
  series[0] = _.map(sortedStats, prepHps);
  series[1] = _.map(sortedStats, prepCpr);
  return series;
}
var prepStat = function(n, d, t) {
  return {y: n/d, x: t};
}
var prepHps = function(stat) {
  return prepStat(stat.helpfulCount, stat.studentCount, stat.date);
}
var prepCpr = function(stat) {
  return prepStat(stat.commentCount, stat.responseCount, stat.date);
}

var makeGraphOptions = function () {
  var helpfulsPerStudent = [{x: 0, y: 0}];
  var commentsPerResponse = [{x: 0, y: 0}];
  var format = function(n) { return moment(n).format("MMM D") };
  return {
    seriesComputation: makeSeries,
    graphOpts: {
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
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT
    },
    xOpts: {
      orientation: 'bottom',
      tickFormat: format,
    }
  }
}