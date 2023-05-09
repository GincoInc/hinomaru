import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import pageCss from '@styles/pages/signature.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentWallet } from '@/components/modal/wallet'
import { auth } from '@/utils/firebase'
import { signOut } from 'firebase/auth'
const FeatureWalletModal = () => {
  const [isModalActive, setIsModalActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const onLoad = async () => {
    console.log('onLoad')
  }

  const onClose = () => {
    setIsModalActive(false)
  }

  const onClickAddBalance = () => {
    console.log('add balance...')
  }

  const onClickSend = () => {
    console.log('send...')
  }

  const logout = () => {
    signOut(auth)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <div className={`${pageCss.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        <ModalContentWallet
          onClickAddBalance={onClickAddBalance}
          onClickSend={onClickSend}
          logout={logout}
          isLoading={isLoading}
        />
      </ModalContainer>
    </div>
  )
}

FeatureWalletModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeatureWalletModal
