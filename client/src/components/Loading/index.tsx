import React from 'react'
import { Spinner } from 'reactstrap'

function Loading() {
  return (
    <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
  )
}

export default Loading