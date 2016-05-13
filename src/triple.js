export default (bucket, i) => [
  {
    type: 'Rating',
    aspect: {
      text: `$text_${bucket}${i}`,
      color: `$color_${bucket}${i}`,
      rating: `$rating_${bucket}${i}`,
      code: `${bucket}${i}`
    }
  }, {
    type: 'Rating',
    aspect: {
      text: `$text_${bucket}${i + 1}`,
      color: `$color_${bucket}${i + 1}`,
      rating: `$rating_${bucket}${i + 1}`,
      code: `${bucket}${i + 1}`
    }
  },{
    type: 'Rating',
    aspect: {
      text: `$text_${bucket}${i + 2}`,
      color: `$color_${bucket}${i + 2}`,
      rating: `$rating_${bucket}${i + 2}`,
      code: `${bucket}${i + 2}`
    }
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [{
      text: `$text_${bucket}${i}`,
      color: `$color_${bucket}${i}`,
      rating: `$rating_${bucket}${i}`,
      code: `${bucket}${i}`
    }, {
      text: `$text_${bucket}${i + 1}`,
      color: `$color_${bucket}${i + 1}`,
      rating: `$rating_${bucket}${i + 1}`,
      code: `${bucket}${i + 1}`
    }],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [{
      text: `$text_${bucket}${i}`,
      color: `$color_${bucket}${i}`,
      rating: `$rating_${bucket}${i}`,
      code: `${bucket}${i}`
    }, {
      text: `$text_${bucket}${i + 2}`,
      color: `$color_${bucket}${i + 2}`,
      rating: `$rating_${bucket}${i + 2}`,
      code: `${bucket}${i + 2}`
    }],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [{
      text: `$text_${bucket}${i + 1}`,
      color: `$color_${bucket}${i + 1}`,
      rating: `$rating_${bucket}${i + 1}`,
      code: `${bucket}${i + 1}`
    }, {
      text: `$text_${bucket}${i}`,
      color: `$color_${bucket}${i}`,
      rating: `$rating_${bucket}${i}`,
      code: `${bucket}${i}`
    }],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [{
      text: `$text_${bucket}${i + 1}`,
      color: `$color_${bucket}${i + 1}`,
      rating: `$rating_${bucket}${i + 1}`,
      code: `${bucket}${i + 1}`
    }, {
      text: `$text_${bucket}${i + 2}`,
      color: `$color_${bucket}${i + 2}`,
      rating: `$rating_${bucket}${i + 2}`,
      code: `${bucket}${i + 2}`
    }],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [{
      text: `$text_${bucket}${i + 2}`,
      color: `$color_${bucket}${i + 2}`,
      rating: `$rating_${bucket}${i + 2}`,
      code: `${bucket}${i + 2}`
    }, {
      text: `$text_${bucket}${i}`,
      color: `$color_${bucket}${i}`,
      rating: `$rating_${bucket}${i}`,
      code: `${bucket}${i + 1}`
    }],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [{
      text: `$text_${bucket}${i + 2}`,
      color: `$color_${bucket}${i + 2}`,
      rating: `$rating_${bucket}${i + 2}`,
      code: `${bucket}${i + 2}`
    }, {
      text: `$text_${bucket}${i + 1}`,
      color: `$color_${bucket}${i + 1}`,
      rating: `$rating_${bucket}${i + 1}`,
      code: `${bucket}${i + 1}`
    }],
    triple_code: i / 3,
    should_decrease: '$coin'
  }
]
