import React from 'react'

const FilePreview = ({ File }) => {
  return (
    <div className=" text-xs sm:text-lg flex gap-2 items-center justify-center text-neutral-900 border-2 border-green-400 border-dotted p-5">
      <img width={50} src="folder.png" alt="" />
      <p className=" uppercase">{File.name}</p>{' '}
      <p className="  uppercase">{File.type}</p>
      <p className=" uppercase">
        {(File.size / 1024 / 1024).toPrecision(1)} MB
      </p>
    </div>
  )
}

export default FilePreview
