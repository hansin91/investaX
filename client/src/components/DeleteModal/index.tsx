import './styles.scss'
import React from 'react'
import { Modal } from 'react-bootstrap'
import Loading from '../Loading'

interface Props {
  isOpen: boolean
}

function DeleteModal({ isOpen }: Props) {
  return(
    <Modal show={isOpen} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting Photos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Loading />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteModal