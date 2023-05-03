import { ReactElement, useEffect } from 'react'
import ResearchPageLayout from '@/components/layout/researchPageLayout'
import Fortmatic from 'fortmatic'
import Web3 from 'web3'

/**
 * @ Localhost
 */
const customNodeOptions = {
  rpcUrl: 'http://127.0.0.1:8545',
  chainId: 31337,
}

const Login = () => {
  const onLoad = async () => {
    const fm: any = new Fortmatic('pk_test_CA7028707768555D', customNodeOptions)
    const web3 = new Web3(fm.getProvider())

    if (web3) {
      await web3.currentProvider!.enable()

      fm.user
        .login()
        .then(() => {
          web3.eth
            .getAccounts()
            .then((res) => {
              console.log(res)
              web3.eth.getBalance(res[0], (err, balance) => {
                const wei = web3.utils.toBN(balance).toString()
                console.log(web3.utils.fromWei(wei, 'ether'))
              })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <div className='text-lg bold text-gray-500'>login</div>
}

Login.getLayout = (page: ReactElement) => {
  return <ResearchPageLayout>{page}</ResearchPageLayout>
}

export default Login
