import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className=" justify-center items-center flex m-5">
      <SignIn path="/sign-in" />
    </div>
  )
}
