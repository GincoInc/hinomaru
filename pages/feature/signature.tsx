import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import pageCss from '@styles/pages/signature.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentSignature } from '@/components/modal/signature'

const FeatureLoginModal = () => {
  const [active, setActive] = useState(false)
  const [isModalActive, setIsModalActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinishedSigning, setIsFinishedSigning] = useState(false)

  const onLoad = async () => {
    console.log('onLoad')
  }

  const onclick = async () => {
    setActive(true)
  }

  const onClose = () => {
    setIsModalActive(false)
  }

  const onSign = () => {
    setIsLoading(true)
  }

  const onFinishSignature = () => {
    setIsLoading(false)
    setIsFinishedSigning(true)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <div className={`${pageCss.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        <ModalContentSignature
          onClose={onClose}
          onSign={onSign}
          isLoading={isLoading}
          onFinishSignature={onFinishSignature}
          isFinishedSigning={isFinishedSigning}
        />
      </ModalContainer>
    </div>
  )
}

FeatureLoginModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeatureLoginModal
