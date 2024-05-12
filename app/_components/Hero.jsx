import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-100 via-blue-300 to-purple-400 bg-clip-text text-xl font-extrabold text-transparent sm:text-5xl/tight  ">
            Streamline your sharing experience with effortless simplicity
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-xs/loose  ">
            ShareEasy streamlines the process of sharing files effortlessly.
            Whether it's documents, images, or videos, our Next.js-powered
            platform ensures seamless sharing experiences for everyone
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/UploadPage"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
