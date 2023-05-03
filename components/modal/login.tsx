import React, { FC } from 'react'
import modalChild from '@styles/components/modal/login.module.scss'
import animation from '@styles/components/core/animation.module.scss'
type ModalProps = {
  active: boolean
  onclick: () => void
}

export const ModalContentLogin: FC<ModalProps> = (props: ModalProps) => {
  const { active, onclick } = props
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
        <input type='text' placeholder='Email address' />
      </div>
      <button
        className={`${modalChild.modalButton} ${
          active ? animation.slideDown : animation.slideUp
        }`}
        onClick={onclick}>
        Log in / Sign up
      </button>
      <p className={modalChild.typographySm}>OR</p>
      <button className={modalChild.modalButton} disabled>
        Log in / Sign up
      </button>
      <div className={modalChild.modalActionThirdParty}></div>
      <div className={modalChild.modalTextAdditional}>
        <p>Privacy・Terms</p>
      </div>
    </div>
  )
}
