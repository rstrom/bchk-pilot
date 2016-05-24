import consentMD from './text/consent.md'
import aspects from './aspects.json'
import _ from 'lodash'
import Triple from './triple'
import demoA from './demographics/a'
import demoB from './demographics/b'

const start = [{
  type: 'URLParams',
  simulate: {
    workerID: 'worker' + Date.now()
  }
}, {
  type: 'ConditionalMessage',
  variable: '$assignmentId',
  equals: 'ASSIGNMENT_ID_NOT_AVAILABLE',
  message: 'Please accept this HIT to continue'
}, {
  type: 'Consent',
  body: consentMD,
  agree: 'I have read the information provided above.  I have been given a chance to contact the researchers with any questions. My questions have either been answered to my satisfaction, or I do not have any questions. I agree to participate in this study.  If I choose, I will print a copy of this screen and/or request a pdf of this form from the researchers.',
  continue: 'Continue',
  to_continue_text: 'To continue, please check the box to confirm that you have read this form.'
}, demoA, {
  type: 'Bernoulli',
  p: 0.5,
  variable: 'coin'
}, {
  type: 'Bernoulli',
  p: 0.5,
  variable: 'policy_aspects'
}, {
  type: 'Shuffle',
  bucket: 'a',
  n: 30,
  skip_if_true: ['$policy_aspects'],
  aspects: aspects.personal
}, {
  type: 'Shuffle',
  bucket: 'a',
  n: 30,
  skip_if_false: ['$policy_aspects'],
  aspects: aspects.policy
}, {
  type: 'Preamble',
  personal_aspects: [{
    text: 'your health',
    color: '#afa',
    code: 'p0'
  }, {
    text: 'your financial security',
    color: '#ffa',
    code: 'p1'
  }],
  policy_aspects: [{
    text: 'the amount of freedom in society',
    color: '#afa',
    code: 'p2'
  }, {
    text: 'people not feeling anxious',
    color: '#ffa',
    code: 'p3'
  }],
  intro_text: require('./text/preamble_intro.md'),
  personal_rating_text: require('./text/preamble_personal_rating.md'),
  policy_rating_text: require('./text/preamble_policy_rating.md'),
  rating_response_text: require('./text/preamble_rating_response.md'),
  personal_rating_instruct: require('./text/personal_rating_instruct.md'),
  policy_rating_instruct: require('./text/policy_rating_instruct.md'),
  personal_tradeoff_text: require('./text/preamble_personal_tradeoff.md'),
  policy_tradeoff_text: require('./text/preamble_policy_tradeoff.md'),
  personal_tradeoff_instruct: require('./text/personal_tradeoff_instruct.md'),
  policy_tradeoff_instruct: require('./text/policy_tradeoff_instruct.md'),
  tradeoff_personal_edge_text: 'There is no practice personal decision about the two aspects you just rated since your ratings were beyond extreme.',
  tradeoff_policy_edge_text: 'There is no practice policy decision about the two aspects you just rated since your ratings were beyond extreme.',
  understand_text: require('./text/preamble_understand.md')
}]

const end = [demoB, {
  type: 'Headers'
}, {
  type: 'Store',
  loading: 'loading...',
  surveyName: '$surveyName',
  surveyVersion: '$surveyVersion',
  thanks: 'Thank you!',
  your_survey_code: 'Your survey code:'
}]

const screens = start
  .concat(_.range(9)
    .map((i) => Triple('a', i * 3))
    .reduce((a, b) => a.concat(b))
  ).concat(end)

const table = {
  surveyAuthor : 'R.S. - BCHK',
  surveyName : 'pilot',
  surveyVersion : '1.0.0',
  firebase: 'https://bchk.firebaseio.com'
}

export default {
  screens,
  table
}
