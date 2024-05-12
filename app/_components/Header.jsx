'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
  // State to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 md:flex md:items-center">
            <Link href="/">
              <Image src="/icons8-logo-144.png" width={48} height={48} />
            </Link>
            <span className="text-teal-600 dark:text-teal-300">ShareEasy</span>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/UploadPage"
                  >
                    Upload
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500"
                  href="/UploadPage"
                >
                  GET STARTED
                </a>
              </div>

              {/* Hamburger button */}
              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  onClick={toggleMenu} // Toggle menu visibility on click
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu for small screens */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Upload
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
