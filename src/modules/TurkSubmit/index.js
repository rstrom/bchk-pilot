import React from 'react'
import Radium from 'radium'
import { declare, type } from 'packs'
import _ from 'lodash'
import http from 'superagent'
import styles from '../global/styles'

@Radium
class Submit extends React.Component {
  static propTypes = {
    blacklist: declare(type.array),
    surveyName: declare(type.string),
    surveyVersion: declare(type.string),
    thanks: declare(type.string),
    your_survey_code: declare(type.string),
    loading: declare(type.string),
    url: declare(type.string)
  }

  static defaultProps = {
    blacklist: [],
    surveyName: '$surveyName',
    surveyVersion: '$surveyVersion',
    thanks: 'Thank you!',
    your_survey_code: 'Your survey code:',
    loading: 'loading...',
    url: '$turkSubmitTo'
  }

  static simulate (props) {
    return null
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      thanks,
      table,
      url
    } = this.props

    return (
      <div>
        <h1>{thanks}</h1>
        <form method="post" action={decodeURIComponent(url) + '/mturk/externalSubmit'}>
          {
            _.map(table, (v, k) => (
              <input
                type="hidden"
                name={k}
                value={v}
                key={k}
              />
            ))
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Submit