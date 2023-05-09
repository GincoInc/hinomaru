import { ReactElement, useState, useEffect } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import css from '@styles/pages/home.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentPassword } from '@/components/modal/password'
import { ModalContentWallet } from '@/components/modal/wallet'
import { ModalContentLogin } from '@/components/modal/login'
import { ModalContentEmailSent } from '@/components/modal/emailSentMessage'
import { auth, db } from '@/utils/firebase'
import admin from '@/utils/admin'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import * as bip39 from 'bip39'
import * as passworder from '@metamask/browser-passworder'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next'
import { serialize } from 'cookie'
import { ModalLocation } from '@/constants'
import {
  User,
  getAuth,
  // signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from 'firebase/auth'
const apiKey = process.env.NEXT_PUBLIC_API_KEY

// export const useFirebaseAuth = () => {
//   const [authUser, setAuthUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   const authStateChanged = async (user: User | null) => {
//     setAuthUser(user)
//     if (!user) {
//       setLoading(false)
//       return
//     }
//     setLoading(true)
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, authStateChanged)
//     return () => unsubscribe()
//   }, [])

//   return {
//     authUser,
//     loading,
//   }
// }
const Home = ({
  modalLocation,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalActive, setIsModalActive] = useState(true)
  const [isShowPasswordModal, setIsShowPasswordModal] = useState(false)
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)
  const [isShowHomeModal, setIsShowHomeModal] = useState(false)
  const [isShowEmailModal, setIsShowEmailModal] = useState(false)
  const [activateSlideDownAnimation, setActivateSlideDownAnimation] =
    useState(false)
  const [modalType, setModalType] = useState(modalLocation)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState('')
  // const { authUser, loading } = useFirebaseAuth()

  const generateMnemonicAndStore = async () => {
    console.log('🎃called')
    setModalType(modalLocation)
    setIsShowPasswordModal(false)
    setIsShowEmailModal(false)
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
        // await setDoc(doc(db, 'users', auth.currentUser.uid), {
        //   uid: auth.currentUser.uid,
        //   encrypted: encrypted,
        // })
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
      setActivateSlideDownAnimation(true)
      switchModalLocation(ModalLocation.EMAIL_SENT)
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      setInfo(`invite link has been sent to ${email}`)
    } catch (e) {
      console.log(e)
    }
  }

  const actionCodeSettings = {
    url: `http://localhost:3060/feature/home?email=${email}`,
    handleCodeInApp: true,
  }

  useEffect(() => {
    console.log('modalLocation should be')
    console.log(modalLocation)
  }, [router.query])

  // const getUser = async () => {
  //   if (authUser) {
  //     const userRef = doc(db, 'users', authUser.uid)
  //     const userSnap = await getDoc(userRef)
  //     if (userSnap.exists()) {
  //       console.log(userSnap.data())
  //     } else {
  //       console.log('user not found')
  //     }
  //   }
  // }

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

  useEffect(() => {
    switchModalLocation(modalLocation)
  }, [])

  return (
    <div className={`${css.homeContainer}`}>
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

      <div className='w-full mt-14 border border-solid border-gray-400 rounded-xl p-3 mb-20'>
        <div className='text-gray-600 text-sm'>User</div>
        <hr className='border border-solid border-gray-400 pr-4 my-3' />
        {authUser ? (
          <div className='text-xs break-words'>{JSON.stringify(authUser)}</div>
        ) : (
          <div>no</div>
        )}
        <div></div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const { req, res, query } = context
  const db = admin.firestore()
  let isLoggedin: boolean = false
  let modalLocation: string = 'LOGIN'
  let user = null
  const idToken: string = req.cookies['session-key'] || ''
  if (idToken != '') {
    console.log('signed in')
    const body = JSON.stringify({ idToken })
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    if (response.ok) {
      console.log('signed in, got user info')
      isLoggedin = true
      modalLocation = 'PASSWORD'
      const json = await response.json()
      console.log('json')
      console.log(json)
      user = {
        uid: json.users[0].localId,
        email: json.users[0].email,
      }
      const userCollection = db.collection('users')
      const userDoc = await userCollection.doc(json.users[0].localId).get()
      if (userDoc.exists) {
        console.log('🔥user data exists so show wallet')
        console.log(userDoc.data())
        modalLocation = 'HOME'
      } else {
        console.log('🔥no user data so show password')
        modalLocation = 'PASSWORD'
      }
    }
  } else {
    console.log('no session key, not signed in')
  }

  if (query.email && query.oobCode && !isLoggedin) {
    const email = query.email
    const oobCode = query.oobCode
    const body = JSON.stringify({ email, oobCode })
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithEmailLink?key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    if (response.ok) {
      modalLocation = 'PASSWORD'
      console.log('signed in with email link')
      const json = await response.json()
      console.log('json')
      console.log(json)
      user = {
        uid: json.users[0].localId,
        email: json.users[0].email,
      }
      const COOKIE_OPTIONS = {
        maxAge: 60 * 60 * 6, // 6 hours
        httpOnly: true,
        secure: true,
        path: '/',
      }
      res.setHeader(
        'Set-Cookie',
        serialize('session-key', json.idToken, COOKIE_OPTIONS)
      )
    } else {
      console.log('FAILED: signed in with email link so go to login page')
      modalLocation = 'LOGIN'
      const json = await response.json()
      console.log(json)
    }
  }

  const props = {
    modalLocation,
    user,
  }

  return { props: props }
}

Home.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default Home
