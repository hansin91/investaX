import './styles.scss'
import React, { useState, useEffect, useContext, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { AppContext } from '../../store/context'
import { loadPhotos, uploadPhotos, setDeleted, deletePhotos as submitDeletePhotos, setPage, setLimit, setLoadMore, setUploaded } from '../../store/actions'
import Loading from '../Loading'
import Photo from '../Photo'
import DeleteModal from '../DeleteModal'
import UploadModal from '../UploadModal'

function Photos() {
  const { total, deleted, uploaded, deleting, page, isLoadMore, loadingMore, photos, limit, loadingPhotos, dispatch } = useContext(AppContext)
  const [deleteMode, setDeleteMode] = useState(false)
  const [showUploadModal, setShowUpoadModal] = useState(false)
  const [checkedPhotos, setCheckedPhotos] = useState({}) as any
  const [deletePhotos, setDeletePhotos] =  useState({}) as any
  const [count, setCount] = useState(0)
  const handleSelect = (e: any) => {
    dispatch(setLimit(e.target.value))
    dispatch(setPage(1))
  }
  useEffect(() => {
    loadPhotos({ page, limit, dispatch, isLoadMore })
    if (uploaded) {
      dispatch(setUploaded(false))
    }
  }, [page, limit, uploaded])

  useEffect(() => {
    if (deleted) {
      setDeleteMode(false)
      setCheckedPhotos({})
      setDeletePhotos({})
      dispatch(setDeleted(false))
    }
  },[deleted])

  const checkPhoto = (payload: any) => {
    const { photo, checked } = payload
    checkedPhotos[photo.id] = checked
    if (!checked) {
      delete checkedPhotos[photo.id]
    }
    if (Object.keys(checkedPhotos).length > 0) {
      setDeleteMode(true)
    } else {
      setDeleteMode(false)
    }
    if (!deletePhotos[photo.album]) {
      if (checked) {
        deletePhotos[photo.album] = [photo.name]
      }
    } else {
      if (checked) {
        deletePhotos[photo.album].push(photo.name)
      }
    }
    if (!checked) {
      deletePhotos[photo.album] = deletePhotos[photo.album].filter((el: any) => el !== photo.name)
      if (!deletePhotos[photo.album].length) {
        delete deletePhotos[photo.album]
      }
    }
    setCount(Object.keys(checkedPhotos).length)
  }

  const loadMorePhotos = () => {
    const currentPage = page + 1
    dispatch(setPage(currentPage))
    dispatch(setLoadMore(true))
  }

  const handleDeletePhotos = () => {
    submitDeletePhotos({ checkedPhotos, list: deletePhotos, dispatch })
  }

  const openUploadModal = () => {
    setShowUpoadModal(true)
  }

  const closeUploadModal = () => {
    setShowUpoadModal(false)
  }

  const upload = (payload: any) => {
    const { files, album } = payload
    const formData = new FormData()
    formData.append('album', album)
    for (const file of files) {
      formData.append('documents', file)
    }
    uploadPhotos(formData, dispatch)
  }

  return (
    <Fragment>
      <div className="header">
        <div className="title">
          <h4>Photos</h4>
        </div>
        <div className="options">
          <div className="limit">
            {Object.keys(checkedPhotos).length > 0 && (
              <div onClick={handleDeletePhotos} className="delete-photo-button cursor-pointer">
               <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
               <span>{"Delete " + (count === 1 ? 'photo' : count + ' photos') }</span>
             </div>
            )}
            <div onClick={openUploadModal} className="upload-photos mr-3 cursor-pointer">
              <FontAwesomeIcon className="cursor-pointer mr-2" icon={faCloudUploadAlt} />
              <span>Upload</span>
            </div>
            <select onChange={handleSelect} className="form-control">
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
      {loadingPhotos && <div className="text-center"><Loading /></div>}
      {!loadingPhotos && (
        <div className="photos">
        {!loadingPhotos && photos && photos.map((photo: any) =>
          <Photo
            key={photo.id}
            photo={photo}
            deletePhotos={checkedPhotos}
            deleteMode={deleteMode}
            checkPhoto={checkPhoto}/>
        )}
       </div>
      )}
      {!loadingPhotos && photos && total && photos.length < total &&
        <div className="text-center load-more">
          {loadingMore && <Loading />}
          {!loadingMore &&<Button onClick={loadMorePhotos} type="button" color="primary">Load More</Button>}
        </div>
      }
      {deleting && <DeleteModal isOpen={true} />}
      <UploadModal upload={upload} show={showUploadModal} handleClose={closeUploadModal} />
    </Fragment>
  )
}

export default Photos