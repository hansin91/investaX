import { SET_PAGE, SET_PHOTOS, SET_LIMIT, SET_LOADING_PHOTOS, SET_ERROR, SET_TOTAL_PHOTO, SET_LOADING_MORE, FETCH_MORE, SET_LOAD_MORE } from './types'
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
      console.log(response)
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