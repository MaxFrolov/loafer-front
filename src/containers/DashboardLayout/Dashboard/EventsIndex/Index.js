import React, { Component } from 'react'
// components
import Helmet from 'react-helmet'
// constants
const avatarPlaceholder = require('./user.svg')

export default class EventsIndex extends Component {

  render () {
    const seedData = [
      { title: 'Нереальный заголовок' },
      { title: 'Мясной заголовок' },
      { title: 'Супер заголовок' },
      { title: 'Четкий заголовок' }
    ]
    return (
      <div className="row">
        <Helmet title="Events"/>
        <div className="col-sm-12">
          <div className="list-group">
            {seedData.map((item, idx) => (
              <div className="list-group-item" key={idx}>
                <div className="media-box">
                  <div className="pull-left text-center">
                    <img src={avatarPlaceholder} alt="avatar" className="media-box-object img-circle thumb64 mb-10"/>
                    <span>11:00</span>
                  </div>
                  <div className="media-box-body clearfix">
                    <p>
                      <span className="fs-16 fw-b">{item.title}</span>
                      <br />
                      <span>Еще какойто заголовок</span>
                    </p>
                    <p className="no-margin-bottom">
                      <span>"Loafer cafe"</span>
                      <br />
                      <span>Киев, ул. Ломоносова 5/А</span>
                      <br />
                      <span>Мест 3/5</span>
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
