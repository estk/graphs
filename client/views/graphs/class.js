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

      console.log('cls is:' + cls);
      if (cls) {
        cid = cls._id;
        var statary = ClassStatistics
          .find({classId: cls._id}, {sort: {date: -1}, limit:11})
          .fetch();
        stats = _.sortBy(statary, function(o){return o.date});
        console.log('stats is:' + stats);

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

  // setInterval( function() {
  //   hc = cc = rc = sc = 1;
  //   hc+=Math.round( Math.random()*5 )+1;
  //   cc+=Math.round( Math.random()*5 )+1;
  //   rc+=Math.round( Math.random()*5 )+1;
  //   sc+=Math.round( Math.random()*5 )+1;
  //   ClassStatistics.insert({
  //     classId: cid,
  //     date: new Date().getTime(),
  //     helpfulCount: hc,
  //     commentCount: cc,
  //     responseCount: rc,
  //     studentCount: sc
  //   });
  // }, 5000 );
});

