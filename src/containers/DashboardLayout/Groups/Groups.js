import React, { Component, PropTypes } from 'react'
// components
import Helmet from 'react-helmet'
import { asyncConnect } from 'redux-async-connect'
// constants
const avatarPlaceholder = require('../../../../static/user.svg')

@asyncConnect([
  { key: 'userGroups',
    promise: ({ helpers }) => helpers.client.get('groups/user_groups')
  }
])
export default class Groups extends Component {
  static propTypes = {
    userGroups: PropTypes.object.isRequired
  };

  render () {
    const { userGroups } = this.props
    return (
      <div>
        <Helmet title="Groups"/>
        <div className="container text-center">
          <h1>
            Groups
          </h1>
          <div className="panel panel-default">
            <div className="panel-body">
              {userGroups.resources.length && <div className="list-group">
                {userGroups.resources.map((group, idx) => (
                  <div className="list-group-item" key={idx}>
                    <div className="clearfix">
                      <div className="pull-left">
                        <h5>{group.title}</h5>
                      </div>
                      <div className="pull-right">
                        {group.group_participants.map((participant, index) => (
                          <img className="img-circle" src={participant.avatar_url || avatarPlaceholder}
                            alt="User avatar" key={index} style={{ maxWidth: '30px' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
