if (Classes.find().count() === 0) {
  
  Classes.insert({
      name         : 'Science',
      code         : 'SC710',
      subject      : 'Science',
      year         : '7.1',
      status       : 'open',
      _teacherName : 'Tom Halbert',

      statsDigest: {
        // times: ["20130101", "20130201", "20130301", "20130401", "20130501", "20130601", "20130701"],
        times: [1,2,3,4,5,6,7],
        students: [21, 22, 23, 24, 25, 26, 27],
        helpfuls: [5, 10, 15, 20, 25, 30, 35],
        comments: [2, 4, 8, 16, 32, 64, 128],
        responses: [10, 20, 30, 40, 50, 60, 70]
    }
  })
}
