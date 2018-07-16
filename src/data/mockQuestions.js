export default [
  {
    title: 'Basic questions',
    icon: 'building',
    questions: [
      {
        title: 'What is your name?',
        answers: [
          {
            title: 'alex'
          },
          {
            title: 'jim'
          }
        ]
      },
      {
        title: 'What is your favorite color?',
        answers: [
          {
            title: 'blue'
          },
          {
            title: 'red'
          }
        ]
      }
    ]
  },
  {
    title: 'Food questions',
    icon: 'rocket',
    questions: [
      {
        title: 'What is your favorite pasta?',
        answers: [
          {
            title: 'rigotoni'
          },
          {
            title: 'spaghetti'
          }
        ]
      },
      {
        title: 'Which icecream flavors do you like?',
        multipleChoice: true,
        answers: [
          {
            title: 'vanilla'
          },
          {
            title: 'mint'
          }
        ]
      }
    ]
  }
];
