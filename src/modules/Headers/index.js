import React from 'react'
import http from 'superagent'

class Headers extends React.Component {
  static simulate (props) {
    return {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, sdch",
      "Accept-Language": "en-US,en;q=1",
      "Cache-Control": "no-cache",
      "Host": "httpbin.org",
      "Origin": "spoofer",
      "Pragma": "no-cache",
      "Referer": "module/?type=Headers",
      "User-Agent": "spoof"
    }
  }

  componentWillMount () {
    http
      .get('https://httpbin.org/get')
      .end((err, res) => {
        this.props.instaPush(res.body.headers)
      })
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

export default Headers
