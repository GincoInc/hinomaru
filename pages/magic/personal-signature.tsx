import { ReactElement, useEffect } from 'react'
import ResearchPageLayout from '@/components/layout/researchPageLayout'
import Web3 from 'web3'
import { Magic } from 'magic-sdk'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
const apiKey = process.env.NEXT_PUBLIC_MAGIC_API_KEY
/**
 * @ Ethereum Testnet (Sepolia)
 */
const customNodeOptions = {
  rpcUrl: 'https://rpc2.sepolia.org/',
  chainId: 11155111,
}

const message = 'test!!!'

const MagicPersonalSignatures = () => {
  const onLoad = async () => {
    const magic = new Magic(apiKey!, {
      network: customNodeOptions,
    })

    const provider = await magic.wallet.getProvider()
    const web3 = new Web3(provider)
    const accounts = await magic.wallet.connectWithUI()
    const signedMessage = await web3.eth.personal.sign(message, accounts[0], '')
    console.log('signedMessage:', signedMessage)
    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature: signedMessage,
    })
    console.log(
      recoveredAddress.toLocaleLowerCase() === accounts[0].toLocaleLowerCase()
        ? 'Signing success!'
        : 'Signing failed!'
    )
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <div className='text-lg bold text-gray-500'>personal signature</div>
}

MagicPersonalSignatures.getLayout = (page: ReactElement) => {
  return <ResearchPageLayout>{page}</ResearchPageLayout>
}

export default MagicPersonalSignatures
