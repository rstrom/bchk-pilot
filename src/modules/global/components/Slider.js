import React, { PropTypes } from 'react'
import _ from 'lodash'
import Radium from 'radium'

import smiley from '../images/smiley.svg'
import frowny from '../images/frowny.svg'

@Radium
class Handle extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    position: PropTypes.number
  }

  render () {
    let { width, height, position } = this.props
    return (
      <path
        style={[styles.handle]}
        strokeWidth="0.25"
        stroke="#000"
        strokeOpacity="0.5"
        fill="#fff"
        fillOpacity="0.9"
        d={
          `M ${position- (width/2)},0 
          l ${width},0 l 0,${height/2} 
          l -${width/2},${height/2} 
          l -${width/2},-${height/2} 
          Z`
        }
      ></path>
    )
  }
}

@Radium
class Slider extends React.Component {
  static defaultProps = {
    position: 50,
    height: 6,
    top: 10,
    color: '#f44',
    min: 0,
    max: 100,
    minPoint: 'worst possible',
    maxPoint: 'best possible',
    lowPoint: 'extremely low',
    highPoint: 'extremely high'
  }

  constructor (props) {
    super(props)
    this.state = {
      position: props.position,
      movable: false
    }
    this.mouseUp = this.handleMouseUp.bind(this)
    this.mouseMove = this.handleMouseMove.bind(this)
    this.move.bind(this)
    window.addEventListener('mouseup', this.mouseUp)
    window.addEventListener('mousemove', this.mouseMove)
  }

  move (position) {
    const { handleChange, min, max } = this.props
    handleChange(Math.max(min, Math.min(max, Math.floor(position))))
  }

  handleMouseDown (event) {
    const { min, max } = this.props
    this.setState({ movable: true })
    let { clientX } = event
    let { left, width } = this._bar.getBoundingClientRect()
    this.move(((max - min) * (clientX - left) / width) + min)
  }

  handleMouseUp (event) {
    this.setState({ movable: false })
  }

  handleMouseMove (event) {
    const { min, max } = this.props
    let { clientX } = event
    let { left, width } = this._bar.getBoundingClientRect()
    if (this.state.movable) this.move(((max - min) * (clientX - left) / width) + min)
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.mouseUp)
    window.removeEventListener('mousemove', this.mouseMove)
  }

  render () {
    const {
      position,
      delta,
      height,
      top,
      color,
      modStyle,
      min,
      max,
      minPoint,
      maxPoint,
      lowPoint,
      highPoint
    } = this.props

    const range = max - min

    const sideOffset = 5

    return (
      <svg
        viewBox={`0 0 ${range + sideOffset * 2} 28`}
        style={[styles.svg, modStyle]}
        onMouseDown={this.handleMouseDown.bind(this)}
      >
        <g transform={`translate(${sideOffset},${top})`}>
          <rect 
            y={0}
            width={range}
            height={height}
            fill="#eee"
            stroke="#fff"
            strokeWidth="0.25"
            ref={(c) => this._bar = c}
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
                    y={height + 1}
                    width={0.1}
                    height={1}
                    style={[styles.tick]}
                  ></rect>
                  <text
                    x={Math.abs(min - n)}
                    y={height + 5}
                    style={[styles.text]}
                  >{Number(n)}</text>
                </g>
              ))
          }
        </g>
        <g transform={`translate(0,5)`}>
          <rect
            x={sideOffset}
            y={1}
            width={0.1}
            height={height + 5}
            style={[styles.tick]}
          ></rect>
          <rect
            x={sideOffset}
            y={1}
            width={13}
            height={0.1}
            style={[styles.tick]}
          ></rect>
          <rect
            x={range + sideOffset - 13}
            y={1}
            width={13}
            height={0.1}
            style={[styles.tick]}
          ></rect>
          <rect
            x={range + sideOffset}
            y={1}
            width={0.1}
            height={height + 5}
            style={[styles.tick]}
          ></rect>
          <text
            x={sideOffset + 1}
            y={0}
            style={[styles.labelLeft]}
          >{minPoint}</text>
          <text
            x={range + sideOffset - 1}
            y={0}
            style={[styles.labelRight]}
          >{maxPoint}</text>
        </g>
        <g transform={`translate(0,${top})`}>
          <rect
            x={sideOffset + range * .25}
            y={0}
            width={0.1}
            height={height + 6}
            style={[styles.tick]}
          ></rect>
          <rect
            x={sideOffset + range * .75}
            y={0}
            width={0.1}
            height={height + 6}
            style={[styles.tick]}
          ></rect>
          <text
            x={sideOffset + range * .25 + 1}
            y={height + 9}
            style={[styles.labelMiddle]}
          >{lowPoint}</text>
          <text
            x={sideOffset + range * .75 - 1}
            y={height + 9}
            style={[styles.labelMiddle]}
          >{highPoint}</text>
        </g>
        <g transform={`translate(${sideOffset},${top})`}>
          <Handle width={height} height={height} position={Math.abs(min - position)} />
        </g>
      </svg>
    )
  }
}

const styles = {
  svg: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer'
  },
  handle: {
    cursor: 'pointer'
  },
  tick: {
    fill: '#333' 
  },
  text: {
    fontSize: '.16rem',
    textAnchor: 'middle',
    userSelect: 'none'
  },
  labelLeft: {
    fontSize: '.16rem',
    fontStyle: 'italic', 
    textAnchor: 'start',
    userSelect: 'none'
  },
  labelMiddle: {
    fontSize: '.16rem',
    fontStyle: 'italic', 
    textAnchor: 'middle',
    userSelect: 'none'
  },
  labelRight: {
    fontSize: '.16rem',
    fontStyle: 'italic', 
    textAnchor: 'end',
    userSelect: 'none'
  },
  labelBottomLeft: {
    fontSize: '.16rem',
    fontStyle: 'italic',
    textAnchor: 'start',
    dominantBaseline: 'hanging',
    userSelect: 'none'
  },
  labelBottomRight: {
    fontSize: '.16rem',
    fontStyle: 'italic', 
    textAnchor: 'end',
    dominantBaseline: 'hanging',
    userSelect: 'none'
  }
}

export default Slider