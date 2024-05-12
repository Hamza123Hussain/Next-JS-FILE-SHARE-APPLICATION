'use client'
import { CloudUpload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ProgressBar from '../../../_components/ProgressBar.jsx'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import app from '../../../../FireBaseConfig'
import FilePreview from '../../../_components/FilePreview.jsx'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation.js'

const PAGE = () => {
  const [file, setfile] = useState({
    name: '',
    type: '',
    size: 0,
  })
  const Router = useRouter()
  const [PROGRESS, SETPROGRESS] = useState(0)
  const db = getFirestore(app)
  const { user } = useUser()
  const Storage = getStorage(app)
  const GETFILE = (file) => {
    if (file && file.size > 500000000) {
      toast.error('SIZE OF FILE IS GREATER THAN 5MB')
    } else {
      setfile(file)
      console.log(file)
    }
  }

  const UploadFile = (file) => {
    try {
      const storageref = ref(Storage, 'FILE_UPLOADED/' + file.name)
      const UploadTask = uploadBytesResumable(storageref, file, file.type)

      UploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        console.log('UPLOAD : ' + progress + '% done')
        SETPROGRESS(progress)
        progress == 100 &&
          getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
            console.log('DOWNLOADED FILE AVALIABLE AT :', downloadURL)

            saveinfo_firestore(file, downloadURL)
          })
      })
    } catch (error) {}
  }

  const saveinfo_firestore = async (file, URL) => {
    const docID = Date.now().toString()

    await setDoc(
      doc(
        db,
        'Users',
        user?.primaryEmailAddress.emailAddress,
        'UPLOADED FILES',
        docID
      ),
      {
        FileName: file?.name,
        FileSize: `${(file?.size / 1024 / 1024).toPrecision(1)} MB`,
        FileType: file?.type,
        Download: URL,
        Uploaded_BY: user?.primaryEmailAddress.emailAddress,
        User_Name: user?.fullName,
        RecipentName: '',
        id: Date(docID).toLocaleString(),
      }
    )

    console.log('DATA ON FIRESTORE')

    Router.push(`./File_Preview_and_Send/${docID}`)
  }

  return (
    <div className=" flex flex-col justify-center items-center m-5 gap-5">
      <p className=" p-4 text-sm sm:text-3xl  ">
        Start Uploading{' '}
        <span className=" text-green-900 brightness-200 text-lg sm:text-4xl">
          FILES AND SHARE THEM
        </span>{' '}
      </p>
      <label for="Upload_File">
        <div className=" flex flex-col justify-center items-center w-[90vw] sm:w-[60vw] sm:h-[50vh] bg-gray-200 border-2 border-dotted border-emerald-400">
          <CloudUpload size={60} />
          <p className=" p-5 sm:p-4 text-lg sm:text-2xl  ">
            Click to upload or{' '}
            <span className=" text-blue-900 brightness-200 text-xl sm:text-3xl">
              Drag and Drop
            </span>{' '}
          </p>
          <p className=" text-xs sm:text-sm text-gray-400 p-2 ">
            SVG, PNG, JPG OR PDF (MAX SIZE : 5MB)
          </p>
        </div>{' '}
        <input
          onChange={(e) => GETFILE(e.target.files[0])}
          type="file"
          id="Upload_File"
          className=" hidden"
        />
      </label>

      {file.size > 0 ? <FilePreview File={file} /> : ''}

      <button
        onClick={() => UploadFile(file)}
        disabled={file.name == ''}
        className=" disabled:bg-gray-700 disabled:opacity-20 rounded-full text-white bg-green-500 px-5 py-2"
      >
        {' '}
        Upload
      </button>

      {PROGRESS > 0 ? <ProgressBar progress={PROGRESS} /> : ''}
    </div>
  )
}

export default PAGE
