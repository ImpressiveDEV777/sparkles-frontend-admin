import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import CommonHeader from 'app/shared-components/CommonHeader'
import WhitelabelAppsContent from './WhitelabelAppsContent'
import { getWhitelabels } from './store/whitelabelsSlice'

/**
 * The orders page.
 */
function WhitelabelAppsPage() {
  const dispatch = useAppDispatch()
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))
  useEffect(() => {
    dispatch(getWhitelabels())
  }, [dispatch])

  return (
    <FusePageCarded
      header={<CommonHeader title="Whitelabel Apps" url="/whitelabel-apps" />}
      content={<WhitelabelAppsContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default WhitelabelAppsPage
