import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import CommonHeader from 'app/shared-components/CommonHeader'
import { PATHS } from 'src/app/constants/common'
import SupplierAppsContent from './SuppliersContent'

/**
 * The orders page.
 */
export default function Suppliers() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={<CommonHeader title="Suppliers" url={PATHS.SUPPLIERS} create />}
      content={<SupplierAppsContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}
