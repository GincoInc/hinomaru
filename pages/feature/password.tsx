import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import modalChild from '@styles/components/modal/login.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentPassword } from '@/components/modal/password'
import * as bip39 from 'bip39'
import * as passworder from '@metamask/browser-passworder'

const FeaturePasswordModal = () => {
  const [active, setActive] = useState(false)
  const [isShowEncryptCompleteModal, setIsShowEncryptCompleteModal] =
    useState(false)
  const [password, setPassword] = useState<string>('')
  const [encryptedPassword, setEncryptedPassword] = useState<Promise<string>>()
  const [isModalActive, setIsModalActive] = useState(true)

  const generateKey = async () => {
    console.log('encrypting... ', password)
    const mnemonic = bip39.generateMnemonic(256)
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    return await passworder.encrypt(password, seed)
  }

  const encryptPassword = async () => {
    const encryptedPassword = await generateKey()
    console.log(encryptedPassword)
    onClose()
    // setEncryptedPassword(encryptedPassword)
    //last
    // setActive(true)
    // setTimeout(() => {
    //   setIsShowEncryptCompleteModal(true)
    // }, 200)
  }

  const onClose = () => {
    setIsModalActive(false)
  }

  useEffect(() => {}, [])

  return (
    <div className={`${modalChild.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        <ModalContentPassword
          active={active}
          onEncypt={encryptPassword}
          setPassword={setPassword}
        />
      </ModalContainer>
    </div>
  )
}

FeaturePasswordModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeaturePasswordModal
