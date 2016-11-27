import React, { Component, PropTypes } from 'react'
// components
import { InHeader } from 'components'

export default class InnerLayout extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render () {
    return (
      <div style={{ background: '#f3f3f3', height: '100%' }}>
        <InHeader/>
        {this.props.children}
      </div>
    )
  }
}
