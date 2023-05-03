import React, { FC } from 'react'
import modalChild from '@styles/components/modal/signup.module.scss'

type ModalProps = {
  onclick: () => void
}

export const ModalContentSignUp: FC<ModalProps> = (props: ModalProps) => {
  const { onclick } = props
  return (
    <div className={`${modalChild.content}`}>
      <div className={`${modalChild.title}`}>
        <p>
          Sign up to <span className={modalChild.titleBold}>Hinomaru</span>
        </p>
      </div>
      <div className={modalChild.iconContainer}></div>
      <div className={`${modalChild.inputBox}`}>
        <input type='text' placeholder='Email address' />
      </div>
      <button className={`${modalChild.signUpButton}`} onClick={onclick}>
        Sign up
      </button>
    </div>
  )
}
