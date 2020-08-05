import './styles.scss'
import React, { useState, useEffect, useContext, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import { AppContext } from '../../store/context'
import { loadPhotos, setPage, setLimit, setLoadMore } from '../../store/actions'
import Loading from '../Loading'
import Photo from '../Photo'

function Photos() {
  let checkedPhotos = {} as any
  const { total, page, isLoadMore, photos, limit, loadingPhotos, dispatch } = useContext(AppContext)
  const [deleteMode, setDeleteMode] = useState(false)
  const [deletePhotos] = useState(checkedPhotos)
  const [count, setCount] = useState(0)
  const handleSelect = (e: any) => {
    dispatch(setLimit(e.target.value))
    dispatch(setPage(1))
  }
  useEffect(() => {
    loadPhotos({ page, limit, dispatch, isLoadMore })
  }, [page, limit])

  const checkPhoto = (payload: any) => {
    const { photo, checked } = payload
    deletePhotos[photo.id] = checked
    if (!checked) {
      delete deletePhotos[photo.id]
    }
    if (Object.keys(deletePhotos).length > 0) {
      setDeleteMode(true)
    } else {
      setDeleteMode(false)
    }
    setCount(Object.keys(deletePhotos).length)
  }

  const loadMorePhotos = () => {
    const currentPage = page + 1
    dispatch(setPage(currentPage))
    dispatch(setLoadMore(true))
  }

  return (
    <Fragment>
      <div className="header">
        <div className="title">
          <h4>Photos</h4>
        </div>
        <div className="options">
          <div className="limit">
            {Object.keys(deletePhotos).length > 0 && (
              <div className="delete-photo-button cursor-pointer">
               <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
               <span>{"Delete " + (count === 1 ? 'photo' : count + ' photos') }</span>
             </div>
            )}
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
            deletePhotos={deletePhotos}
            deleteMode={deleteMode}
            checkPhoto={checkPhoto}/>
        )}
       </div>
      )}
      {!loadingPhotos && photos && total && photos.length < total &&
        <div className="text-center load-more">
          <Button onClick={loadMorePhotos} type="button" color="primary">Load More</Button>
        </div>
      }
    </Fragment>
  )
}

export default Photos