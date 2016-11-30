import React, { PropTypes } from 'react'
// utils
import moment from 'moment'
// styles
import styles from '../Header.scss'
import classNames from 'classnames/bind'
// constants
const cx = classNames.bind(styles)

const UpcomingEvents = ({ events }) => (
  <div>
    {events.resources.length && <div className={styles['upcoming-events-wrapper']}>
      <div className="container">
        <div className={styles['upcoming-events-header']}>
          <h3>Ближайшее событие</h3>
        </div>
        <div className="container-fluid mt-15">
          {events.resources.map((item, idx) => (
            <div className={cx('row text-center', 'upcoming-events-body')} key={idx}>
              <div className="col-sm-4">
                <i className="fa fa-user mr-10 fs-18"/>
                <span className="fs-16">{item.owner.full_name}</span>
              </div>
              <div className="col-sm-4">
                <i className="fa fa-map-marker mr-10 fs-18"/>
                <span className="fs-16">{item.address}</span>
              </div>
              <div className="col-sm-4">
                <i className="fa fa-calendar mr-10 fs-18"/>
                <span className="fs-16">{moment(item.start_date).format('D MMMM Y HH:mm')}</span>
              </div>
              <div className="col-sm-12">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>}
  </div>
)

UpcomingEvents.propTypes = {
  events: PropTypes.object.isRequired
}

export default UpcomingEvents
