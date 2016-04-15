import Radium from 'radium'
import React from 'react'
import styles from '../global/styles'

@Radium
class ConditionalMessage extends React.Component {
  constructor (props) {
    super(props)
  }

  static simulate () {
    return null
  }

  componentWillMount () {
    const { variable, equals, push } = this.props
    if (variable !== equals) {
      push()
    }
  }

  render () {
    return (
      <div style={[styles.panel, styles.padding(1)]}>
      {
        this.props.message
      }
      </div>
    )
  }
}

export default ConditionalMessage