import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import WhitelabelAppsHeader from './WhitelabelAppsHeader'
import WhitelabelAppsTable from './WhitelabelAppsTable'
import { getWhitelabels } from './store/whitelabelsSlice'

/**
 * The orders page.
 */
function Orders() {
  const dispatch = useAppDispatch()
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))
  useEffect(() => {
    dispatch(getWhitelabels())
  }, [dispatch])

  return (
    <FusePageCarded
      header={<WhitelabelAppsHeader />}
      content={<WhitelabelAppsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default Orders
