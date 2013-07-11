//template helpers
Template.graphsClass.rendered = function() {
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
        var stats = _.sortBy(statAry, function(o){return o.date});
        if (stats) {
          MyGraph.update(stats);
        }
      }
    });
  }
};

Template.graphsClass.destroyed = function() {
  MyGraph.clear();
};

Meteor.startup(function () {
  $(window).on('resize', function () { MyGraph.resize(); });
});
