import React, { Component, PropTypes } from 'react'
import { Modal as BootstrapModal } from 'react-bootstrap'
import { hide } from 'redux/modules/modals'
import { connect } from 'react-redux'

@connect((store) => ({ modals: store.modals }), { hide })
export default class Modal extends Component {
  static propTypes = {
    // state
    modals: PropTypes.object.isRequired,
    // actions
    hide: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    // props
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.object
  };

  render () {
    const { modals, className, hide, size, title, type, children } = this.props
    const isVisible = modals[type]
    return (
      <BootstrapModal
        show={isVisible}
        onHide={() => hide(type)}
        dialogClassName={className}
        bsSize={size}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>
            <span>{title}</span>
          </BootstrapModal.Title>

        </BootstrapModal.Header>
        <BootstrapModal.Body>
          {children}
        </BootstrapModal.Body>
      </BootstrapModal>
    )
  }
}
