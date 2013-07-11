Meteor.startup(function () {
  Meteor.setInterval(function() {
    var startToday = moment().startOf('day').toDate().getTime();
    var endToday = moment().endOf('day').toDate().getTime();
    ClassStatistics.update(
      {date: {$gte: startToday, $lt: endToday}},
      {$inc: {studentCount: 1, commentCount: 1}}
    );
  }, 5000);
});