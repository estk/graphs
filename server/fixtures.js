if (Classes.find().count() === 0) {
  
  Classes.insert({
    'Science': {
      name         : 'Science',
      code         : 'SC710',
      subject      : 'Science',
      year         : '7.1',
      status       : 'open',
      _teacherName : 'Tom Halbert',

      stats: {
        students: 10,
        helpfuls: 20,
        comments: 30
      }
    }
  })
}
