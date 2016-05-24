import React from 'react'
import Radium from 'radium'
import ZoomBar from './ZoomBar'
import Format from '../services/format'

@Radium
class Aspect extends React.Component {
  static defaultProps = {
    text: 'Aspect text',
    rating: 20,
    delta: 4,
    deltaText: '',
    color: '#f77'
  }

  render () {
    const {
      text,
      rating,
      delta,
      deltaText,
      color,
      modStyle
    } = this.props

    return (
      <div style={[styles.main, modStyle]}>
        <div style={[styles.blurb]}>
          <span style={[styles.rating]}>
            {Number(rating) + Number(delta)}
          </span>
          <p style={[styles.text]}>
            {Format.capitalize(text)}
            <span>
              <b>{` ${deltaText} `}</b>
              {
                delta !== 0 &&
                <span style={[styles.delta]}>
                {
                  delta > 0 ?
                  '+' + String(delta) :
                  String(delta)
                }
                </span>
              }
            </span>
          </p>
        </div>
        <ZoomBar
          position={rating}
          color={color}
          delta={delta}
        />
      </div>
    )
  }
}

const styles = {
  main: {
    boxSizing: 'border-box'
  },
  blurb: {
    marginBottom: 15
  },
  text: {
    fontSize: '1.25rem',
    fontStyle: 'italic'
  },
  rating: {
    float: 'right',
    paddingTop: 2,
    paddingRight: 5,
    paddingBottom: 15,
    paddingLeft: 15,
    fontWeight: 'bold'
  },
  delta: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 3,
    paddingRight: 5,
    paddingBottom: 3,
    paddingLeft: 5,
    background: '#000',
    borderRadius: 30
  }
}

export default Aspect
