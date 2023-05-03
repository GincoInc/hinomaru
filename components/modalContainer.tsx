import React, { FC, ReactElement, useState } from 'react'
import { CloseIcon } from '@/components/icon/close'
import modal from '@styles/components/core/modal.module.scss'
import animation from '@styles/components/core/animation.module.scss'
type ModalProps = {
  children: ReactElement
  onClose: () => void
  isModalActive: boolean
}

export const ModalContainer: FC<ModalProps> = (props: ModalProps) => {
  const { children, onClose, isModalActive } = props

  const _onClose = () => {
    onClose()
  }

  return (
    <div
      className={`${modal.container} ${animation.popup} ${
        !isModalActive ? animation.close : ''
      }`}>
      <div className={modal.modalContainer}>
        <div className={modal.closeButton}>
          <CloseIcon onClose={_onClose} />
        </div>
        <div className={modal.content}>{children}</div>
        <div className={modal.footerSection}>
          <div className={modal.footerSectionContent}>
            <p>Secured by Ginco</p>
          </div>
        </div>
      </div>
    </div>
  )
}
