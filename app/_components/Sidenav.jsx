'use client'
import { UserButton } from '@clerk/nextjs'
import MenuList from '../_utils/MenuList'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Options = () => {
  const [active, setactive] = useState(2)
  return (
    <>
      <header className="bg-white border-b-2 border-black w-[100vw]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 md:flex md:items-center">
              <Link href="/">
                <Image src="/icons8-logo-144.png" width={48} height={48} />
              </Link>
              <span className="text-teal-600 dark:text-teal-300">
                ShareEasy
              </span>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className=" flex pb-3  items-center border-b-2 ">
        {MenuList.map((element, index) => {
          return (
            <div key={element.id}>
              <Link
                onClick={() => setactive(index)}
                href={element.path}
                className={`flex gap-2 border-2 bordergrey  mt-5 mx-2 hover:bg-gray-200 hover:opacity-75 p-5 rounded-lg ${
                  active == index ? ' bg-blue-900 text-white' : ''
                } `}
              >
                {element.icon}
                <p>{element.Name}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Options
