import React from 'react'
import Radium from 'radium'
import { Motion, spring, presets } from 'react-motion'
import DeltaBar from './DeltaBar'

@Radium
class ZoomBar extends React.Component {
  static defaultProps = {
    position: 42,
    delta: 10,
    color: '#f44',
    min: 0,
    max: 100,
    top: 10,
    height: 8
  }

  constructor (props) {
    super(props)
    this.state = { hover: 0 }
  }

  render () {
    const {
      position,
      min,
      max,
      delta,
      color,
      top,
      height
    } = this.props

    const range = max - min
    const sideOffset = 5

    return (
      <div
        onMouseEnter={() => { this.setState({ hover: 2 })}}
        onMouseLeave={() => { this.setState({ hover: 0 })}}
      >
        <Motion
          key={position + color + delta}
          defaultStyle={{
            val: 512,
          }}
          style={{
            val: spring(this.state.hover, presets.noWobble)
          }}
        >
        {
          ({ val }) => {
            const dynamic = val > 1 ?
              {
                xOffset: Math.min(8 - position, 0),
                yOffset: -9,
                scale: 2,
                step: (512 - val) / 512
              } : {
                xOffset: Math.min(8 - position, 0) * val,
                yOffset: -9 * val,
                scale: val + 1,
                step: (512 - val) / 512
              }

            return (
              <svg
                viewBox={`0 0 100 36`}
                style={{ width: `${100}%` }}
              >
                <defs>
                  <clipPath id={'mag' + String(position)}>
                    <circle
                      cx={position}
                      cy={top + 0.5 * height}
                      r={12}
                    />
                  </clipPath>
                </defs>
                <g>
                  <DeltaBar { ...{
                    position,
                    min,
                    max,
                    delta,
                    color,
                    top,
                    height
                  } } />
                </g>
                {
                  delta !== 0 &&
                  <g
                    clipPath={`url(#${'mag' + String(position)})`}
                    transform={`
                      translate(${dynamic.xOffset},${dynamic.yOffset}),
                      scale(${dynamic.scale})
                    `}
                  >
                    <DeltaBar { ...{
                      position,
                      min,
                      max,
                      delta,
                      color,
                      top,
                      height,
                      step: dynamic.step
                    } } />
                    <circle
                      cx={position}
                      cy={top + 0.5 * height}
                      r={12}
                      fill={'none'}
                      stroke={'#000'}
                      strokeWidth={0.5}
                    />
                  </g>
                }
              </svg>
            )
          }
        }
        </Motion>
      </div>
    )
  }
}

const styles = {
  svg: {
    width: '100%',
    height: 'auto'
  },
  tick: {
    fill: '#000'
  },
  text: {
    fontSize: '.25rem',
    textAnchor: 'middle',
    userSelect: 'none'
  }
}

export default ZoomBar
