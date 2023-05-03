import React, { FC } from 'react'
import animation from '@styles/components/core/animation.module.scss'
import { EmailSendIcon } from '@/components/icon/sendEmail'

export const ModalContentEmailSent = () => {
  return (
    <div className={`${animation.slideUpNextContent}`}>
      <div className='w-full flex items-center justify-center mt-10'>
        <EmailSendIcon />
      </div>
      <div className='my-5'>
        <p className='text-center text-xl leading-9'>
          Please enter the code sent to
        </p>
        <p className='text-center text-xl leading-9'>
          <strong>hogehoge@ginco.co.jp</strong>
        </p>
      </div>
    </div>
  )
}
