"use client"

import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import { setProgress } from '../../data/loader'
// {progress, color, setProgress}: any
const TopLoading = () => {
  // const dispatch = useDispatch<any>()
  const data = useSelector((state: any) => state?.loader)
  const progress = useSelector((state: any) => state?.profile_me?.progress)
  return (
    <div style={{ margin: 0 }}>
      <LoadingBar
        color={data?.color}
        progress={progress}
      // onLoaderFinished={() => {dispatch(setProgress())}}
      />
      <br />
    </div>
  )
}

export default TopLoading