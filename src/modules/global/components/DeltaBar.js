import React from 'react'
import Radium from 'radium'

import colorLib from 'color'

const Color = (c) => {
  try {
    colorLib(c)
  } catch (e) {
    console.log(e)
    return colorLib('#fff')
  }
  return colorLib(c)
}

const RightDiff = ({ min, position, delta, height, top, color, step }) => {
  const dynamicDelta = step * delta
  return (
    <g>
      <defs>
        <clipPath id={'diff' + String(position)}>
            <rect
              x={Math.abs(min - position)}
              y={0}
              width={dynamicDelta}
              height={top}
            ></rect>
        </clipPath>
      </defs>
      <rect
        x={Math.abs(min - position)}
        y={top}
        width={dynamicDelta}
        height={height}
        fill={Color(color).darken(.5).rgbString()}
        stroke="#fff"
        strokeWidth="0.25"
      ></rect>
      <rect
        fill={'#000'}
        x={Math.abs(min - position)}
        y={5}
        width={Math.max(0, dynamicDelta - 4)}
        height={2}
      ></rect>
      <path
        clipPath={`url(#${'diff' + String(position)})`}
        fill={'#000'}
        d={`
          M ${Math.abs(min - position) + dynamicDelta - 4},4
          l 4,2
          l -4,2
          Z
        `}
      ></path>
    </g>
  )
}

const LeftDiff = ({ min, position, delta, height, top, color, step }) => {
  const dynamicDelta = step * -delta
  return (
    <g>
      <defs>
        <clipPath id={'diff' + String(position)}>
            <rect
              x={Math.abs(min - position) + delta}
              y={0}
              width={dynamicDelta}
              height={top}
            ></rect>
        </clipPath>
      </defs>
      <rect
        x={Math.abs(min - position) - dynamicDelta}
        y={top}
        width={dynamicDelta}
        height={height}
        fill={Color(color).lighten(.15).rgbString()}
        stroke="#fff"
        strokeWidth="0.25"
      ></rect>
      <rect
        fill={'#000'}
        x={Math.abs(min - position) + delta + 4}
        y={5}
        width={Math.max(0, dynamicDelta - 4)}
        height={2}
      ></rect>
      <path
        clipPath={`url(#${'diff' + String(position)})`}
        fill={'#000'}
        d={`
          M ${Math.abs(min - position) + 4 - dynamicDelta},4
          l -4,2
          l 4,2
          Z
        `}
      ></path>
    </g>
  )
}

@Radium
class DeltaBar extends React.Component {
  static defaultProps = {
    position: 42,
    delta: 10,
    height: 8,
    top: 10,
    color: '#f44',
    min: 0,
    max: 100,
    step: 1
  }

  render () {
    const {
      position,
      min,
      max,
      delta,
      height,
      top,
      color,
      step,
      modStyle
    } = this.props

    const range = max - min
    const sideOffset = 5

    return (
      <svg
        viewBox={`0 0 ${range + sideOffset * 2} 36`}
        style={[styles.svg]}
      >
        <rect
          y={0}
          width={range + sideOffset * 2}
          height={36}
          fill="#fff"
        >
        </rect>
        <g transform={`translate(${sideOffset},${top})`}>
          <rect
            y={0}
            width={range}
            height={height}
            fill="#eee"
            stroke="#fff"
            strokeWidth="0.25"
          >
          </rect>
          <rect
            y={0}
            width={Math.abs(min - position)}
            height={height}
            fill={color}
            stroke="#fff"
            strokeWidth="0.25"
          >
          </rect>
          {
            _.range(min, max + 1)
              .filter((n) => n % 10 === 0)
              .map((n) => (
                <g key={n}>
                  <rect
                    x={Math.abs(min - n)}
                    y={9}
                    width={0.2}
                    height={1}
                    style={[styles.tick]}
                  ></rect>
                  <text
                    x={Math.abs(min - n)}
                    y={14}
                    style={[styles.text]}
                  >{Number(n)}</text>
                </g>
              ))
          }
        </g>
        <g transform={`translate(${sideOffset},0)`}>
        {
          delta > 0 && (
            <RightDiff { ...{
              min,
              position,
              delta,
              height,
              top,
              color,
              step
            }} />
          )
        }
        {
          delta < 0 && (
            <LeftDiff { ...{
              min,
              position,
              delta,
              height,
              top,
              color,
              step
            }} />
          )
        }
        </g>
      </svg>
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

export default DeltaBar
