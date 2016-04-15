import React from 'react'

export default function (Target) {
  if (!Target.defaultProps) Target.defaultProps = {}
  for (let p in Target.propTypes) {
    let noError = false
    try {
      Target.propTypes[p]()
      noError = true
    } catch (e) {} finally {
      if (noError && !Target.defaultProps[p]) {
        Target.defaultProps[p] = Target.propTypes[p]()
          .simulate()
      }
    }
  }

  return class extends React.Component {
    static propTypes = Target.propTypes
    static defaultProps = Target.defaultProps
    render () {
      return <Target {...this.props} />
    }
  }
}