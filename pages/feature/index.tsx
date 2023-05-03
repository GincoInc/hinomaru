import { useEffect, ReactElement } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'
const FeatureHome = () => {
  const onLoad = async () => {
    console.log('onLoad')
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <div className=''>
      <div>Feature home</div>
    </div>
  )
}

FeatureHome.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeatureHome
