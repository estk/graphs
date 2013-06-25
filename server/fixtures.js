if (Classes.find().count() === 0) {
  
  Classes.insert({
    'Science': {
      name         : 'Science',
      code         : 'SC710',
      subject      : 'Science',
      year         : '7.1',
      status       : 'open',
      _teacherName : 'Tom Halbert',

      statsDigest: {
        time: ["20130101", "20130201", "20130301", "20130401", "20130501", "20130601", "20130701"],
        students: [21, 22, 23, 24, 25, 26, 27],
        helpfuls: [5, 10, 15, 20, 25, 30, 35],
        comments: [2, 4, 8, 16, 32, 64, 128]
      }
    }
  })
}
