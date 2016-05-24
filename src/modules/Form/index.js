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
    return _(props.fields)
      .map((f) => [`form_${hash(f.label)}`, 'simulated'])
      .object()
      .value()
  }

  constructor (props) {
    super(props)
    this.state = {
      responses: {},
      invalid: {}
    }
  }

  handleField (i, value) {
    const { responses, invalid } = this.state
    const field = this.props.fields[i]

    this.setState({
      responses: {
        ...responses,
        [i]: value
      },
      invalid: {
        ...invalid,
        [i]: !!field.validate && !(new RegExp(field.validate)).test(value)
      }
    })
  }

  check (conditions) {
    const { responses } = this.state
    const labels = this.props.fields.map((f) => f.label)
    return !conditions || conditions
      .map((c) => c.match(/\[(.+)\]:(.+)/))
      .filter(([, label, res]) => responses[labels.indexOf(label)] === res)
      .reduce((a, b) => a || b, false)
  }

  submit () {
    const { responses, incomplete } = this.state
    const { fields, push } = this.props
    const n = fields
      .filter((f, i) => !responses[i] && ::this.check(f.conditions)).length

    if (n && !incomplete) {
      this.setState({ incomplete: n })
    } else {
      push(
        _(fields)
          .map((f, i) => [`form_${hash(f.label)}`, responses[i] || 'declined'])
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

    const {
      responses,
      incomplete,
      invalid
    } = this.state

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
              fields
                .map((f, i) => (
                  (::this.check(f.conditions)) && <FormField
                    {...f}
                    invalid={invalid[i]}
                    value={responses[i]}
                    handler={(v) => ::this.handleField(i, v)}
                    key={i}
                  />
                ))
            }
            {
              incomplete &&
              <div style={[styles.complete]}>
                <span>{complete_form.replace(/{n}/, incomplete)}</span>
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
