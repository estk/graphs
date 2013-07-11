Meteor.startup( function () {
  Meteor.setInterval( function() {
    var startToday = moment().startOf('day').toDate().getTime();
    var endToday = moment().endOf('day').toDate().getTime();
    ClassStatistics.update(
      {date: {$gte: startToday, $lt: endToday}},
      {$inc: {studentCount: 1, commentCount: 5}}
    );
  }, 5000 );
  // Meteor.setTimeout( function() {
  //   var tomorrow = moment().add("days", 1).toDate().getTime();
  //   ClassStatistics.insert({
  //     classId: cid,
  //     date: tomorrow,
  //     helpfulCount: 20,
  //     commentCount: 20,
  //     responseCount: 20,
  //     studentCount: 20
  //   });  }, 10000 );
} );