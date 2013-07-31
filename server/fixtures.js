Classes.remove({}, {multi: true});
ClassStatistics.remove({}, {multi: true});

// Create a sample class.
var cid = Classes.insert({
  name: 'Science',
  code: 'SC710',
  subject: 'Science',
  year: '7.1',
  status: 'open',
  _teacherName: 'Tom Halbert',
});
// Prepare and insert sample statistics for the class
var prepareStatistics = function (cid) {
  var helpfulsCount = 1, commentCount = 1, responseCount = 1, studentCount = 1;
  var date = moment().subtract("days", 19);
  _.times(20, function (n) {
    helpfulsCount += Math.round(Math.random() * 5);
    commentCount  += Math.round(Math.random() * 5);
    responseCount += Math.round(Math.random() * 5);
    studentCount  += Math.round(Math.random() * 5);
  
    ClassStatistics.insert({
      classId: cid,
      date: date.toDate().getTime(),
      helpfulsCount: helpfulsCount,
      commentCount: commentCount,
      responseCount: responseCount,
      studentCount: studentCount
    });
    date = date.add("days", 1);
  });
}
prepareStatistics(cid);
