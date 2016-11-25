import React, { Component, PropTypes } from 'react'
// components
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// styles
import styles from './index.scss'
import classNames from 'classnames/bind'
// utils
import moment from 'moment'
// constants
const cx = classNames.bind(styles)
const avatarPlaceholder = require('../../../../../static/user.svg')

@connect((state) => ({ events: state.reduxAsyncConnect.events }), null)
export default class EventsIndex extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired
  };

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
                    <img className="img-rounded block-center img-responsive" role="presentation"
                      src={item.owner.avatar_url || avatarPlaceholder} style={{ maxWidth: '100px' }} />
                    <span>{moment(item.start_date).format('HH:mm')}</span>
                  </div>
                  <div className="media-box-body clearfix">
                    <div className={cx('label label-success', 'owner-label')}>Мое событие</div>
                    <p>
                      <span className="fs-16 fw-b">{item.title}</span>
                      <br />
                      <i>{item.subtitle}</i>
                    </p>
                    <p><span className="text-bold">Дата: </span>{moment(item.start_date).format('D MMMM Y')}</p>
                    <p className="no-margin-bottom">
                      <span className="text-bold">Адрес: </span><span>{item.address}</span>
                      <br />
                      <span className="text-bold">Количество мест: </span><span>{item.members_count}</span>
                    </p>
                    <div className="text-center mt-20">
                      <Link to={`/event/show/${item.id}`} className="btn btn-default">Детали события</Link>
                    </div>
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
