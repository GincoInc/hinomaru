import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import css from '@styles/pages/home.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentPassword } from '@/components/modal/password'
import { ModalContentWallet } from '@/components/modal/wallet'
import { ModalContentLogin } from '@/components/modal/login'
import { ModalContentEmailSent } from '@/components/modal/emailSentMessage'
import { auth, db } from '@/utils/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import * as bip39 from 'bip39'
import * as passworder from '@metamask/browser-passworder'
import { useRouter } from 'next/router'
import { ModalLocation } from '@/constants'
import {
  User,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from 'firebase/auth'

let load = true
const collectionUsers = 'users'

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (user: User | null) => {
    setAuthUser(user)
    if (user) {
      setLoading(false)
      load = false
    }
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
const Home = ({}) => {
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalActive, setIsModalActive] = useState(true)
  const [isShowPasswordModal, setIsShowPasswordModal] = useState(false)
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)
  const [isShowHomeModal, setIsShowHomeModal] = useState(false)
  const [isShowEmailModal, setIsShowEmailModal] = useState(false)
  const [isFinishedLoading, setIsFinishedLoading] = useState(false)

  const [activateSlideDownAnimation, setActivateSlideDownAnimation] =
    useState(false)
  const [modalType, setModalType] = useState<string>()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const { authUser, loading } = useFirebaseAuth()

  const generateMnemonicAndStore = async () => {
    if (auth.currentUser) {
      //  TODO: ログインしていなければログインモーダルに戻す
      const userRef = doc(db, collectionUsers, auth.currentUser.uid)
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) {
        // TODO: redirect to password
        const mnemonic = bip39.generateMnemonic(256)
        const encrypted = await passworder.encrypt(password, mnemonic)
        await setDoc(doc(db, collectionUsers, auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          encrypted: encrypted,
        })
        // TODO: redirect to home
        switchModalLocation(ModalLocation.HOME)
      } else {
        switchModalLocation(ModalLocation.HOME)
      }
    } else {
      switchModalLocation(ModalLocation.LOGIN)
    }
  }

  /**
   * ==============================================
   * @ Home Modal
   * ==============================================
   */
  const onClickAddBalance = () => {
    console.log('add balance...')
  }

  const onClickSend = () => {
    console.log('send...')
  }

  const logout = () => {
    signOut(auth)
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
      setActivateSlideDownAnimation(true)
      switchModalLocation(ModalLocation.EMAIL_SENT)
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    } catch (e) {
      console.log(e)
    }
  }

  const actionCodeSettings = {
    url: `http://localhost:3060/feature/home-client?email=${email}`,
    handleCodeInApp: true,
  }

  const switchModalLocation = (modalLocation: string) => {
    setModalType(modalLocation)
    switch (modalLocation) {
      case ModalLocation.HOME:
        setIsShowHomeModal(true)
        setIsShowLoginModal(false)
        setIsShowPasswordModal(false)
        setIsShowEmailModal(false)
        break
      case ModalLocation.LOGIN:
        setIsShowLoginModal(true)
        setIsShowHomeModal(false)
        setIsShowPasswordModal(false)
        setIsShowEmailModal(false)
        break
      case ModalLocation.PASSWORD:
        setIsShowPasswordModal(true)
        setIsShowLoginModal(false)
        setIsShowHomeModal(false)
        setIsShowEmailModal(false)
        break
      case ModalLocation.EMAIL_SENT:
        setIsShowEmailModal(true)
        setTimeout(() => {
          setIsShowLoginModal(false)
        }, 230)
        setIsShowPasswordModal(false)
        setIsShowHomeModal(false)
        break
      default:
        break
    }
  }

  const checkUserAuthStatusAndSetModalLocation = async () => {
    try {
      if (auth.currentUser) {
        // @ ユーザーがログインしているかどうかを確認
        const userRef = doc(db, collectionUsers, auth.currentUser.uid)
        const userSnap = await getDoc(userRef)
        if (!userSnap.exists()) {
          // @ ユーザーがパスワードを設定しているかどうかを確認して、設定していなければパスワード設定モーダルに遷移
          switchModalLocation(ModalLocation.PASSWORD)
        } else {
          // @ ユーザーがすでにパスワードを設定している場合はホームモーダルに遷移
          switchModalLocation(ModalLocation.HOME)
        }
      } else if (
        authUser == null &&
        isSignInWithEmailLink(auth, window.location.href) &&
        router.query.hasOwnProperty('email')
      ) {
        // @ ユーザーがログインしていない且つメールリンクからのログインである場合
        loginWithEmail()
      } else {
        // @ ユーザーがログインしていない且つメールリンクからのログインでもない場合
        switchModalLocation(ModalLocation.LOGIN)
      }
    } catch (e) {
      console.log(e)
    } finally {
      if (!load && authUser) {
        setIsFinishedLoading(true)
      } else if (!load && !authUser) {
        switchModalLocation(ModalLocation.LOGIN)
        setIsFinishedLoading(true)
      }
    }
  }

  const loginWithEmail = async () => {
    try {
      const data = await signInWithEmailLink(
        auth,
        router.query.email as string,
        window.location.href
      )
      const user = data.user
      const userRef = doc(db, collectionUsers, user.uid)
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) {
        // @ ユーザーがメールリンクからのログインする際に、パスワードが設定されていない場合
        switchModalLocation(ModalLocation.PASSWORD)
      } else {
        // @ ユーザーがメールリンクからのログインする際に、すでにログイン済みの場合
        switchModalLocation(ModalLocation.HOME)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsFinishedLoading(true)
    }
  }
  useEffect(() => {
    checkUserAuthStatusAndSetModalLocation()
  }, [router.query, authUser])

  return (
    <div className={`${css.homeContainer}`}>
      <div className={`${css.modalContainer}`}>
        {isFinishedLoading && (
          <ModalContainer onClose={onClose} isModalActive={isModalActive}>
            <div>
              {modalType === ModalLocation.PASSWORD && (
                <ModalContentPassword
                  isShowPasswordModal={isShowPasswordModal}
                  onEncypt={generateMnemonicAndStore}
                  setPassword={setPassword}
                />
              )}
              {modalType === ModalLocation.HOME && (
                <ModalContentWallet
                  onClickAddBalance={onClickAddBalance}
                  onClickSend={onClickSend}
                  logout={logout}
                  isLoading={isLoading}
                />
              )}
              {isShowLoginModal ? (
                <ModalContentLogin
                  isShowLoginModal={activateSlideDownAnimation}
                  signin={signin}
                  setEmail={setEmail}
                />
              ) : isShowEmailModal ? (
                <ModalContentEmailSent email={email} />
              ) : (
                <></>
              )}
            </div>
          </ModalContainer>
        )}
      </div>

      <div className='w-full mt-14 border border-solid border-gray-400 rounded-xl p-3 mb-20'>
        <div className='text-gray-600 text-sm'>User</div>
        <hr className='border border-solid border-gray-400 pr-4 my-3' />
        {authUser ? (
          <div className='text-xs break-words'>{JSON.stringify(authUser)}</div>
        ) : (
          <div>no user</div>
        )}
        <div></div>
      </div>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default Home
