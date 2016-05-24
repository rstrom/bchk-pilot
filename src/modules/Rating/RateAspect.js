import React, { PropTypes } from 'react'
import Radium from 'radium'

import ColorScheme from '../global/services/colorScheme'
import Format from '../global/services/format'

import Slider from '../global/components/Slider'
import Button from '../global/components/Button'

@Radium
class RateAspect extends React.Component {
  render () {
    const {
      aspect,
      handleRating,
      handleConfirm,
      rateText,
      confirmText,
      minPoint,
      maxPoint,
      lowPoint,
      highPoint,
      lowWarn,
      highWarn
    } = this.props

    return (
      <div style={[styles.container]}>
        <div style={[styles.aspect]}>
          <div style={[styles.heading]}>
            <strong style={{float:'left'}}>
              {Format.capitalize(aspect.text)}
            </strong>
            {
              !isNaN(aspect.rating) &&
              <span style={{ float:'right', fontWeight: 'bold' }}>
                {Number(aspect.rating)}
              </span>
            }
          </div>
          <Slider
            color={aspect.color}
            position={aspect.rating}
            handleChange={handleRating}
            minPoint={minPoint}
            maxPoint={maxPoint}
            lowPoint={lowPoint}
            highPoint={highPoint}
          />
        </div>
        {
          !isNaN(aspect.rating)
          &&
          <div style={[styles.button]}>
            <Button
              text={confirmText}
              handler={() => handleConfirm(aspect)}
            />
          </div>
          ||
          <svg
            style={{
              width: '100%',
              height: '4rem'
            }}
            viewBox="0 0 100 10"
          >
            <path
              stroke="#559"
              strokeWidth="0.25"
              fill="#fff"
              d="
                M 50,0
                l -1,1
                l 1, -1
                l 1, 1
                l -1, -1
                c 0,10 15,-5 19,5
              "
            >
            </path>
            <text
              x="70"
              y="10"
              dy="-2"
              fontSize="3"
              fill="#559"
              textAnchor="middle"
            >
              {rateText}
            </text>
          </svg>
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
    ...gstyles.padding(2),
    backgroundColor: '#fff',
    userSelect: 'none',
    overflow: 'auto',
    zoom: 1
  },
  heading: {
    marginBottom: '1rem',
    overflow: 'auto',
    zoom: 1
  },
  button: {
    marginTop: '2rem',
    float: 'right'
  }
}

export default RateAspect
