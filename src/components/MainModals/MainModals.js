import React from 'react'
// components
import Modal from '../Modal/Modal'
import { ImageCrop } from 'components'

const MainModals = () => (
  <div>
    <Modal type="crop" title="Выберите размер фото">
      <ImageCrop />
    </Modal>
  </div>
)

export default MainModals
