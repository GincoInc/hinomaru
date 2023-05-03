import React, { FC, ReactElement } from 'react'
import Link from 'next/link'

type FeaturePageLayoutProps = {
  children: ReactElement
}

export const FeaturePageLayout: FC<FeaturePageLayoutProps> = ({
  children,
}: FeaturePageLayoutProps) => {
  return (
    <div className='relative'>
      <div className='absolute w-full'>
        <div className='w-full bg-gray-300 py-3 text-xl px-8 text-gray-500'>
          <p className='text-lg bold'>Features</p>
          <p className='text-xs'>
            SDKで使用するモーダルを検証するワークスペース
          </p>
          <p className='text-sm pt-3'>
            <Link className='hover:text-yellow-500' href='/'>
              Home はこちら
            </Link>
          </p>
        </div>
        <div className='w-full bg-gray-200 py-1 text-md px-8 text-gray-600 flex'>
          <div className='pr-3'>
            <Link className='hover:text-yellow-400' href='/feature/signup'>
              Sign Up
            </Link>
          </div>
          <div className='pr-3'>
            <Link className='hover:text-yellow-400' href='/feature/login'>
              Login
            </Link>
          </div>
          <div className='pr-3'>
            <Link className='hover:text-yellow-400' href='/feature/signature'>
              Signature
            </Link>
          </div>
          <div className='pr-3'>
            <Link className='hover:text-yellow-400' href='/feature/password'>
              Password
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full px-8 pt-40 h-screen'>{children}</div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => (
  <FeaturePageLayout>{page}</FeaturePageLayout>
)

export default FeaturePageLayout
