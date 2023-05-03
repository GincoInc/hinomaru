import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '@/utils/firebase'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
import modalChild from '@styles/components/modal/login.module.scss'
import { ModalContainer } from '@/components/modalContainer'
import { ModalContentLogin } from '@/components/modal/login'
import { ModalContentEmailSent } from '@/components/modal/emailSentMessage'
import {
  User,
  // signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from 'firebase/auth'
// import { useFirebaseAuth } from '../login'

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

const FeatureLoginModal = () => {
  const [active, setActive] = useState(false)
  const [isShowTwoFactorSection, setIsShowTwoFactorSection] = useState(false)
  const [email, setEmail] = useState('')
  const [isModalActive, setIsModalActive] = useState(true)
  const [info, setInfo] = useState('')

  const router = useRouter()

  const { authUser, loading } = useFirebaseAuth()

  const signin = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      setInfo(`invite link has been sent to ${email}`)
    } catch (e) {
      console.log(e)
    }
    //last
    setActive(true)
    setTimeout(() => {
      setIsShowTwoFactorSection(true)
    }, 200)
  }

  const onClose = () => {
    setIsModalActive(false)
  }

  useEffect(() => {
    if (info) {
      console.log(info)
    }
    if (
      authUser == null &&
      isSignInWithEmailLink(auth, window.location.href) &&
      router.query.hasOwnProperty('email')
    ) {
      signInWithEmailLink(
        auth,
        router.query.email as string,
        window.location.href
      ).catch((e) => {
        console.error(e)
      })
    }
  }, [])

  const actionCodeSettings = {
    url: `http://localhost:3060/login?email=${email}`,
    handleCodeInApp: true,
  }

  return (
    <div className={`${modalChild.container}`}>
      <ModalContainer onClose={onClose} isModalActive={isModalActive}>
        {!isShowTwoFactorSection ? (
          <ModalContentLogin
            active={active}
            signin={signin}
            setEmail={setEmail}
          />
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
