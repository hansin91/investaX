import {
  SET_PAGE,
  SET_PHOTOS,
  SET_LIMIT,
  SET_LOADING_PHOTOS,
  SET_ERROR,
  SET_TOTAL_PHOTO,
  SET_LOADING_MORE,
  FETCH_MORE,
  SET_LOAD_MORE,
  SET_DELETED,
  SET_DELETING,
  DELETE_PHOTOS_SUCCESS,
  SET_UPLOADING,
  SET_UPLOADED
} from './types'
import axios from 'axios'

export const setPhotos = (photos: Array<any>) => ({
  type: SET_PHOTOS,
  payload: photos
})

export const setLoadingPhotos = (value: boolean) => ({
  type: SET_LOADING_PHOTOS,
  payload: value
})

export const setLoadingMore = (value: boolean) => ({
  type: SET_LOADING_MORE,
  payload: value
})

export const setLoadMore = (value: boolean) => ({
  type: SET_LOAD_MORE,
  payload: value
})

export const setErrors = (error: string) => ({
  type: SET_ERROR,
  payload: error
})

export const setLimit = (limit: number) => ({
  type: SET_LIMIT,
  payload: limit
})

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page
})

export const setTotal = (total: number) =>({
  type: SET_TOTAL_PHOTO,
  payload: total
})

export const fetchMore = (photos: any) =>({
  type: FETCH_MORE,
  payload: photos
})

export const setDeleted = (value: boolean) => ({
  type: SET_DELETED,
  payload: value
})

export const setDeleting = (value: boolean) => ({
  type: SET_DELETING,
  payload: value
})

export const deletePhotosSucces = (photos: any) => ({
  type: DELETE_PHOTOS_SUCCESS,
  payload: photos
})

export const setUploading = (value: boolean) => ({
  type: SET_UPLOADING,
  payload: value
})

export const setUploaded = (value: boolean) => ({
  type: SET_UPLOADED,
  payload: value
})

export const uploadPhotos = (payload: any, dispatch: any) => {
  dispatch(setUploading(true))
  axios.put(process.env.REACT_APP_BASE_URL+ '/photos', payload)
  .then((response: any) => {
    dispatch(setUploaded(true))
  })
  .catch((err: any) => {
    const { response: { data: { message } } } = err
    dispatch(setErrors(message))
    dispatch(setUploaded(false))
  })
  .finally(() => dispatch(setUploading(false)) )
}

export const deletePhotos = (payload: any) => {
  const { list, dispatch, checkedPhotos } = payload
  dispatch(setDeleting(true))
  const deletePhotos = []
  for (const key in list) {
    deletePhotos.push({
      album: key,
      documents: list[key].join(", ")
    })
  }
  axios.delete(process.env.REACT_APP_BASE_URL+ '/photos', { data: deletePhotos })
  .then((response) => {
    dispatch(setDeleted(true))
    dispatch(deletePhotosSucces(checkedPhotos))
  })
  .catch((err) => {
    const { response: { data: { message } } } = err
    dispatch(setErrors(message))
    dispatch(setDeleted(false))
  })
  .finally(() => dispatch(setDeleting(false)))
}

export const loadPhotos = (payload: any) => {
  const { dispatch, page, limit, isLoadMore } = payload
  const data = {
    skip: (page - 1) * limit,
    limit
  }
  if (isLoadMore) {
    dispatch(setLoadingMore(true))
  } else {
    dispatch(setLoadingPhotos(true))
  }
  axios.post(process.env.REACT_APP_BASE_URL+ '/photos/list', data)
  .then((response: any) => {
    const { data: { documents } } = response
    if (isLoadMore) {
      dispatch(fetchMore(documents))
    } else {
      const { headers } = response
      dispatch(setTotal(Number(headers['content-length'])))
      dispatch(setPhotos(documents));
    }
  })
  .catch((err: any) => {
    const { response: { data: { message } } } = err
    dispatch(setErrors(message))
  })
  .finally(() => {
    if (isLoadMore) {
      dispatch(setLoadingMore(false))
    } else {
      dispatch(setLoadingPhotos(false))
    }
  })
}