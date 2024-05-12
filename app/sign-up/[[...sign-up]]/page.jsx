import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div
      className=" justify-center items-center flex my-2
    "
    >
      <SignUp path="/sign-up" />
    </div>
  )
}
