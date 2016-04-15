import React from 'react'
import { declare, type } from 'packs'
import Radium from 'radium'
import _ from 'lodash'
import FormField, { FIELD_TYPES } from '../global/components/FormField'
import Button from '../global/components/Button'
import hash from '../global/services/stringHash'

@Radium
export default class Form extends React.Component {
  static propTypes = {
    instructions: declare(type.string),
    fields: declare(type.Array(FIELD_TYPES)),
    submit: declare(type.string),
    complete_form: declare(type.string)
  }

  static defaultProps = {
    instructions: 'Please fill out the following fields:',
    fields: [
      {
        type: 'OPTION_FIELD',
        label: 'Your favorite number:',
        options: [Math.PI, Math.E, 42]
      },{
        type: 'TEXT_FIELD',
        label: 'Your favorite color:'
      }
    ],
    submit: 'Submit',
    complete_form: 'Please complete form to proceed!'
  }

  static simulate (props) {
    const formId = hash(JSON.stringify(props.fields))
    return _(props.fields)
      .map((f, i) => [`form_${formId}_${i}`, 'simulated'])
      .object()
      .value()
  }

  constructor (props) {
    super(props)
    this.state = { responses: {} }
  }

  handleField (i, value) {
    const { responses } = this.state
    this.setState({
      responses: {
        ...responses,
        [i]: value
      }
    })
  }

  submit () {
    const { responses } = this.state
    const { fields, push } = this.props
    const formId = hash(JSON.stringify(fields))
    const complete = _.every(fields, (f, i) => !!responses[i])
    if (!complete) {
      this.setState({ incomplete: true })
    } else {
      push(
        _(fields)
          .map((f, i) => [`form_${formId}_${i}`, responses[i]])
          .object()
          .value()
      )
    }
  }

  render () {
    const {
      fields,
      instructions,
      submit,
      complete_form
    } = this.props

    return (
      <div>
        {
          instructions &&
          <div style={[
            styles.panel,
            styles.padding(1),
            {
              background: '#ffe'
            }
          ]}>
            {instructions}
          </div>
        }
        <div style={[
          styles.panel,
          styles.padding(1),
          styles.margin(1, 0, 0, 0)
        ]}>
          <div>
            {
              !!fields.length &&
              fields.map((f, i) => (
                <FormField
                  {...f}
                  handler={(v) => ::this.handleField(i, v)}
                  key={i}
                />
              ))
            }
            {
              this.state.incomplete &&
              <div style={[styles.complete]}>
                <span>{complete_form}</span>
              </div>
            }
            <div style={[styles.padding(1, 0, 0, 0)]}>
              <Button
                text={submit}
                handler={::this.submit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import gstyles from '../global/styles'
const styles = {
  ...gstyles,
  complete: {
    ...gstyles.padding(0.5),
    color: '#fff',
    background: '#f99',
    textAlign: 'center'
  }
}