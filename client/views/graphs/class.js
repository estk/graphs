//template helpers
Template.graphsClass.rendered = function() {
  console.log('rendered');
  
  if (! this.rendered) {
    this.rendered = true; //only do stuff on first render

    // draw empty graph here
    // e.g this.find("#graphElementID");

    Deps.autorun(function() {
      var cls = Classes.findOne();

      console.log('cls is:' + cls);
      if (cls) {
        var stats = ClassStatistics.find({classId: cls._id}, {limit: 10}).fetch();
        console.log('stats is:' + stats);

        if (stats) {
          // update graph here
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

  h = 5;
  c = 5;
  var addData = function(hps, cpr) {
    hps.push({x: new Date().getTime(), y: h+ Math.random()*4});
    if (hps.length > 10) { hps.shift() };
    cpr.push({x: new Date().getTime(), y: c+ Math.random()*4});
    if (cpr.length > 10) { cpr.shift() };
  }

  setInterval( function() {
    // addData(hps, cpr);
    MyGraph.init();
    MyGraph.graph.update();
  }, 3000 );
});

