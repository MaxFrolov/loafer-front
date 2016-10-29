import React, { Component, PropTypes } from 'react'
// components
import { InHeader } from 'components'

export default class InnerLayout extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render () {
    return (
      <div>
        <InHeader/>
        {this.props.children}
      </div>
    )
  }
}
