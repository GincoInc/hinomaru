import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import modalChild from '@styles/components/modal/login.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentSignUp } from '@/components/modal/signup'

const FeatureSignupModal = () => {
  const [isModalActive, setIsModalActive] = useState(true)
  const onLoad = async () => {
    console.log('onLoad')
  }

  const onclick = async () => {
    setIsModalActive(false)
  }

  const onClose = () => {
    setIsModalActive(false)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <div className={`${modalChild.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        <ModalContentSignUp onclick={onclick} />
      </ModalContainer>
    </div>
  )
}

FeatureSignupModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeatureSignupModal
