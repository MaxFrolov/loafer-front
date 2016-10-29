import React, { Component, PropTypes } from 'react'
// components
import { LaHeader } from 'components'

export default class LandingLayout extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render () {
    return (
      <div>
        <LaHeader />
        {this.props.children}
      </div>
    )
  }
}
