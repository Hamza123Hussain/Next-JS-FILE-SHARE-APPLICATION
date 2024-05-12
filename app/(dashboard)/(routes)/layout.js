import Options from '../../_components/Sidenav.jsx'
export default function RootLayout({ children }) {
  return (
    <>
      <Options />
      <div className="">{children}</div>
    </>
  )
}
