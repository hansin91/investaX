import './styles.scss'
import React, { useState } from 'react'

interface IPhoto {
  album: string
  id: string
  name: string
  path: string
  raw: string
}

interface Props {
  photo: IPhoto
  checkPhoto: any
  deleteMode: boolean
  deletePhotos: any
}

function Photo({ deleteMode, deletePhotos, photo, checkPhoto }: Props) {
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState(true)
  const handleCheckPhoto = (e: any) => {
    setChecked(true)
    setShow(true)
    checkPhoto({ photo, checked: true })
  }

  const handleCheck = (e: any) => {
    const checked = e.target.checked
    setChecked(checked)
    if (checked) {
      setShow(true)
    } else {
      setShow(false)
    }
    checkPhoto({photo, checked})
  }

  return (
    <div style={{ opacity: deleteMode ? '0.5' : '' }}
      onClick={handleCheckPhoto}
      className={"photo" + (deletePhotos[photo.id] ? ' selected' : '' ) }>
      <div style={{ display: show ? 'block' : 'none' }} className="photo-checked">
        <label className="checkbox-container">
        <input onChange={handleCheck} type="checkbox" checked={checked}/>
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="photo-img-container">
        <div className="photo-img-wrapper">
          <img alt={photo.name} className="photo-img" src={photo.raw} />
        </div>
      </div>
      <div className="text-center photo-info">
        <div className="photo-title"><b>{photo.name}</b></div>
        <div className="photo-album"><b>{photo.album}</b></div>
      </div>
    </div>
  )
}

export default Photo