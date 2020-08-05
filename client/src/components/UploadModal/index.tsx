import './styles.scss'
import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UploadFile from '../UploadFile'
import { AppContext } from '../../store/context'
import { setUploaded } from '../../store/actions'
import Loading from '../Loading'

interface Props {
  show: boolean
  upload: any
  handleClose: any
}

function UploadModal({ show, upload, handleClose }: Props) {
  const { uploaded, dispatch, uploading } = useContext(AppContext)
  const [uploadFiles, setUploadFiles] = useState([]) as any
  const [album, setAlbum] = useState('')
  const onDrop = (acceptedFiles: any) => {
    const files = [...uploadFiles, ...acceptedFiles]
    setUploadFiles(files)
  }

  const closeModal = () => {
    handleClose()
    setUploadFiles([])
    setAlbum('')
  }

  const handleSelect = (e: any) => {
    setAlbum(e.target.value)
  }

  const handleSubmit = () => {
    upload({ files: uploadFiles, album })
  }

  useEffect(() => {
    if (uploaded) {
      closeModal()
      dispatch(setUploaded(false))
    }
  },[uploaded])

  return (
    <Modal show={show} onHide={closeModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Dropzone multiple accept="image/*" onDrop={onDrop}>
              {({getRootProps, getInputProps, isDragActive}) => (
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} />
                  {isDragActive ? "Drop it this" : 'Click me or drag a file to upload!'}
                </div>
              )}
            </Dropzone>
            {uploadFiles && uploadFiles.length < 0 && <div className="mt-3">No files selected</div>}
            <div className="images-preview mt-3">
              {uploadFiles && uploadFiles.length > 0 && uploadFiles.map((file: any, i: number) =>
              <UploadFile key={i} file={file} />)}
            </div>
            {uploading &&
            <div className="mt-4">
              <Loading />
            </div> }
          </div>
          {!uploading && (
            <div className="footer mt-4">
              <div className="option-album">
                <select onChange={handleSelect} className="form-control">
                  <option value="">Select album</option>
                  <option value="Travel">Travel</option>
                  <option value="Personal">Personal</option>
                  <option value="Food">Food</option>
                  <option value="Nature">Nature</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="btn-upload">
                <Button onClick={handleSubmit} disabled={uploadFiles.length > 0 && album ? false: true} type="button" variant="secondary">
                  <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
  )
}

export default UploadModal