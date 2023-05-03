import { ReactElement, useEffect } from 'react'
import ResearchPageLayout from '@/components/layout/researchPageLayout'
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

const MagicLogin = () => {
  const onLoad = async () => {
    const magic = new Magic(apiKey!, {
      network: customNodeOptions,
    })
    console.log('USER LOGIN STATUS:', await magic.user.isLoggedIn())
    console.log('USER:', await magic.user)
    if (await magic.user.isLoggedIn()) {
      console.log('logged in')
      console.log('WalletInfo:', await magic.wallet.getInfo()) // loginされていないときはアクセスできない
    } else {
      console.log('not logged in')
      const accounts = await magic.wallet.connectWithUI()
      console.log('accounts:', accounts)
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <div className='text-lg bold text-gray-500'>login</div>
}

MagicLogin.getLayout = (page: ReactElement) => {
  return <ResearchPageLayout>{page}</ResearchPageLayout>
}
export default MagicLogin
