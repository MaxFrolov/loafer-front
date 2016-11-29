import React, { Component, PropTypes } from 'react'
// components
import { InHeader } from 'components'
import { asyncConnect } from 'redux-async-connect'

@asyncConnect([
  { key: 'participant_events',
    promise: ({ helpers }) => helpers.client.get('events/participant_events')
  }
])
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
