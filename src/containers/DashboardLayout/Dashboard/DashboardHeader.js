import React from 'react'
// components
import { Link } from 'react-router'
// styles
import styles from './dashboard.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const DashboardHeader = () => (
  <div className="col-sm-12">
    <div className={cx('container-fluid', 'dashboard-search-block')}>
      <div className="row">
        <div className="col-sm-6">
          <div className="input-group m-b">
            <input type="text" className="form-control" placeholder="Введите название события или категорию..." />
            <span className="input-group-addon"><i className="fa fa-search" /></span>
          </div>
        </div>
        <div className="col-sm-3 pt-5">
          <span className="fs-18">В пределах 3 км. Киев (УКР)</span>
        </div>
        <div className="col-sm-3 text-center">
          <Link to="/dashboard/map" activeClassName="active">
            <button className="btn btn-cta-grey">Карта</button>
          </Link>
          <Link to="/dashboard/events" activeClassName="active">
            <button className="btn btn-cta-grey">Список</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default DashboardHeader
