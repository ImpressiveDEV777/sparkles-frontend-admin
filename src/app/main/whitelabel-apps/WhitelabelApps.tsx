import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import CommonHeader from 'app/shared-components/CommonHeader'
import WhitelabelAppsContent from './WhitelabelAppsContent'

/**
 * The orders page.
 */
export default function WhitelabelApps() {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header={<CommonHeader title="Whitelabel Apps" url="/whitelabel-apps" />}
      content={<WhitelabelAppsContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}
