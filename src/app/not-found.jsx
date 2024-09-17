import Link from 'next/link';


const NotFound = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-24">
        <h2 className='text-center'><span className='text-red-700 text-9xl'>404</span> <br /> Page not found</h2>
        <p className="text-center">Check the url properly and try again.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-600">Go back to home</Link>
    </div>
  )
}

export default NotFound;