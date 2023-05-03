import React, { ChangeEvent, FC } from 'react'
import modalChild from '@styles/components/modal/login.module.scss'
import animation from '@styles/components/core/animation.module.scss'
type ModalProps = {
  active: boolean
  signin: () => void
  setEmail: (email: string) => void
}

export const ModalContentLogin: FC<ModalProps> = (props: ModalProps) => {
  const { active, signin, setEmail } = props

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  return (
    <div
      className={`${modalChild.modalContent} ${
        active ? animation.slideDown : ''
      }`}>
      <div
        className={`${modalChild.modalTitle} ${
          active ? animation.slideDown : ''
        }`}>
        <p>
          Sign in to <span className={modalChild.modalTitleBold}>Hinomaru</span>
        </p>
      </div>
      <div className={modalChild.modalIconContainer}></div>
      <div className={modalChild.modalMessage}>
        <p>You last logged in with Email</p>
      </div>
      <div
        className={`${modalChild.modalInputBox}  ${
          active ? animation.slideDown : animation.slideUp
        }`}>
        <input
          type='text'
          placeholder='Email address'
          onChange={handleChangeEmail}
        />
      </div>
      <button
        className={`${modalChild.modalButton} ${
          active ? animation.slideDown : animation.slideUp
        }`}
        onClick={signin}>
        Signin
      </button>
      <div className={modalChild.modalTextAdditional}>
        <p>Privacy・Terms</p>
      </div>
    </div>
  )
}
