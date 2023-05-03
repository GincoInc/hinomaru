import React, { FC } from 'react'
import modalChild from '@styles/components/modal/signature.module.scss'
import animation from '@styles/components/core/animation.module.scss'
type ModalProps = {
  onClose: () => void
  isLoading: boolean
  onSign: () => void
  onFinishSignature: () => void
  isFinishedSigning: boolean
}

export const ModalContentSignature: FC<ModalProps> = (props: ModalProps) => {
  const { onClose, isLoading, onSign, onFinishSignature, isFinishedSigning } =
    props

  const _onFinishSignature = () => {
    onFinishSignature()
    // 署名が終わった時の記述を書く...
  }

  return (
    <div className={`${modalChild.content}`}>
      <div className={modalChild.testnet}>
        <p>Sepoila Testnet</p>
      </div>
      <div className={modalChild.iconContainer}></div>
      <div className={modalChild.title}>
        <p>Signature Request</p>
      </div>
      <div className={modalChild.requestContainer}>
        <div className={modalChild.requestContainerInfo}>
          <p className={modalChild.requestContainerInfoTitle}>Hinomaru App</p>
          <p className={modalChild.requestContainerInfoDomain}>
            http://localhost:3060
          </p>
        </div>
        <hr className={modalChild.requestContainerDivider}></hr>
        <div className={modalChild.requestContainerMessage}>
          <p>Привет мир!</p>
        </div>
      </div>
      <div className={modalChild.buttonContainer}>
        <button
          onClick={onClose}
          className={`${modalChild.buttonCommon} ${modalChild.buttonCancel}`}>
          Cancel
        </button>
        <button
          onClick={onSign}
          className={`${modalChild.buttonCommon} ${modalChild.buttonSign}`}
          disabled={isLoading}>
          {!isLoading ? (
            'Sign'
          ) : !isFinishedSigning ? (
            <span className={`${animation.spinner}`}></span>
          ) : (
            <span>finished</span>
          )}
        </button>
      </div>
    </div>
  )
}
