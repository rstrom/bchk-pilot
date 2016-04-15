import React from 'react'
import Radium from 'radium'

import Aspect from './Aspect'
import Button from './SimpleButton'

export default Radium((props) => {
  return (
    <div style={[styles.scenario]}>
      <div style={[styles.heading, { textAlign: 'center', color: 'rgb(85, 85, 119)' }]}>
        {props.heading}
      </div>
      {
        props.aspects.map((a) => {
          return (
            <Aspect
              modStyle={{flex: 1}}
              text={a.text}
              rating={a.rating}
              color={a.color}
              delta={a.change}
              deltaText={a.deltaText}
            />
          )
        })
      }
      <div style={[styles.row, { justifyContent: 'center'}]}>
        <Button
          modStyle={{marginTop: '1rem', flex: 1 }}
          text={props.preferText}
          handler={props.handler}
        />
      </div>
    </div>
  )
})

import gstyles from '../styles'
const styles = {
  ...gstyles,
  scenario: {
    ...gstyles.panel,
    ...gstyles.padding(1),
    ...gstyles.column,
    marginBottom: '1rem'
  }
}
