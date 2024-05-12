'use client'
import Image from 'next/image'
import Hero from './_components/Hero'
import Header from './_components/Header'
import { UserButton, useAuth } from '@clerk/nextjs'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
    </>
  )
}
