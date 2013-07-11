if (Classes.find().count() === 0) {
  
  cid = Classes.insert({
    name         : 'Science',
    code         : 'SC710',
    subject      : 'Science',
    year         : '7.1',
    status       : 'open',
    _teacherName : 'Tom Halbert',

    statsDigest: {
      times      : [1,2,3,4,5,6,7],
      students   : [21,22,23,24,25,26,27],
      helpfuls   : [5,10,15,20,25,30,35],
      comments   : [2,4,8,16,32,64,128],
      responses  : [10,20,30,40,50,60,70]
    }
  })
}

if (ClassStatistics.find().count() === 0) {
  var hc = 0, cc = 0, rc = 0, sc = 0;
  _.times(20, function (n) {
    hc+=Math.round( Math.random()*5 )+1;
    cc+=Math.round( Math.random()*5 )+1;
    rc+=Math.round( Math.random()*5 )+1;
    sc+=Math.round( Math.random()*5 )+1;
    ClassStatistics.insert({
      classId: cid,
      date: new Date().getTime(),
      helpfulCount: hc,
      commentCount: cc,
      responseCount: rc,
      studentCount: sc
    })
  } );
}
