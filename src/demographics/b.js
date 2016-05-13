export default {
  type: 'Form',
  complete_form: 'There are {n} unanswered questions on this page. By clicking "Continue", you can continue to the main survey. However, if you are comfortable completing any of the remaining questions, we ask you to please do so because it would help us with our research.',
  fields: [ {
    type: 'OPTION_FIELD',
    label: 'In general, how do you consider your views on social issues?',
    options: [
      'Very conservative',
      'Conservative',
      'Moderate',
      'Liberal',
      'Very liberal',
      'No opinion'
    ]
  }, {
    type: 'OPTION_FIELD',
    label: 'In general, how do you consider your views on economic issues?',
    options: [
      'Very conservative',
      'Conservative',
      'Moderate',
      'Liberal',
      'Very liberal',
      'No opinion'
    ]
  }, {
    type: 'OPTION_FIELD',
    label: 'How important is religion in your life?',
    options: [
      'Not important',
      'A little important',
      'Pretty important',
      'Very important'
    ]
  }, {
    type: 'OPTION_FIELD',
    label: 'Aside from weddings and funerals, how often do you attend religious services?',
    options: [
      'More than once a week',
      'Once a week',
      'Once or twice a month',
      'A few times a year',
      'Seldom',
      'Never'
    ]
  }, {
    type: 'OPTION_FIELD',
    label: 'How much do you agree with the statement, "There is life after death"?',
    options: [
      'Strongly disagree',
      'Somewhat disagree',
      'Slightly disagree',
      'Slightly agree',
      'Somewhat agree',
      'Strongly agree'
    ]
  }, {
    type: 'OPTION_FIELD',
    label: 'Would you say that you have ever had a "religious or mystical experience"— that is, a moment of sudden religious insight or awakening?',
    options: [
      'Yes',
      'No',
      'Don\'t know'
    ]
  } ],
  "instructions" : "Please tell us a little about yourself. We are studying what is important in people’s lives, and our research will explore how this differs for different people.",
  "submit" : "Continue"
}
