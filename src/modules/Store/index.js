import React from 'react'
import Radium from 'radium'
import { declare, type } from 'packs'
import _ from 'lodash'
import http from 'superagent'
import styles from '../global/styles'

@Radium
class Store extends React.Component {
  static propTypes = {
    blacklist: declare(type.array),
    surveyName: declare(type.string),
    surveyVersion: declare(type.string),
    thanks: declare(type.string),
    your_survey_code: declare(type.string),
    loading: declare(type.string)
  }

  static defaultProps = {
    blacklist: [],
    surveyName: '$surveyName',
    surveyVersion: '$surveyVersion',
    thanks: 'Thank you!',
    your_survey_code: 'Your survey code:',
    loading: 'loading...'
  }

  static simulate (props) {
    return null
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const { table, surveyName, surveyVersion } = this.props
    http
      .post(`https://surveyloader.firebaseio.com/responseData/${surveyName}/${surveyVersion}.json`)
      .send({
        ...table,
        received: {
          '.sv': 'timestamp'
        }
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err, res)
        this.setState({ survey_code: res.body.name })
      })
  }

  render () {
    const { survey_code } = this.state
    const {
      thanks,
      your_survey_code,
      loading
    } = this.props
    return (
      <div>
        <h1>{thanks}</h1>
        <em>{your_survey_code}&nbsp;</em>
        <input
          type="text"
          value={survey_code || loading}
          size={30}
        />
      </div>
    )
  }
}

export default Store