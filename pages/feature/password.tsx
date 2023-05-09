import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import modalChild from '@styles/components/modal/login.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentPassword } from '@/components/modal/password'
import { ModalContentWallet } from '@/components/modal/wallet'
import { ModalContentLogin } from '@/components/modal/login'
import { ModalContentEmailSent } from '@/components/modal/emailSentMessage'
import { db, auth } from '@/utils/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import * as bip39 from 'bip39'
import * as passworder from '@metamask/browser-passworder'
import { useRouter } from 'next/router'
import {
  User,
  // signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from 'firebase/auth'

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (user: User | null) => {
    setAuthUser(user)
    if (!user) {
      setLoading(false)
      return
    }
    setLoading(true)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
  }
}

const FeaturePasswordModal = () => {
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalActive, setIsModalActive] = useState(true)
  const [isShowPasswordModal, setIsShowPasswordModal] = useState(true)
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)
  const [isShowHomeModal, setIsShowHomeModal] = useState(false)
  const [isShowEmailModal, setIsShowEmailModal] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState('')
  const { authUser, loading } = useFirebaseAuth()

  const generateMnemonicAndStore = async () => {
    console.log('🎃called')
    reset()
    if (auth.currentUser) {
      //  TODO: ログインしていなければログインモーダルに戻す
      const userRef = doc(db, 'users', auth.currentUser.uid)
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) {
        // TODO: redirect to password
        setIsShowPasswordModal(true)
        console.log('generate key')
        const mnemonic = bip39.generateMnemonic(256)
        const encrypted = await passworder.encrypt(password, mnemonic)

        console.log('store key')
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          encrypted: encrypted,
        })
        // TODO: redirect to home
        setIsShowPasswordModal(false)
        setIsShowHomeModal(true)
      } else {
        console.log('key already exists')
        setTimeout(() => {
          setIsShowHomeModal(true)
        }, 200)
      }
    } else {
      setIsShowLoginModal(true)
      console.log('not logged in')
    }
  }

  const reset = () => {
    setIsShowPasswordModal(false)
    setIsShowEmailModal(false)
  }

  /**
   * ==============================================
   * @ Home Modal
   * ==============================================
   */
  const onClickAddBalance = () => {
    setIsLoading(true)
  }

  const onClickSend = () => {
    setIsLoading(true)
  }

  const logout = () => {
    setIsLoading(true)
  }

  const onClose = () => {
    setIsModalActive(false)
  }

  /**
   * ==============================================
   * @ Login Modal
   * ==============================================
   */

  const signin = async () => {
    try {
      setIsShowEmailModal(true)
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      setInfo(`invite link has been sent to ${email}`)
    } catch (e) {
      console.log(e)
    }
    setTimeout(() => {
      setIsShowLoginModal(false)
    }, 200)
  }

  const actionCodeSettings = {
    url: `http://localhost:3060/feature/password?email=${email}`,
    handleCodeInApp: true,
  }

  useEffect(() => {
    if (
      authUser == null &&
      isSignInWithEmailLink(auth, window.location.href) &&
      router.query.hasOwnProperty('email')
    ) {
      signInWithEmailLink(
        auth,
        router.query.email as string,
        window.location.href
      )
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          console.log('asdf')
          setIsShowHomeModal(true)
        })
    }
  }, [])

  return (
    <div className={`${modalChild.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        {isShowPasswordModal ? (
          <ModalContentPassword
            isShowPasswordModal={isShowPasswordModal}
            onEncypt={generateMnemonicAndStore}
            setPassword={setPassword}
          />
        ) : isShowHomeModal ? (
          <ModalContentWallet
            onClickAddBalance={onClickAddBalance}
            onClickSend={onClickSend}
            logout={logout}
            isLoading={isLoading}
          />
        ) : isShowLoginModal ? (
          <ModalContentLogin
            isShowLoginModal={isShowLoginModal}
            signin={signin}
            setEmail={setEmail}
          />
        ) : isShowEmailModal ? (
          <ModalContentEmailSent email={email} />
        ) : (
          <ModalContentWallet
            onClickAddBalance={onClickAddBalance}
            onClickSend={onClickSend}
            logout={logout}
            isLoading={isLoading}
          />
        )}
      </ModalContainer>
    </div>
  )
}

FeaturePasswordModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeaturePasswordModal
