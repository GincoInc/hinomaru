import { useEffect, useState } from 'react'
import Fortmatic from 'fortmatic'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import MESSAGE_ABI_JSON from '@/static/abi/messageContractAbi.json'
// const ethUtil = require('ethereumjs-util')

const FortmaticHome = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [isSent, setIsSent] = useState<boolean>(false)
  // const messageContractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
  const messageContractAddress = '0xB080eEaf862559f69969A3D12080Ef36B505Ef53'
  const recieveAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'

  const enablefortmatic = async () => {
    const customNodeOptions = {
      rpcUrl: 'http://127.0.0.1:8545',
      chainId: 31337,
    }
    let fm: any = new Fortmatic('pk_test_CA7028707768555D', customNodeOptions)
    const web3Provider = new Web3(fm.getProvider())
    setWeb3(web3Provider)
    console.log('====🎃setup🎃====')
    if (web3Provider) {
      await web3Provider.currentProvider!.enable()
      /**
       * @ Get Account List
       */
      const accounts = await web3Provider.eth.getAccounts((error, accounts) => {
        if (error) throw error
        return accounts
      })
      console.log(accounts[0])

      /**
       * @ Get Account Balance
       */
      const balance = await web3Provider.eth.getBalance(
        accounts[0],
        (error, balance) => {
          return web3Provider.utils.toBN(balance).toString()
        }
      )
      console.log(await web3Provider.utils.fromWei(balance, 'ether'))

      /**
       * @ Signing Transaction
       */
      const abi: AbiItem[] = [
        {
          inputs: [],
          name: 'getMessage',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'string', name: '_message', type: 'string' },
          ],
          name: 'setMessage',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ]

      /**
       * @ create contract instance
       */
      const contract = new web3Provider.eth.Contract(
        abi,
        messageContractAddress,
        { from: accounts[0] }
      )

      /**
       * @ get message
       */
      contract.methods.getMessage().call(function (err: any, res: any) {
        console.log(res)
      })

      /**
       * @ set message
       */
      // contract.methods
      //   .setMessage('test!!!')
      //   .send(function (err: any, res: any) {
      //     console.log(res)
      //   })

      /**
       * @ send transaction
       */
      setIsSent(true)
    } else {
      console.log('already sent')
    }
  }

  // TODO: use later
  const signTransaction = async () => {
    try {
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    enablefortmatic()
  }, [])

  return <div className='text-lg bold text-gray-500'>fortmatic test</div>
}

export default FortmaticHome
