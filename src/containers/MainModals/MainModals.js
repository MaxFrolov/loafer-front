import React, { Component } from 'react'
import { Modal, Terms } from 'containers'

export default class MainModals extends Component {

  render () {
    return (
      <div>
        <Modal type="terms" title="Terms and Conditions">
          <Terms />
        </Modal>
      </div>
    )
  }
}
