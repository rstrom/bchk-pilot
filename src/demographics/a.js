export default {
  type: 'Form',
  complete_form: 'There are {n} unanswered questions on this page. By clicking "Continue", you can continue to the main survey. However, if you are comfortable completing any of the remaining questions, we ask you to please do so because it would help us with our research.',
  fields: [{
    label: 'Age:',
    options: ['18-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'],
    type: 'OPTION_FIELD'
  }, {
    label: 'Gender:',
    options: ['Male', 'Female', 'Prefer not to answer'],
    type: 'OPTION_FIELD'
  }, {
    label: 'Household income:',
    options: [ 'Less than $20,000', '\\$20,000-$39,999', '\\$40,000-$59,999', '\\$60,000-$79,999', '\\$80,000-$99,999', '\\$100,000 or more' ],
    type: 'OPTION_FIELD'
  }, {
    label: 'Relationship status:',
    options: [ 'Have a romantic partner', 'Do not have a romantic partner', 'Other' ],
    type: 'OPTION_FIELD'
  }, {
    label: 'Marital status:',
    options: [ 'Married', 'Never married', 'Divorced', 'Widowed', 'Separated', 'Other' ],
    type: 'OPTION_FIELD'
  }, {
    "label" : "Highest level of education completed:",
    "options" : [ "Less than high school", "High school", "Some college", "Bachelor's degree", "Graduate degree" ],
    "type" : "OPTION_FIELD"
  }, {
    type: 'TEXT_FIELD',
    label: 'ZIP code of home residence',
    validate: '^\\d{5}$'
  }, {
    label: 'Race/ethnicity:',
    options: [ 'White (non-Hispanic)', 'Black (non-Hispanic)', 'Hispanic (any race)', 'Asian (non-Hispanic)', 'Multiracial', 'Other' ],
    type: 'OPTION_FIELD'
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
    "label" : "If you have attended any college, what is the field of study for your most advanced degree?",
    "options" : [
      'Accounting and related services',
      'Agriculture and natural resources',
      'Anthropology',
      'Biological and biomedical sciences',
      'Business',
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
      'Liberal arts and sciences, general studies and humanities',
      'Marketing',
      'Mathematics/Statistics',
      'Multi/interdisciplinary studies',
      'Natural sciences',
      'Philosophy, Theology, and religious studies',
      'Physical education and sports studies',
      'Political Science',
      'Psychology',
      'Public administration and social service professions',
      'Social sciences, other',
      'Sociology',
      'Visual and performing arts',
      'Other'
    ],
    "type" : "OPTION_FIELD"
  }, {
    type: 'OPTION_FIELD',
    label: 'In politics today, do you consider yourself a Republican, Democrat, or independent?',
    options: [
      'Republican',
      'Democrat',
      'Independent',
      'Other'
    ]
  } ],
  "instructions" : "Please tell us a little about yourself. We are studying what is important in people’s lives, and our research will explore how this differs for different people.",
  "submit" : "Continue"
}
