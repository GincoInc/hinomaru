import { useEffect, ReactElement } from 'react'
import FeaturePageLayout from '@/components/layout/featurePageLayout'

const FeatureLoginModal = () => {
  const onLoad = async () => {
    console.log('onLoad')
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <div className=''></div>
}

FeatureLoginModal.getLayout = (page: ReactElement) => {
  return <FeaturePageLayout>{page}</FeaturePageLayout>
}

export default FeatureLoginModal
