import React, { createContext, useReducer } from 'react'
import reducer, { IAppState, initialState } from '../reducers'
export const AppContext = createContext<IAppState | any>(initialState)
export const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (<AppContext.Provider value={{
    photos: state.photos,
    error: state.error,
    loadingPhotos: state.loadingPhotos,
    skip: state.skip,
    limit: state.limit,
    total: state.total,
    dispatch
  }}>
    {children}
  </AppContext.Provider>)
}
