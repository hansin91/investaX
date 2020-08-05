import {
  SET_LOADING_MORE,
  SET_ERROR,
  SET_LIMIT,
  SET_PAGE,
  SET_LOADING_PHOTOS,
  SET_PHOTOS,
  SET_TOTAL_PHOTO,
  SET_LOAD_MORE,
  FETCH_MORE,
  SET_DELETED,
  SET_DELETING,
  DELETE_PHOTOS_SUCCESS,
  SET_UPLOADED,
  SET_UPLOADING,
} from '../actions/types'

interface IPhoto {
  id: string
  album: string
  name: string
  path: string
  raw: string
}

export interface IAppState {
  readonly photos: Array<IPhoto>
  readonly error: string
  readonly loadingPhotos: boolean
  readonly loadingMore: boolean
  readonly loadMore: boolean
  readonly page: number
  readonly limit: number
  readonly total: number
  readonly deleting: boolean
  readonly deleted: boolean
  readonly uploading: boolean
  readonly uploaded: boolean
}

export const initialState: IAppState = {
  photos: [],
  error: '',
  loadingPhotos: false,
  loadingMore: false,
  loadMore: false,
  page: 1,
  limit: 25,
  total: 0,
  deleted: false,
  deleting: false,
  uploading: false,
  uploaded: false
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_UPLOADED:
      return {
        ...state,
        uploaded: action.payload
      }
    case SET_UPLOADING:
      return {
        ...state,
        uploading: action.payload
      }
    case DELETE_PHOTOS_SUCCESS:
      const newPhotoList = [...state.photos].filter((photo) => !action.payload[photo.id])
      return {
        ...state,
        photos: newPhotoList
      }
    case SET_DELETED:
      return {
        ...state,
        deleted: action.payload
      }
    case SET_DELETING:
      return {
        ...state,
        deleting: action.payload
      }
    case SET_LOADING_MORE:
      return {
        ...state,
        loadingMore: action.payload
      }
    case SET_LOAD_MORE:
      return {
        ...state,
        loadMore: action.payload
      }
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
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case SET_PHOTOS:
      return {
        ...state,
        photos: action.payload
      }
    case FETCH_MORE:
      return {
        ...state,
        photos: [...state.photos, ...action.payload]
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