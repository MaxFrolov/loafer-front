import React, { Component, PropTypes } from 'react'
// components
import Helmet from 'react-helmet'

export default class Home extends Component {
  static propTypes = {
    paneLoaded: PropTypes.bool
  };

  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render () {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="container text-center">
          <h1>
            Loafer, connects people.
          </h1>
        </div>
      </div>
    )
  }
}
