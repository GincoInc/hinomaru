import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full flex justify-center items-center h-screen'>
      <div className='w-5/12 flex flex-col items-center rounded-2xl shadow-2xl p-2'>
        <div className='w-full text-lg text-white bold py-3 px-4 rounded-xl bg-blue-400'>
          Menu
        </div>
        <div className='px-4 w-full text-gray-500 py-3'>
          <div>
            <h2>Modals</h2>
            <div className='px-4'>
              <div>
                <Link className='hover:text-yellow-400' href='/feature/login'>
                  Login Modal
                </Link>
              </div>
              <div>
                <Link
                  className='hover:text-yellow-400'
                  href='/feature/signature'>
                  Signature Modal
                </Link>
              </div>
              <div>
                <Link
                  className='hover:text-yellow-400'
                  href='/feature/create-transaction'>
                  Create transaction Modal
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h2>Fortmatic</h2>
            <div className='px-4'>
              <div>
                <Link className='hover:text-yellow-400' href='/feature/login'>
                  Login Modal
                </Link>
              </div>
              <div>
                <Link className='hover:text-yellow-400' href='/fortmatic/login'>
                  Login
                </Link>
              </div>
              <div>
                <Link
                  className='hover:text-yellow-400'
                  href='/fortmatic/personal-sign'>
                  Personal Sign
                </Link>
              </div>
              <div>
                <Link
                  className='hover:text-yellow-400'
                  href='/fortmatic/send-ether-transaction'>
                  Send Ether Transaction
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h2>Magic</h2>
            <div className='px-4'>
              <div>
                <Link className='hover:text-yellow-400' href='/magic/login'>
                  Login
                </Link>
              </div>
              <div>
                <Link className='hover:text-yellow-400' href='/magic/logout'>
                  Logout
                </Link>
              </div>
              <div>
                <Link
                  className='hover:text-yellow-400'
                  href='/magic/personal-signature'>
                  Personal Signature
                </Link>
              </div>
              <div>
                <Link
                  className='hover:text-yellow-400'
                  href='/magic/send-transaction'>
                  Send Transaction
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
