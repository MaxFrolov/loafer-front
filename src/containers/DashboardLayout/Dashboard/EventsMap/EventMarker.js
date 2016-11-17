import React, { Component, PropTypes } from 'react'
// styles
import styles from './EventsMap.scss'
import classNames from 'classnames/bind'
// constants
const cx = classNames.bind(styles)
const marker = require('./marker.svg')

export default class EventMarker extends Component {
  static propTypes = {
    event: PropTypes.object,
    index: PropTypes.number
  }

  constructor(props) {
    super(...props)

    this.state = { hoverOn: false }
  }

  setMarkerVisible () {
    this.setState({ hoverOn: true })
  }

  setMarkerHidden () {
    this.setState({ hoverOn: false })
  }

  render() {
    const { event } = this.props
    const { hoverOn } = this.state
    return (
      <div style={{ position: 'absolute' }}>
        <div className={styles['map-marker-wrapper']} onMouseLeave={::this.setMarkerHidden}>
          <img src={marker} alt="marker" className={styles['map-marker']} onMouseEnter={::this.setMarkerVisible} />
          <div className={cx('panel panel-default', 'map-marker-panel', { 'panel-visible': hoverOn })}>
            <div className="panel-heading text-center">
              {event.title}
            </div>
            <div className="panel-body">
              <h5>{event.subtitle}</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
