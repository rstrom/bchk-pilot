import React, { PropTypes } from 'react'
import Radium from 'radium'

import ColorScheme from '../global/services/colorScheme'
import Format from '../global/services/format'

import DeltaBar from '../global/components/DeltaBar'
import Button from '../global/components/Button'

@Radium
class RatedAspects extends React.Component {
  constructor () {
    super()
  }

  render () {
    const { aspects, editRating, editText, editInstruct } = this.props
    return (
      <div style={[styles.container]}>
        <p>{editInstruct}</p>
        {
          aspects.map((a, i) => (
            <div
              key={i}
              style={[styles.aspect]}
              onClick={() => editRating(a.index)}
            >
              <div style={[styles.info]}>
                <div style={[styles.heading]}>
                  {Format.capitalize(a.text)}
                </div>
                <div style={[styles.rating]}>
                  {Number(a.rating)}
                </div>
                <DeltaBar
                  position={Number(a.rating)}
                  min={0}
                  max={100}
                  color={a.color}
                  delta={0}
                />
              </div>
              <div style={[styles.button]}>
                <Button
                  text={editText}
                  modStyle={{ fontSize: '0.75em' }}
                />
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

import gstyles from '../global/styles'
const styles = {
  ...gstyles,
  container: {
    ...gstyles.panel,
    ...gstyles.padding(1),
    width: '100%',
    marginTop: '2rem',
    overflow: 'auto',
    zoom: 1
  },
  aspect: {
    marginTop: 15,
    cursor: 'pointer',
    opacity: 0.6,
    display: 'flex',
    ':hover': {
      opacity: 1
    }
  },
  info: {
    flex: 1,
    marginRight: '1rem'
  },
  heading: {
    float: 'left'
  },
  rating: {
    float: 'right'
  },
  button: {
    display: 'inline-block',
    flex: 1,
    marginLeft: 30
  }
}

export default RatedAspects
