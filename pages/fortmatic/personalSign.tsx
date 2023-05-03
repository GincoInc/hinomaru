import { useEffect, useState } from 'react'
import Web3 from 'web3'
import Fortmatic from 'fortmatic'
const apiKey = process.env.NEXT_PUBLIC_FORTMATIC_API_KEY

/**
 * @ Localhost
 * @ 任意の文字列に対してFortmaticで署名を行う
 * personal_signメソッドを使用する
 */
const customNodeOptions = {
  rpcUrl: 'http://127.0.0.1:8545',
  chainId: 31337,
}

const PersonalSign = () => {
  const onLoad = async () => {
    // Fortmaticプロバイダを初期化
    const fm: any = new Fortmatic(apiKey!, customNodeOptions)
    // Web3を使用してイーサリアムのスマートコントラクトにアクセスできるようにする
    const web3 = new Web3(fm.getProvider())

    web3.eth.getAccounts(function (error, accounts) {
      if (error) throw error

      const from = accounts[0]
      const payload = {
        types: {
          EIP712Domain: [
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'version',
              type: 'string',
            },
            {
              name: 'verifyingContract',
              type: 'address',
            },
          ],
          Greeting: [
            {
              name: 'contents',
              type: 'string',
            },
          ],
        },
        primaryType: 'Greeting',
        domain: {
          name: 'Fortmatic',
          version: '1',
          // TODO: 調べる:contract addreddはない？ここがこれでいいのかわからない
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          contents: 'Hello, from Fortmatic!',
        },
      }

      const params = [from, payload]
      const method = 'eth_signTypedData_v4'

      // TODO: 調べる:send methodはない？ここがこれでいいのかわからないけど動く
      web3.currentProvider!.send(
        {
          id: 1,
          method,
          params,
          from,
        },
        function (error: any, result: any) {
          if (error) throw error
          console.log(result)
        }
      )
    })
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <div className='text-lg bold text-gray-500'>personal sign</div>
}

export default PersonalSign
