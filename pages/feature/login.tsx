import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import modalChild from '@styles/components/modal/login.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentLogin } from '@/components/modal/login'
import { ModalContentEmailSent } from '@/components/modal/emailSentMessage'

const FeatureLoginModal = () => {
  const [active, setActive] = useState(false)
  const [isShowTwoFactorSection, setIsShowTwoFactorSection] = useState(false)
  const [isModalActive, setIsModalActive] = useState(true)
  const onLoad = async () => {
    console.log('onLoad')
  }

  const onclick = async () => {
    console.log('onclick')
    setActive(true)
    setTimeout(() => {
      setIsShowTwoFactorSection(true)
    }, 200)
    console.log('called')
  }

  const onClose = () => {
    setIsModalActive(false)
    console.log('onClose')
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <div className={`${modalChild.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        {!isShowTwoFactorSection ? (
          <ModalContentLogin active={active} onclick={onclick} />
        ) : (
          <ModalContentEmailSent />
        )}
      </ModalContainer>
    </div>
  )
}

FeatureLoginModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeatureLoginModal
