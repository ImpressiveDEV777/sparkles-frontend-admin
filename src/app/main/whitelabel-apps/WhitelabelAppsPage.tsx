import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import WhitelabelAppsHeader from './WhitelabelAppsHeader'
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
      header={<WhitelabelAppsHeader />}
      content={<WhitelabelAppsContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default WhitelabelAppsPage
