import React, { FC, ReactElement } from 'react'
import Link from 'next/link'

type ReserachPageLayoutProps = {
  children: ReactElement
}

export const ResearchPageLayout: FC<ReserachPageLayoutProps> = ({
  children,
}: ReserachPageLayoutProps) => {
  return (
    <div className='relative'>
      <div className='absolute w-full'>
        <div className='w-full bg-gray-300 py-3 text-xl px-8 text-gray-500'>
          <p className='text-lg bold'>Research</p>
          <p className='text-xs'>SDKの動作検証をするワークスペース</p>
          <p className='text-sm'>
            <Link className='hover:text-yellow-400' href='/feature'>
              Feature Page はこちら
            </Link>
          </p>
        </div>
        <div className='w-full bg-gray-200 py-1 text-md px-8 text-gray-700 flex'>
          <p className='text-xs'>
            Fortmaticの動作検証をする際は{' '}
            <span className='text-red-400'>npm run hardhat node</span>
            を実行してください。
          </p>
        </div>
        <div className='w-full bg-gray-200 py-1 text-sm px-8 text-gray-600 flex'>
          <div className='w-24'>Fortmatic: </div>
          <div className='pr-3'>
            <Link className='hover:text-yellow-400' href='/fortmatic/login'>
              Login
            </Link>
          </div>
          <div className='pr-3'>
            <Link
              className='hover:text-yellow-400'
              href='/fortmatic/personal-sign'>
              Personal Sign
            </Link>
          </div>
          <div className='pr-3'>
            <Link
              className='hover:text-yellow-400'
              href='/fortmatic/send-ether-transaction'>
              Send Ether Transaction
            </Link>
          </div>
        </div>
        <div className='w-full bg-gray-200 py-1 text-sm px-8 text-gray-600 flex'>
          <div className='w-24'>Magic: </div>
          <div className='pr-3'>
            <Link className='hover:text-yellow-400' href='/magic/login'>
              Login
            </Link>
          </div>
          <div className='pr-3 aaa'>
            <Link className='hover:text-yellow-400' href='/magic/logout'>
              Logout
            </Link>
          </div>
          <div className='pr-3 aaa'>
            <Link
              className='hover:text-yellow-400'
              href='/magic/personal-signature'>
              Personal Signature
            </Link>
          </div>
          <div className='pr-3 aaa'>
            <Link
              className='hover:text-yellow-400'
              href='/magic/send-transaction'>
              Send Transaction
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full px-8 pt-28 h-screen'>{children}</div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => (
  <ResearchPageLayout>{page}</ResearchPageLayout>
)

export default ResearchPageLayout
