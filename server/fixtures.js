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
var hc = 1, cc = 1, rc = 1, sc = 1;
var date = moment().subtract("days", 19);
_.times(20, function (n) {
  hc += Math.round(Math.random() * 5 );
  cc += Math.round(Math.random() * 5 );
  rc += Math.round(Math.random() * 5 );
  sc += Math.round(Math.random() * 5 );
  
  ClassStatistics.insert({
    classId: cid,
    date: date.toDate().getTime(),
    helpfulCount: hc,
    commentCount: cc,
    responseCount: rc,
    studentCount: sc
  });
  date = date.add("days", 1);
});
