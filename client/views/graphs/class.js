Template.classesShow.rendered = function() {
  if (! this.rendered) {
    this.rendered = true;
    var element = document.querySelector("#graph");
    MyGraph.init(element);
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