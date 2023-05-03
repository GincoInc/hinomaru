import { useEffect } from 'react'
import Web3 from 'web3'
import { Magic } from 'magic-sdk'
const apiKey = process.env.NEXT_PUBLIC_MAGIC_API_KEY
/**
 * @ Ethereum Testnet (Sepolia)
 */
const customNodeOptions = {
  rpcUrl: 'https://rpc2.sepolia.org/',
  chainId: 11155111,
}

const MagicLogout = () => {
  const onLogout = async () => {
    const magic = new Magic(apiKey!, {
      network: customNodeOptions,
    })

    console.log('USER LOGIN STATUS:', await magic.user.isLoggedIn())
    console.log('USER:', await magic.user)
    if (await magic.user.isLoggedIn()) {
      console.log('logged in. logout...')
      console.log('WalletInfo:', await magic.wallet.getInfo()) // loginされていないときはアクセスできない
      await magic.user.logout().then(() => {
        console.log('successfully logged out')
      })
      // deprecated method
      // await magic.wallet.disconnect().then(() => {
      //   console.log('successfully disconnected')
      // })
    } else {
      console.log('not logged in')
      const accounts = await magic.wallet.connectWithUI()
      console.log('accounts:', accounts)
    }
  }

  useEffect(() => {
    onLogout()
  }, [])

  return <div className='text-lg bold text-gray-500'>logout</div>
}

export default MagicLogout
