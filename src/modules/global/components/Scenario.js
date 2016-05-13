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
              modStyle={{
                flexGrow: 1,
                flexBasis: 'auto',
                msFlex: '1 auto'
              }}
              text={a.text}
              rating={a.rating}
              color={a.color}
              delta={a.change}
              deltaText={a.deltaText}
            />
          )
        })
      }
      <div style={[styles.row, {
        justifyContent: 'center',
        flexBasis: 'auto',
        msFlex: '1 auto'
      }]}>
        <Button
          modStyle={{
            marginTop: '1rem',
            flexGrow: 1,
            flexBasis: 'auto',
            msFlex: '1 auto'
          }}
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
    marginBottom: '1rem',
    justifyContent: 'space-between'
  }
}
