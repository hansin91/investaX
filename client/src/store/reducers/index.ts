import { SET_ERROR, SET_LIMIT, SET_SKIP, SET_LOADING_PHOTOS, SET_PHOTOS, SET_TOTAL_PHOTO } from '../actions/types'

interface IPhoto {
  id: string
  album: string
  name: string
  path: string
  raw: string
  total: number
}

export interface IAppState {
  readonly photos: Array<IPhoto>
  readonly error: string
  readonly loadingPhotos: boolean
  readonly skip: number
  readonly limit: number,
  readonly total: number
}

export const initialState: IAppState = {
  photos: [],
  error: '',
  loadingPhotos: false,
  skip: 0,
  limit: 25,
  total: 0
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOTAL_PHOTO:
      return {
        ...state,
        total: action.payload
      }
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      }
    case SET_SKIP:
      return {
        ...state,
        skip: action.payload
      }
    case SET_PHOTOS:
      return {
        ...state,
        photos: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_LOADING_PHOTOS:
      return {
        ...state,
        loadingPhotos: action.payload
      }
    default:
      return state
  }
}