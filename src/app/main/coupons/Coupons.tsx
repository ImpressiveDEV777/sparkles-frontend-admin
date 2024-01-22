import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import CommonHeader from 'app/shared-components/CommonHeader'
import { PATHS } from 'src/app/constants/common'
import CouponAppsContent from './CouponsContent'
import { getCoupons } from './store/couponsSlice'

/**
 * The orders page.
 */
export default function Coupons() {
  const dispatch = useAppDispatch()
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))
  useEffect(() => {
    dispatch(getCoupons())
  }, [dispatch])

  return (
    <FusePageCarded
      header={<CommonHeader title="Coupons" url={PATHS.SUPPLIERS} create />}
      content={<CouponAppsContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}
