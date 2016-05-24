import React from 'react'
import _ from 'lodash'

class URLParams extends React.Component {
  static simulate (props) {
    return props.simulate
  }

  componentWillMount () {
    const params = _(location.search.slice(1).split('&'))
      .map((item) => item.split('='))
      .object()
      .value()
    this.props.instaPush(params)
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

export default URLParams
