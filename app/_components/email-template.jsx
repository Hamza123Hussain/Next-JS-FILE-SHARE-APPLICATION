import * as React from 'react'

export const EmailTemplate = ({ response }) => (
  <div className=" flex flex-col justify-center items-center bg-black text-white">
    <div className=" flex gap-2 items-center">
      <h1>
        Hi{' '}
        {response.RecipentName ? response.RecipentName : response.RecipentEmail}
      </h1>
    </div>
    <div className=" flex-col flex justify-center items-center gap-2">
      <h2>FILE NAME : {response.FileName}</h2>
      <h2>FILE SIZE : {response.FileSize}</h2>
      <h2>FILE TYPE : {response.FileType}</h2>
      <h2>FILE SENT BY : {response.Username}</h2>
      <h2>Shared On: {new Date(response.Date_Sent_On).toLocaleString()}</h2>
    </div>

    <a
      href={response.URL}
      className=" bg-green-300 px-4 py-2 rounded-lg text-white"
    >
      {' '}
      DOWNLOAD THE FILE
    </a>

    <footer className="mt-8 text-center">
      <p className="text-sm ">© 2023 FileShare. All Rights Reserved.</p>{' '}
    </footer>
  </div>
)
