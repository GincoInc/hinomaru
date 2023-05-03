import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import pageCss from '@styles/pages/signature.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentModal } from '@/components/modal/home'

const FeatureLoginModal = () => {
  const [isModalActive, setIsModalActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const onLoad = async () => {
    console.log('onLoad')
  }

  const onClose = () => {
    setIsModalActive(false)
  }

  const onClickAddBalance = () => {
    setIsLoading(true)
  }

  const onClickSend = () => {
    setIsLoading(true)
  }

  const logout = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <div className={`${pageCss.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        <ModalContentModal
          onClickAddBalance={onClickAddBalance}
          onClickSend={onClickSend}
          logout={logout}
          isLoading={isLoading}
        />
      </ModalContainer>
    </div>
  )
}

FeatureLoginModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeatureLoginModal
