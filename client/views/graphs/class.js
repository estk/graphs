//template helpers
Template.graphsClass.rendered = function() {
  console.log('rendered');
  
  if (! this.rendered) {
    this.rendered = true; //only do stuff on first render

    // draw empty graph here
    // e.g this.find("#graphElementID");

    Deps.autorun(function() {
      var cls = Classes.findOne();
      var element = document.querySelector("#graph");

      if (cls) {
        cid = cls._id;
        var statary = ClassStatistics
          .find({classId: cls._id}, {sort: {date: -1}, limit:11})
          .fetch();
        stats = _.sortBy(statary, function(o){return o.date});

        if (stats) {
          MyGraph.init(element, stats);
          MyGraph.update(stats);
        }
      }
    });
  }
}

Template.graphsClass.destroyed = function() {
  // clean up graph widget
}


var reRenderGraph = function() {
  MyGraph.graph.configure({width: ($("#graph_container").width() - 45)});
  MyGraph.graph.render();
};

// Event Listeners
Meteor.startup( function () {
  $(window).on('resize', reRenderGraph);
});

