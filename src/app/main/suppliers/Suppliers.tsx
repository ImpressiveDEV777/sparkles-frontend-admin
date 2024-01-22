import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import CommonHeader from 'app/shared-components/CommonHeader'
import { PATHS } from 'src/app/constants/common'
import SupplierAppsContent from './SuppliersContent'
import { getSuppliers } from './store/suppliersSlice'

/**
 * The orders page.
 */
export default function Suppliers() {
  const dispatch = useAppDispatch()
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))
  useEffect(() => {
    dispatch(getSuppliers())
  }, [dispatch])

  return (
    <FusePageCarded
      header={<CommonHeader title="Suppliers" url={PATHS.SUPPLIERS} create />}
      content={<SupplierAppsContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}
