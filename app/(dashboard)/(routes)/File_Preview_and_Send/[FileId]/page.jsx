'use client'
import React, { useEffect, useRef, useState } from 'react'
import app from '../../../../../FireBaseConfig'
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  updateDoc,
} from 'firebase/firestore'
import { Copy, MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'

const Email_Page = ({ params }) => {
  const db = getFirestore(app)
  const { user } = useUser()
  const [filedata, setdata] = useState({})
  const [recipentname, setrecipentname] = useState('')
  const [addname, SETaddname] = useState(false)
  const [recipentemail, setemail] = useState('')
  const [loading, setloading] = useState(true)
  const router = useRouter()
  const inputRef = useRef(null)

  const copyText = () => {
    inputRef.current.select()
    navigator.clipboard
      .writeText(inputRef.current.value)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((err) => {
        console.error('Error copying text: ', err)
      })
  }
  const GetData = async () => {
    try {
      const docRef = doc(
        collection(
          db,
          'Users',
          user?.primaryEmailAddress.emailAddress,
          'UPLOADED FILES'
        ),
        params.FileId
      ) // Corrected collection reference
      const snapshot = await getDoc(docRef)

      if (snapshot.exists()) {
        setdata(snapshot.data())
        console.log('DATA IN THE DOC', filedata)
        setloading(false)
      } else {
        console.log('NO DOC FOUND')
      }
    } catch (error) {
      console.error('Error getting document:', error)
    }
  }

  useEffect(() => {
    console.log(params?.FileId)
    GetData()
  }, [params?.FileId])

  const saverecipentname = async () => {
    const docRef = doc(
      collection(
        db,
        'Users',
        user?.primaryEmailAddress.emailAddress,
        'UPLOADED FILES'
      ),
      params.FileId
    ) // Corrected collection reference

    await updateDoc(docRef, {
      RecipentName: recipentname,
    })

    toast.success('Recipent Name Added')
  }

  const saverecipentemail = async () => {
    const docRef = doc(
      collection(
        db,
        'Users',
        user?.primaryEmailAddress.emailAddress,
        'UPLOADED FILES'
      ),
      params.FileId
    ) // Corrected collection reference

    await updateDoc(docRef, {
      RecipentEmail: recipentemail,
    })

    toast.success('Recipent Email Added')
  }
  console.log(recipentemail)
  const postData = async () => {
    const data = {
      Emailsentby: user?.primaryEmailAddress.emailAddress,
      Username: user?.fullName,
      RecipentEmail: recipentemail,
      FileType: filedata.FileType,
      FileSize: filedata.FileSize,
      FileName: filedata.FileName,
      RecipentName: recipentname,
      Date_Sent_On: Date.now(),
      URL: filedata.Download,
    }

    if (data.RecipentEmail == '') {
      toast.error('ENTER Recipent Email')
    } else {
      try {
        const response = await axios.post('/api/send', data)
        // Handle successful response
        // console.log('Response:', response.data)
        toast.success('EMAIL HAS BEEN SENT')
        return response.data // Return the response data if needed
      } catch (error) {
        // Handle error
        console.error('Error:', error)
        throw error // Rethrow the error to handle it in the component
      }
    }
  }
  // console.log(filedata.Download)

  if (loading) {
    return (
      <div className=" justify-center items-center flex gap-2   min-h-screen w-full bg-gray-200">
        <span className="loader"></span>
        <span className="loader"></span>
        <span className="loader"></span>
        <span className="loader"></span>
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <div className=" py-1 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto ">
      <div className="flex flex-col justify-start items-start w-full ">
        <div
          onClick={() => {
            router.back()
          }}
          className="flex justify-start items-center gap-2 my-5 cursor-pointer"
        >
          <div className=" border-2 px-2 py-1">
            {' '}
            <MoveLeft />
          </div>
          <p className="text-lg lg:text-4xl font-semibold  text-black">
            GO BACK TO UPLOAD PAGE
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-center xl:justify-between  xl:space-y-0 xl:space-x-6 w-full">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row xl:flex-col justify-center items-center  py-7 sm:py-0  px-10 xl:w-full">
            {/* Product Details */}
            <div className="flex flex-col justify-start items-start w-full space-y-4 ml-3">
              <p className="text-xl md:text-2xl leading-normal text-gray-800">
                {filedata.FileName}
              </p>
              <p className="text-base font-semibold leading-none text-gray-600 ">
                {filedata.FileSize}
              </p>
            </div>
            {/* Product Image */}
            <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 sm:mb-2 w-52 sm:w-96 xl:w-auto ">
              <img
                src={
                  filedata.type == 'image/jpeg'
                    ? filedata.Download
                    : 'https://logowik.com/content/uploads/images/google-docs-icon6180.jpg'
                }
                className="rounded-lg"
                alt={filedata.FileName}
              />
            </div>
          </div>

          <div className="p-8 bg-gray-50  flex flex-col lg:w-full xl:w-3/5">
            <label className=" text-black ">SHORT URL</label>{' '}
            <div className="mt-2 flex gap-2 items-center border border-gray-300 px-2 rounded-lg">
              <input
                className=" p-4 flex-grow rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="email"
                name=""
                id=""
                value={filedata.FileName}
                placeholder="URL"
                ref={inputRef}
                disabled
              />
              <Copy className=" cursor-pointer" onClick={copyText} />
            </div>
            <div className=" flex gap-4 mt-5 rounded-lg">
              <input
                type="checkbox"
                onChange={() => {
                  SETaddname(!addname)
                }}
              />{' '}
              <p className=" text-black">Add Name of Sender </p>
              <div></div>
            </div>
            <div className="mt-5 flex gap-4 rounded-lg">
              <input
                disabled={addname ? false : true}
                className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 disabled:opacity-75
                "
                type="text"
                value={recipentname}
                onChange={(e) => {
                  setrecipentname(e.target.value)
                }}
                placeholder="Enter Recipent Name"
              />
              <button
                onClick={saverecipentname}
                disabled={addname ? false : true}
                className=" text-black bg-blue-600 rounded-2xl px-6 disabled:bg-gray-500 disabled:opacity-75
              "
              >
                Save
              </button>
            </div>
            <label className="mt-5 text-base leading-4 ttext-black">
              Recipent Email
            </label>
            <div className="mt-5 flex gap-4 rounded-lg ">
              <input
                className="border rounded-lg border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="email"
                name=""
                id=""
                placeholder="Enter Recipent Email"
                value={recipentemail}
                onChange={(e) => setemail(e.target.value)}
              />
              <button
                onClick={saverecipentemail}
                disabled={recipentemail !== '' ? false : true}
                className=" text-black bg-blue-600 rounded-2xl px-6 disabled:bg-gray-500 disabled:opacity-75
              "
              >
                Save
              </button>
            </div>
            <button
              onClick={postData}
              className="mt-8 border border-transparent bg-green-500 hover:border-gray-300    hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded-lg w-full"
            >
              <div>
                <p className="text-base leading-4">Send Email</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Email_Page
