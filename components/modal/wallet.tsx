import React, { FC, useState, useEffect } from 'react'
import animation from '@styles/components/core/animation.module.scss'
import modalChild from '@styles/components/modal/wallet.module.scss'
import { User, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'

type ModalProps = {
  onClickAddBalance: () => void
  onClickSend: () => void
  logout: () => void
  isLoading: boolean
}

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (user: User | null) => {
    setAuthUser(user)
    console.log(user)
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

export const ModalContentWallet: FC<ModalProps> = (props: ModalProps) => {
  const { onClickAddBalance, onClickSend, logout, isLoading } = props

  return (
    <div className={`${modalChild.content} ${animation.slideUpNextContent}`}>
      <div className={modalChild.title}>
        <p>Wallet</p>
      </div>
      <div className={modalChild.walletInfo}>
        <div className={modalChild.walletAddress}>
          <div className={modalChild.key}>Address</div>
          <div className={modalChild.value}>
            <p>hogehoge...</p>
          </div>
        </div>
        <div className={modalChild.walletBalance}>
          <div className={modalChild.key}>Balance</div>
          <div className={`${modalChild.value} ${modalChild.valueBalance}`}>
            <div className={`${modalChild.valueEth}`}>
              <p>0 ETH</p>
            </div>
            <div className={`${modalChild.valueFiat}`}>
              <p>$0</p>
            </div>
          </div>
        </div>
      </div>
      <div className={modalChild.buttonContainer}>
        <button
          onClick={onClickAddBalance}
          className={`${modalChild.buttonCommon} ${modalChild.buttonAddBalance}`}
          disabled={isLoading}>
          Add to Balance
        </button>
        <button
          onClick={onClickSend}
          className={`${modalChild.buttonCommon} ${modalChild.buttonSend}`}>
          Send
        </button>
        <button
          onClick={logout}
          className={`${modalChild.buttonCommon} ${modalChild.buttonLogout}`}>
          Logout
        </button>
      </div>
    </div>
  )
}
