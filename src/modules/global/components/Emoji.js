import React from 'react'
import ReactEmoji from 'react-emoji'

export default class Emoji extends React.Component {
  render () {
    return <div>{ ReactEmoji.emojify(this.props.character) }</div>
  }
}