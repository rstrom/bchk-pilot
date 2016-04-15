import consentMD from './text/consent.md'
import aspects from './aspects.json'
import _ from 'lodash'

export default {
  queue: [{
    type: 'URLParams'
  }, {
    type: 'ConditionalMessage',
    variable: '$assignmentId',
    equals: 'ASSIGNMENT_ID_NOT_AVAILABLE',
    message: 'Please accept this HIT to continue'
  }, {
    type: 'Consent',
    body: consentMD,
    agree: 'I have read the information provided above.  I have been given a chance to ask questions.  My questions have been answered to my satisfaction, and I agree to participate in this study.  If I choose, I will print a copy of this screen and/or request a pdf of this form from the researchers.',
    continue: 'Continue',
    to_continue_text: 'To continue, please check the box to confirm that you have read this form.'
  }, {
    type: 'Bernoulli',
    p: 0.5,
    variable: 'coin'
  }, {
    type: 'Bernoulli',
    p: 0.5,
    variable: 'policy_aspects'
  }, {
    type: 'Sample',
    bucket: 'a',
    n: 30,
    skip_if_true: ['$policy_aspects'],
    aspects: aspects.personal
  }, {
    type: 'Sample',
    bucket: 'a',
    n: 30,
    skip_if_false: ['$policy_aspects'],
    aspects: aspects.policy
  }, {
    type: 'Preamble',
    personal_aspects: [{
      text: 'your health',
      color: '#afa',
      rating: _.sample(_.range(45,56))
    }, {
      text: 'how satisfied you are with your life',
      color: '#ffa',
      rating: _.sample(_.range(45,56))
    }],
    policy_aspects: [{
      text: 'people’s health',
      color: '#afa',
      rating: _.sample(_.range(45,56))
    }, {
      text: 'how satisfied people are with their lives',
      color: '#ffa',
      rating: _.sample(_.range(45,56))
    }],
    intro_text: require('./text/preamble_intro.md'),
    personal_rating_text: require('./text/preamble_personal_rating.md'),
    policy_rating_text: require('./text/preamble_policy_rating.md'),
    personal_rating_instruct: require('./text/personal_rating_instruct.md'),
    policy_rating_instruct: require('./text/policy_rating_instruct.md'),
    personal_tradeoff_text: require('./text/preamble_personal_tradeoff.md'),
    policy_tradeoff_text: require('./text/preamble_policy_tradeoff.md'),
    personal_tradeoff_instruct: require('./text/personal_tradeoff_instruct.md'),
    policy_tradeoff_instruct: require('./text/policy_tradeoff_instruct.md'),
    understand_text: require('./text/preamble_understand.md')
  }, {
    type: 'Rating',
    aspects: [{
      text: '$aspect_a_0',
      color: '$color_a_0',
      code: 'a_0'
    }, {
      text: '$aspect_a_1',
      color: '$color_a_1',
      code: 'a_1'
    }, {
      text: '$aspect_a_2',
      color: '$color_a_2',
      code: 'a_2'
    }],
  }, {
    type: 'Triple',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspect_pairs: [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]],
    aspects: [{
      color: '$color_a_0',
      rating: '$rating_a_0',
      text: '$aspect_a_0'
    }, {
      color: '$color_a_1',
      rating: '$rating_a_1',
      text: '$aspect_a_1'
    }, {
      color: '$color_a_2',
      rating: '$rating_a_2',
      text: '$aspect_a_2'
    } ],
    should_decrease: '$coin'
  }, {
    type: 'Rating',
    aspects: [{
      text: '$aspect_a_3',
      color: '$color_a_3',
      code: 'a_3'
    }, {
      text: '$aspect_a_4',
      color: '$color_a_4',
      code: 'a_4'
    }, {
      text: '$aspect_a_5',
      color: '$color_a_5',
      code: 'a_5'
    }],
  }, {
    type: 'Triple',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspect_pairs: [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]],
    aspects: [{
      color: '$color_a_3',
      rating: '$rating_a_3',
      text: '$aspect_a_3'
    }, {
      color: '$color_a_4',
      rating: '$rating_a_4',
      text: '$aspect_a_4'
    }, {
      color: '$color_a_5',
      rating: '$rating_a_5',
      text: '$aspect_a_5'
    } ],
    should_decrease: '$coin'
  }, {
    type: 'Headers'
  }, {
    complete_form: 'Please complete form to proceed!',
    fields: [{
      label: 'Age:',
      options: ['20-29', '30-39', '40-49', '50-64', '65+'],
      type: 'OPTION_FIELD'
    }, {
      label: 'Gender:',
      options: ['Male', 'Female', 'Other'],
      type: 'OPTION_FIELD'
    }, {
      "label" : "Household income:",
      "options" : [ "Less than $20,000", "\\$20,000-$39,999", "\\$40,000-$49,999", "\\$50,000-$74,999", "\\$75,000-$99,999", "\\$100,000 and above" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "Marital status:",
      "options" : [ "Married", "Never married", "Other" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "Relationship status:",
      "options" : [ "Have a romantic partner", "Do not have a romantic partner", "Other" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "Highest level of education completed:",
      "options" : [ "Less than high school", "High school", "Some college", "Bachelor's degree", "Graduate degree" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "Race/ethnicity:",
      "options" : [ "White (non-Hispanic)", "Black (non-Hispanic)", "Hispanic (any race)", "Asian (non-Hispanic)", "Other" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "Household size:",
      "options" : [ "1", "2", "3", "4", "5", "6", "7+" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "Number of children:",
      "options" : [ "0", "1", "2", "3", "4", "5+" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "Employment status:",
      "options" : [ "Full time employee", "Part time employee", "Unemployed", "Student", "Homemaker", "Disabled", "Other" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "How liberal or conservative do you consider yourself on social issues?",
      "options" : [ "Extremely liberal", "Liberal", "Slightly liberal", "Moderate or middle of the road", "Slightly conservative", "Conservative", "Extremely conservative" ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "How often do you attend religious services?",
      "options" : [
        "Never",
        "Rarely",
        "Once or twice a month",
        "Once a week or more"
      ],
      "type" : "OPTION_FIELD"
    }, {
      "label" : "If you have attended any college, what is the field of study for your most advanced degree?",
      "options" : [
        'Accounting and related services',
        'Agriculture and natural resources',
        'Anthropology',
        'Biological and biomedical sciences',
        'Business',
        'Chemistry',
        'Communication and communication technologies',
        'Computer and information sciences and support services',
        'Corrections and criminal justice',
        'Economics',
        'Education',
        'Engineering and engineering technologies',
        'English language and literature/letters',
        'Family and consumer sciences/human sciences',
        'Finance',
        'Foreign languages, literatures, and linguistics',
        'Health professions and related programs',
        'History',
        'International Studies',
        'Liberal arts and sciences, general studies and humanities',
        'Marketing',
        'Mathematics/Statistics',
        'Multi/interdisciplinary studies',
        'Philosophy, Theology, and religious studies',
        'Physical education and sports studies',
        'Political Science',
        'Psychology',
        'Public administration and social service professions',
        'Sciences, other',
        'Social sciences, other',
        'Sociology',
        'Visual and performing arts',
        'Other'
      ],
      "type" : "OPTION_FIELD"
    } ],
    "instructions" : "Please tell us a little about yourself. We are studying what is important in people’s lives, and our research will explore how this differs for different types of people.",
    "submit" : "Submit",
    "type" : "Form"
  }, {
    "loading" : "loading...",
    "surveyName" : "$surveyName",
    "surveyVersion" : "$surveyVersion",
    "thanks" : "Thank you!",
    "type" : "Store",
    "your_survey_code" : "Your survey code:"
  }],
  table : {
    surveyAuthor : 'Strom - BCHK',
    surveyName : 'pilot',
    surveyVersion : Date.now(),
    firebase: 'https://bchk.firebaseio.com'
  }
}
