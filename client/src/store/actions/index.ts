import { SET_SKIP, SET_PHOTOS, SET_LIMIT, SET_LOADING_PHOTOS, SET_ERROR, SET_TOTAL_PHOTO } from './types'
import axios from 'axios'

export const setPhotos = (photos: Array<any>) => ({
  type: SET_PHOTOS,
  payload: photos
})

export const setLoadingPhotos = (value: boolean) => ({
  type: SET_LOADING_PHOTOS,
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

export const setSkip = (skip: number) => ({
  type: SET_SKIP,
  payload: skip
})

export const setTotal = (total: number) =>({
  type: SET_TOTAL_PHOTO,
  payload: total
})

export const loadPhotos = (payload: any) => {
  const { dispatch, skip, limit } = payload
  const data = {
    skip,
    limit
  }
  dispatch(setLoadingPhotos(true))
  axios.post(process.env.REACT_APP_BASE_URL+ '/photos/list', data)
  .then((response: any) => {
    const { headers } = response
    dispatch(setTotal(Number(headers['content-length'])))
    const { data: { documents } } = response
    dispatch(setPhotos(documents));
  })
  .catch((err: any) => {
    const { response: { data: { message } } } = err
    dispatch(setErrors(message))
  })
  .finally(() => {
    dispatch(setLoadingPhotos(false))
  })
}