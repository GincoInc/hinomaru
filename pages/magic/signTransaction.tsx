import { useEffect } from 'react'
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

const message = 'shuji signing'
const toAddress: string = '0x104eAB4A18C5971fC11AB25b6f89fcBE009bD7dB'
const MagicSignTransaction = () => {
  const onLoad = async () => {
    const magic = new Magic(apiKey!, {
      network: customNodeOptions,
    })

    const provider = await magic.wallet.getProvider()
    const web3 = new Web3(provider)
    const accounts = await magic.wallet.connectWithUI()
    const sendValue = web3.utils.toWei('0.003', 'ether')
    const signedMessage = await web3.eth.personal.sign(message, accounts[0], '')
    const txnParams = {
      from: accounts[0],
      to: toAddress,
      value: sendValue,
      gas: 21000,
    }
    web3.eth
      .sendTransaction(txnParams)
      .on('transactionHash', (hash) => {
        console.log('Transaction hash:', hash)
      })
      .then((receipt) => {
        console.log('Transaction receipt:', receipt)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <div className='text-lg bold text-gray-500'>sign transaction</div>
}

export default MagicSignTransaction
