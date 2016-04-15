import React from 'react'
import Radium from 'radium'
import { declare, type } from 'packs'
import Button from '../global/components/Button'
import Markdown from 'react-remarkable'

@Radium
class Consent extends React.Component {
  static propTypes = {
    body: declare(type.string),
    agree: declare(type.string),
    continue: declare(type.string),
    to_continue_text: declare(type.string)
  }

  static simulate (props) {
    return null
  }

  render () {
    return (
      <div style={[styles.container]}>
        <Markdown
          source={this.props.body}
        />
        <div>
          <label>
            <input
              type="checkbox"
              style={[styles.checkbox]}
              onChange={() => this.setState({agreed: !this.state.agreed})}
            />
            <b>{' ' + this.props.agree}</b>
          </label>
          <div style={[styles.clearfix]}>
          {
            this.state.agreed &&
            <Button
              modStyle={{float:'right', marginTop: '1rem'}}
              text={this.props.continue}
              handler={() => this.props.push({})}
            /> ||
            <p>
              <i>{this.props.to_continue_text}</i>
            </p>
          }
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    fontSize: '1rem',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: 15,
    boxShadow: '2px 2px 4px #ddd',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 60,
    paddingTop: '1rem',
    paddingRight: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    background: '#fff'
  },
  checkbox: {
    fontSize: '2em'
  },
  clearfix: {
    overflow: 'hidden',
    padding: 5
  }
}

export default Consent
