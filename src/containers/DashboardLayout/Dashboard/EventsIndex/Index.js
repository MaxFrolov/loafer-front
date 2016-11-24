import React, { Component, PropTypes } from 'react'
// components
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
// utils
import moment from 'moment'
// constants
const avatarPlaceholder = require('./user.svg')

@connect((state) => ({ events: state.reduxAsyncConnect.events }), null)
export default class EventsIndex extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired
  }

  render () {
    const { events } = this.props
    return (
      <div className="row">
        <Helmet title="Events"/>
        <div className="col-sm-12">
          <div className="list-group">
            {events.resources.map((item, idx) => (
              <div className="list-group-item" key={idx}>
                <div className="media-box">
                  <div className="pull-left text-center">
                    <img src={avatarPlaceholder} alt="avatar" className="media-box-object img-circle thumb64 mb-10"/>
                    <span>{moment(item.start_date).format('HH:mm')}</span>
                  </div>
                  <div className="media-box-body clearfix">
                    <p>
                      <span className="fs-16 fw-b">{item.title}</span>
                      <br />
                      <span>{item.subtitle}</span>
                    </p>
                    <p>{moment(item.start_date).format('D MMMM Y')}</p>
                    <p className="no-margin-bottom">
                      <span>"Loafer cafe"</span>
                      <br />
                      <span>{item.address}</span>
                      <br />
                      <span>Мест {item.members_count}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
