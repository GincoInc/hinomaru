import { ReactElement, useEffect } from 'react'
import ResearchPageLayout from '@/components/layout/researchPageLayout'
import Web3 from 'web3'
import Fortmatic from 'fortmatic'
const apiKey = process.env.NEXT_PUBLIC_FORTMATIC_API_KEY

/**
 * @ Localhost
 * @ Send Ether Transaction
 */
const customNodeOptions = {
  rpcUrl: 'http://127.0.0.1:8545',
  chainId: 31337,
}

const toAddress: string = '0x104eAB4A18C5971fC11AB25b6f89fcBE009bD7dB'

const PersonalSign = () => {
  const onLoad = async () => {
    // Fortmaticプロバイダを初期化
    const fm: any = new Fortmatic(apiKey!, customNodeOptions)
    // Web3を使用してイーサリアムのスマートコントラクトにアクセスできるようにする
    const web3 = new Web3(fm.getProvider())

    const sendValue = web3.utils.toWei('15', 'ether')

    try {
      const accounts = await web3.eth.getAccounts((error, accounts) => {
        return accounts
      })
      console.log(accounts[0])

      const txnParams = {
        from: accounts[0],
        to: toAddress,
        value: sendValue,
      }

      const receipt = await web3.eth.sendTransaction(txnParams)
      console.log(receipt)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <div className='text-lg bold text-gray-500'>send ether</div>
}

PersonalSign.getLayout = (page: ReactElement) => {
  return <ResearchPageLayout>{page}</ResearchPageLayout>
}

export default PersonalSign
