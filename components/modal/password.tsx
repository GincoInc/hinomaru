import React, { ChangeEvent, FC, useEffect } from 'react'
import modalChild from '@styles/components/modal/login.module.scss'
import animation from '@styles/components/core/animation.module.scss'
type ModalProps = {
  isShowPasswordModal: boolean
  onEncypt: () => void
  setPassword: (email: string) => void
}

export const ModalContentPassword: FC<ModalProps> = (props: ModalProps) => {
  const { isShowPasswordModal, onEncypt, setPassword } = props

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  useEffect(() => {}, [])

  return (
    <div
      className={`${modalChild.modalContent} ${
        !isShowPasswordModal ? animation.slideDown : ''
      }`}>
      <div
        className={`${modalChild.modalTitle} ${
          !isShowPasswordModal ? animation.slideDown : ''
        }`}>
        <p>
          <span className={modalChild.modalTitleBold}>Hinomaru</span>
        </p>
      </div>
      <div className={modalChild.modalIconContainer}></div>
      <div
        className={`${modalChild.modalInputBox}  ${
          !isShowPasswordModal ? animation.slideDown : animation.slideUp
        }`}>
        <input
          type='text'
          placeholder='password'
          onChange={handleChangePassword}
        />
      </div>
      <button
        className={`${modalChild.modalButton} ${
          !isShowPasswordModal ? animation.slideDown : animation.slideUp
        }`}
        onClick={onEncypt}>
        Encrypt
      </button>
      <div className={modalChild.modalTextAdditional}>
        <p>Privacy・Terms</p>
      </div>
    </div>
  )
}
