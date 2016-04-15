import React, {
  Component
} from 'react'
import { declare, type } from 'packs'
import Button from '../global/components/Button'

class Example extends Component {
  static propTypes = {
    question_text: declare(type.string),
    answer_yes: declare(type.string),
    answer_no: declare(type.string)
  }

  static defaultProps = {
    question_text: 'Do you agree with this question?',
    answer_yes: 'Yes',
    answer_no: 'No'
  }

  static simulate () {
    return {
      example_answer: Math.random() > 0.5 ? 'Yes' : 'No',
      example_time: Date.now()
    }
  }

  constructor (props) {
    super(props)
  }

  handleResponse (answer) {
    this.props.push({
      example_answer: answer,
      example_time: Date.now()
    })
  }

  render () {
    const {
      question_text,
      answer_yes,
      answer_no
    } = this.props

    return (
      <div>
        <p>{question_text}</p>
        <div>
          <Button
            text={answer_yes}
            handler={() => {
              ::this.handleResponse(answer_yes)
            }}
          />
          <Button
            text={answer_no}
            handler={() => {
              ::this.handleResponse(answer_no)
            }}
          />
        </div>
      </div>
    )
  }
}

export default Example