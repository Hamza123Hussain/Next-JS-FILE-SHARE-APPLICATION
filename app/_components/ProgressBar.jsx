import React from 'react'

const ProgressBar = ({ progress = 10 }) => {
  return (
    <div className=" bg-gray-600 rounded-full w-full">
      <div
        style={{ width: `${progress}% ` }}
        className=" rounded-full bg-blue-400 p-2"
      >
        {' '}
        File Uploaded : {Number(progress).toFixed(0)} %
      </div>
    </div>
  )
}

export default ProgressBar
