import React, { createContext, useReducer } from 'react'
import reducer, { IAppState, initialState } from '../reducers'
export const AppContext = createContext<IAppState | any>(initialState)
export const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (<AppContext.Provider value={{
    photos: state.photos,
    error: state.error,
    loadingPhotos: state.loadingPhotos,
    loadingMore: state.loadingMore,
    deleted: state.deleted,
    deleting: state.deleting,
    uploading: state.uploading,
    uploaded: state.uploaded,
    page: state.page,
    limit: state.limit,
    total: state.total,
    isLoadMore: state.loadMore,
    dispatch
  }}>
    {children}
  </AppContext.Provider>)
}
