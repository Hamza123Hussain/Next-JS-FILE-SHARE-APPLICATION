'use client'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from '../../../../FireBaseConfig'
import { useUser } from '@clerk/nextjs'

const Page = () => {
  const { user } = useUser() // Assuming you have a user context hook
  const db = getFirestore(app)
  const [userHistory, setUserHistory] = useState([])

  const fetchDataFromFirestore = async () => {
    try {
      console.log('User:', user)
      console.log('Primary email address:', user?.primaryEmailAddress)

      if (!user || !user.primaryEmailAddress) {
        throw new Error('User or primary email address is undefined')
      }

      const snapshot = await getDocs(
        collection(
          db,
          'Users',
          user.primaryEmailAddress.emailAddress, // Potential source of the error
          'UPLOADED FILES'
        )
      )

      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      return data
    } catch (error) {
      console.error('Error fetching data from Firestore:', error)
      return []
    }
  }

  useEffect(() => {
    const fetchFirestoreData = async () => {
      const fileData = await fetchDataFromFirestore()
      setUserHistory(fileData)
    }

    fetchFirestoreData()
  }, [user]) // Run effect whenever user changes

  if (userHistory.length > 0) {
    console.log('User history:', userHistory)
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Recipent Name / Email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              File Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              File Type
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              File Size
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Shared On
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Download Link
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {userHistory.map((element) => {
            if (element.RecipentEmail !== '') {
              return (
                <tr className="odd:bg-gray-50" key={element.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {element.RecipentName !== ''
                      ? element.RecipentName
                      : element.RecipentEmail}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.FileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.FileType}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.FileSize}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.Download}
                  </td>
                </tr>
              )
            } else {
              return null // Render nothing if both RecipentName and RecipentEmail are empty
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Page
