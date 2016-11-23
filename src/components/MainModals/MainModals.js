import React from 'react'
// components
import Modal from '../Modal/Modal'
import { ImageCrop } from 'components'

const MainModals = () => (
  <div>
    <Modal type="crop" title="Crop image">
      <ImageCrop />
    </Modal>
  </div>
)

export default MainModals
